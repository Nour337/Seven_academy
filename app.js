/* Hybrid Tracker — vanilla JS, data stays in this phone (localStorage).
   Structure:
   - STATE / storage helpers
   - program helpers (targets per week, next day logic)
   - views: today, history, progress, tracker, settings
   - rest timer + service worker
*/
(() => {
'use strict';

// ---------- STATE ----------
const KEY = 'hybrid-tracker.v1';
const DEFAULT = {
  settings: { week: 1, step: 2.5, timer: true },
  sessions: [],   // {id, date, day, week, lifts:{name:{sets:[{w,r,done}]}}, checks:{key:true}, cardio:{name:{...}}, note}
  drafts: {},     // same shape as session, keyed by day id
  metrics: [],    // {date, week, bw, pullups, ...}
};
let S = load();
function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (raw) return { ...DEFAULT, ...raw, settings: { ...DEFAULT.settings, ...raw.settings } };
  } catch (e) {}
  return structuredClone(DEFAULT);
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('Could not save! Export a backup'); }
}

// ---------- HELPERS ----------
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const today = () => { const d = new Date(); return new Date(d - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10); };
const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5);
const fmtDate = d => new Date(d + 'T12:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
const num = v => { const n = parseFloat(String(v).replace(',', '.')); return isNaN(n) ? null : n; };
const round = n => Math.round(n * 100) / 100;
const PROGRAM = window.PROGRAM;
const dayById = id => PROGRAM.find(d => d.id === id);

function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 1800);
}

// "4x6" -> {sets:4, reps:6}; "5x3-4" -> {sets:5, reps:4, lo:3}; "3xAMRAP-2" -> {sets:3, reps:null}
function parseTarget(t) {
  const m = String(t || '').match(/^(\d+)\s*x\s*(?:(\d+)(?:-(\d+))?)?/i);
  if (!m) return { sets: 3, reps: null, lo: null };
  const a = m[2] ? +m[2] : null, b = m[3] ? +m[3] : null;
  return { sets: +m[1], reps: b ?? a, lo: a };
}
const visible = (x, week) => !x.weeks || x.weeks.includes(week);

// Last logged session that contains this lift
function lastLift(name, beforeId) {
  for (let i = S.sessions.length - 1; i >= 0; i--) {
    const s = S.sessions[i];
    if (s.id === beforeId) continue;
    const l = s.lifts?.[name];
    if (l && l.sets.some(x => x.done)) return { ...l, date: s.date, week: s.week };
  }
  return null;
}
function seedWeight(item) {
  const l = lastLift(item.name);
  if (l) { const done = l.sets.filter(x => x.done); return done[done.length - 1]?.w ?? item.seed ?? ''; }
  return item.seed ?? '';
}

// ---------- NEXT DAY / REST LOGIC (3 on, 1 off) ----------
function lastSession() { return S.sessions[S.sessions.length - 1]; }
function nextDay() {
  const l = lastSession();
  if (!l) return '1';
  return String((+l.day % 6) + 1);
}
function statusBanner() {
  const l = lastSession();
  if (!l) return `<div class="banner">Welcome! Start with Day 1. Weights are pre-filled from your sheet — adjust if needed.</div>`;
  const gap = daysBetween(l.date, today());
  if (gap === 0) return `<div class="banner ok">Day ${l.day} done today. Nice work.</div>`;
  if (gap === 1 && (l.day === '3' || l.day === '6'))
    return `<div class="banner">Rest day today (after Day ${l.day}). Next up: Day ${nextDay()}.</div>`;
  if (gap >= 4) return `<div class="banner">Last workout was ${gap} days ago. Continue with Day ${nextDay()} — go a bit lighter if needed.</div>`;
  return '';
}

// ---------- DRAFT (current workout, autosaved) ----------
function getDraft(dayId) {
  let d = S.drafts[dayId];
  if (!d) {
    d = { id: 's' + Date.now(), day: dayId, week: S.settings.week, date: today(), lifts: {}, checks: {}, cardio: {}, note: '' };
    S.drafts[dayId] = d;
  }
  return d;
}
function ensureLift(draft, item) {
  const wk = S.settings.week;
  const tgt = parseTarget(item.target?.[wk]);
  let l = draft.lifts[item.name];
  if (!l) {
    const prev = lastLift(item.name);
    const w = seedWeight(item);
    l = { sets: [] };
    for (let i = 0; i < tgt.sets; i++) {
      const pr = prev?.sets.filter(x => x.done)[i];
      l.sets.push({ w: pr?.w ?? w, r: tgt.reps ?? pr?.r ?? '', done: false });
    }
    draft.lifts[item.name] = l;
  }
  return l;
}
function suggestion(item) {
  const prev = lastLift(item.name);
  if (!prev) return null;
  const tgt = parseTarget(item.target?.[prev.week] || item.target?.[S.settings.week]);
  const done = prev.sets.filter(x => x.done);
  if (!done.length || !tgt.reps) return null;
  const allHit = done.length >= tgt.sets && done.every(x => +x.r >= tgt.reps);
  const w = num(done[done.length - 1].w);
  if (allHit && w) return round(w + S.settings.step);
  return null;
}

// ---------- VIEWS ----------
let tab = 'today';
let currentDay = null;
let showAll = false;
const openBlocks = {}; // remember which blocks are open

function render() {
  document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
  const v = $('#view');
  v.innerHTML = ({ today: viewToday, history: viewHistory, progress: viewProgress, tracker: viewTracker, settings: viewSettings })[tab]();
  renderWeekSel();
  if (tab === 'progress') drawChart();
}

function renderWeekSel() {
  const sel = $('#weekSel');
  sel.innerHTML = [1, 2, 3, 4, 5, 6, 7, 8].map(w => `<option value="${w}" ${w === S.settings.week ? 'selected' : ''}>${w}</option>`).join('');
}

function viewToday() {
  const nd = nextDay();
  if (!currentDay) currentDay = nd;
  const day = dayById(currentDay);
  const wk = S.settings.week;
  const draft = getDraft(currentDay);
  draft.week = wk;

  let h = statusBanner();
  h += `<div class="days">${PROGRAM.map(d => `<button data-act="day" data-id="${d.id}" class="${d.id === currentDay ? 'on' : ''} ${d.id === nd ? 'next' : ''}">D${d.id}</button>`).join('')}</div>`;
  h += `<div class="day-head"><div class="t">Day ${day.id} · ${esc(day.title)}</div><div class="i">${esc(day.info)}</div></div>`;

  day.blocks.forEach((b, bi) => {
    if (!showAll && !visible(b, wk)) return;
    const items = b.items.filter(it => showAll || visible(it, wk));
    if (!items.length) return;
    const isMain = /MAIN|CIRCUIT|WEEK 8/.test(b.name);
    const bkey = `${day.id}|${bi}`;
    const open = openBlocks[bkey] ?? isMain;
    const doneCount = items.filter(it => isItemDone(draft, b, it)).length;
    const doable = items.filter(it => it.type !== 'info').length;
    const allDone = doable && doneCount === doable;

    h += `<section class="block ${open ? '' : 'closed'} ${allDone ? 'done' : ''}">
      <div class="bh" data-act="toggle-block" data-k="${bkey}">
        <span class="chev">▾</span><span class="bn">${esc(b.name)}</span>
        ${doable ? `<span class="cnt">${doneCount}/${doable}</span>` : ''}
        ${!isMain && doable && !allDone ? `<button class="pill" data-act="check-block" data-bi="${bi}">✓ All</button>` : ''}
      </div><div class="bb">`;
    items.forEach(it => { h += renderItem(draft, b, it); });
    h += `</div></section>`;
  });

  h += `<div class="toggle-all"><button class="btn small" data-act="show-all">${showAll ? 'Show this week only' : 'Show all exercises (all weeks)'}</button></div>`;
  h += `<label class="field" style="margin-top:10px">Notes<textarea rows="2" data-bind="note">${esc(draft.note)}</textarea></label>`;
  h += `<div class="finish"><button class="btn primary block" data-act="finish">Finish workout ✓</button></div>`;
  h += `<div style="text-align:center"><button class="btn small danger" data-act="discard">Discard workout</button></div>`;
  save();
  return h;
}

function ckey(b, it) { return b.name + '|' + it.name; }
function isItemDone(draft, b, it) {
  if (it.type === 'lift') { const l = draft.lifts[it.name]; return !!l && l.sets.length > 0 && l.sets.every(s => s.done); }
  if (it.type === 'cardio') return !!draft.cardio[it.name]?.done;
  if (it.type === 'check') return !!draft.checks[ckey(b, it)];
  return false;
}

function renderItem(draft, b, it) {
  const wk = S.settings.week;
  if (it.type === 'info') {
    return `<div class="row info"><div class="nm">${esc(it.name)}${it.note ? `<div class="nt">${esc(it.note)}</div>` : ''}</div></div>`;
  }
  if (it.type === 'check') {
    const on = !!draft.checks[ckey(b, it)];
    return `<div class="row"><div class="nm">${esc(it.name)} ${it.rx ? `<span class="rx">· ${esc(it.rx)}</span>` : ''}
      ${it.note ? `<div class="nt">${esc(it.note)}</div>` : ''}</div>
      <button class="tick ${on ? 'on' : ''}" data-act="check" data-k="${esc(ckey(b, it))}">✓</button></div>`;
  }
  if (it.type === 'cardio') {
    const c = draft.cardio[it.name] || {};
    return `<div class="lift ${c.done ? 'alldone' : ''}"><div class="top1"><div><div class="ln">${esc(it.name)}</div>
      <div class="meta">${esc(it.rx || '')}</div>${it.note ? `<div class="meta">${esc(it.note)}</div>` : ''}</div>
      <button class="tick ${c.done ? 'on' : ''}" data-act="cardio-done" data-n="${esc(it.name)}">✓</button></div>
      <div class="cardio">
        <label class="field">Distance (km / m)<input data-cardio="${esc(it.name)}" data-f="dist" value="${esc(c.dist || '')}" inputmode="decimal"></label>
        <label class="field">Time (mm:ss)<input data-cardio="${esc(it.name)}" data-f="time" value="${esc(c.time || '')}"></label>
        <label class="field">Avg HR<input data-cardio="${esc(it.name)}" data-f="hr" value="${esc(c.hr || '')}" inputmode="numeric"></label>
        <label class="field">RPE<input data-cardio="${esc(it.name)}" data-f="rpe" value="${esc(c.rpe || '')}" inputmode="numeric"></label>
      </div></div>`;
  }
  // lift
  const l = ensureLift(draft, it);
  const tgt = it.target?.[wk] || '';
  const prev = lastLift(it.name, draft.id);
  const sug = suggestion(it);
  const prevTxt = prev
    ? `Last (${fmtDate(prev.date)}): <span class="ltr">${prev.sets.filter(s => s.done).map(s => `${s.w}×${s.r}`).join(' · ')}</span>`
    : (it.seed != null ? `From sheet: ${it.seed} kg` : 'First time — log your weight');
  const all = l.sets.every(s => s.done);
  let h = `<div class="lift ${all ? 'alldone' : ''}" data-lift="${esc(it.name)}">
    <div class="top1"><div><div class="ln">${esc(it.name)}</div>
      <div class="meta">W${wk}: <b>${esc(tgt)}</b>${it.rir ? ` · RIR ${esc(it.rir)}` : ''}${it.rest ? ` · rest ${fmtSec(it.rest)}` : ''}</div></div></div>
    <div class="last" >${prevTxt}</div>
    ${sug && num(l.sets[0]?.w) !== sug ? `<button class="hint" data-act="apply-sug" data-n="${esc(it.name)}" data-w="${sug}">Hit all reps last time → try ${sug} kg</button>` : ''}
    <div class="sets"><div class="set-head"><span>#</span><span>kg</span><span>reps</span><span></span></div>`;
  l.sets.forEach((s, i) => {
    h += `<div class="set ${s.done ? 'on' : ''}"><span class="no">${i + 1}</span>
      <div class="step"><button data-act="w-" data-n="${esc(it.name)}" data-i="${i}">−</button>
        <input inputmode="decimal" data-w="${esc(it.name)}" data-i="${i}" value="${esc(s.w)}"><button data-act="w+" data-n="${esc(it.name)}" data-i="${i}">+</button></div>
      <div class="step"><button data-act="r-" data-n="${esc(it.name)}" data-i="${i}">−</button>
        <input inputmode="numeric" data-r="${esc(it.name)}" data-i="${i}" value="${esc(s.r)}" placeholder="?"><button data-act="r+" data-n="${esc(it.name)}" data-i="${i}">+</button></div>
      <button class="tick ${s.done ? 'on' : ''}" data-act="set-done" data-n="${esc(it.name)}" data-i="${i}" data-rest="${it.rest || 0}">✓</button></div>`;
  });
  h += `</div><div class="acts">
      ${!all ? `<button class="btn ok" data-act="all-sets" data-n="${esc(it.name)}">✓ All sets done</button>` : ''}
      <button class="btn" data-act="add-set" data-n="${esc(it.name)}">+ Set</button>
      ${l.sets.length > 1 ? `<button class="btn" data-act="del-set" data-n="${esc(it.name)}">− Set</button>` : ''}
    </div>
    ${it.note ? `<details><summary>Progression (W3–8)</summary>${esc(it.note)}</details>` : ''}
  </div>`;
  return h;
}
const fmtSec = s => s >= 60 ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}` : `${s}s`;

function viewHistory() {
  if (!S.sessions.length) return `<div class="empty">No workouts logged yet.</div>`;
  let h = `<h2>History (${S.sessions.length})</h2>`;
  [...S.sessions].reverse().forEach(s => {
    const d = dayById(s.day);
    const lifts = Object.entries(s.lifts || {}).filter(([, l]) => l.sets.some(x => x.done));
    const vol = lifts.reduce((a, [, l]) => a + l.sets.filter(x => x.done).reduce((b, x) => b + (num(x.w) || 0) * (num(x.r) || 0), 0), 0);
    const cardio = Object.entries(s.cardio || {}).filter(([, c]) => c.done || c.dist || c.time);
    h += `<div class="card hist"><div class="h1"><b>D${s.day} · ${esc(d?.title || '')}</b><span class="muted small">${fmtDate(s.date)} · W${s.week}</span></div>
      <ul>${lifts.map(([n, l]) => `<li>${esc(n)}: <span>${l.sets.filter(x => x.done).map(x => `${x.w}×${x.r}`).join(' · ')}</span></li>`).join('')}
      ${cardio.map(([n, c]) => `<li>${esc(n)}: <span>${[c.dist, c.time, c.hr && c.hr + ' bpm', c.rpe && 'RPE ' + c.rpe].filter(Boolean).map(esc).join(' · ') || '✓'}</span></li>`).join('')}</ul>
      ${vol ? `<div class="muted small ltr" style="margin-top:6px">Volume: ${Math.round(vol)} kg</div>` : ''}
      ${s.note ? `<div class="small" style="margin-top:6px">${esc(s.note)}</div>` : ''}
      <div style="margin-top:8px;display:flex;gap:8px"><button class="btn small" data-act="edit-session" data-id="${s.id}">Edit</button>
      <button class="btn small danger" data-act="del-session" data-id="${s.id}">Delete</button></div></div>`;
  });
  return h;
}

let progEx = null;
function liftNames() {
  const names = [];
  PROGRAM.forEach(d => d.blocks.forEach(b => b.items.forEach(i => { if (i.type === 'lift' && !names.includes(i.name)) names.push(i.name); })));
  return names;
}
function liftHistory(name) {
  return S.sessions.filter(s => s.lifts?.[name]?.sets.some(x => x.done)).map(s => {
    const sets = s.lifts[name].sets.filter(x => x.done);
    const top = Math.max(...sets.map(x => num(x.w) || 0));
    const e1rm = Math.max(...sets.map(x => (num(x.w) || 0) * (1 + (num(x.r) || 0) / 30)));
    return { date: s.date, week: s.week, top, e1rm: Math.round(e1rm * 10) / 10, sets };
  });
}
function viewProgress() {
  const names = liftNames();
  if (!progEx) progEx = names.find(n => liftHistory(n).length) || names[0];
  const hist = liftHistory(progEx);
  let h = `<h2>Progress</h2><label class="field">Exercise<select id="progSel">${names.map(n => `<option ${n === progEx ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select></label>`;
  if (!hist.length) return h + `<div class="empty">No data for this exercise yet.</div>`;
  const best = Math.max(...hist.map(x => x.top));
  h += `<div class="grid2" style="margin-top:10px"><div class="card"><div class="muted small">Top weight</div><b style="font-size:22px">${best} kg</b></div>
        <div class="card"><div class="muted small">Est. 1RM</div><b style="font-size:22px">${Math.max(...hist.map(x => x.e1rm))} kg</b></div></div>`;
  h += `<div class="card"><svg id="chart" class="chart" viewBox="0 0 320 160"></svg><div class="muted small ltr">— top set kg &nbsp; <span style="color:#93b4f5">- - e1RM</span></div></div>`;
  h += `<div class="card"><table><tr><th>Date</th><th>W</th><th>Sets</th></tr>${[...hist].reverse().map(x => `<tr><td>${fmtDate(x.date)}</td><td>${x.week}</td><td>${x.sets.map(s => `${s.w}×${s.r}`).join(' · ')}</td></tr>`).join('')}</table></div>`;
  return h;
}
function drawChart() {
  const svg = $('#chart'); if (!svg) return;
  const hist = liftHistory(progEx);
  const W = 320, H = 160, P = 24;
  const vals = hist.flatMap(x => [x.top, x.e1rm]);
  let mn = Math.min(...vals), mx = Math.max(...vals);
  if (mn === mx) { mn -= 5; mx += 5; }
  const X = i => hist.length === 1 ? W / 2 : P + i * (W - 2 * P) / (hist.length - 1);
  const Y = v => H - P - (v - mn) / (mx - mn) * (H - 2 * P);
  const path = k => hist.map((x, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(x[k]).toFixed(1)}`).join(' ');
  svg.innerHTML = `
    <line x1="${P}" y1="${H - P}" x2="${W - P}" y2="${H - P}" stroke="#e4e7ec"/>
    <text x="${P}" y="${P - 8}" fill="#6b7280" font-size="10">${mx}</text>
    <text x="${P}" y="${H - 6}" fill="#6b7280" font-size="10">${mn}</text>
    <path d="${path('e1rm')}" fill="none" stroke="#93b4f5" stroke-width="1.5" stroke-dasharray="4 3"/>
    <path d="${path('top')}" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    ${hist.map((x, i) => `<circle cx="${X(i)}" cy="${Y(x.top)}" r="3.5" fill="#2563eb"/>`).join('')}`;
}

const METRICS = [
  ['bw', 'Bodyweight (kg)'], ['pullups', 'Pull-ups (max strict)'], ['pushups', 'Push-ups (max)'], ['dips', 'Dips (max)'],
  ['bench', 'Bench 3-5RM (kg)'], ['squat', 'Squat 3-5RM (kg)'], ['run3k', '3K Run (mm:ss)'], ['z2pace', 'Zone 2 pace (min/km)'],
];
function viewTracker() {
  let h = `<h2>Tests & body metrics</h2><div class="muted small" style="margin-bottom:10px">Test at baseline and at the end of weeks 2, 4, 6, 8. Bodyweight weekly if you can.</div>
    <div class="card"><div class="grid2">${METRICS.map(([k, l]) => `<label class="field ltr">${l}<input id="m_${k}" ${k === 'run3k' || k === 'z2pace' ? '' : 'inputmode="decimal"'}></label>`).join('')}</div>
    <button class="btn primary block" style="margin-top:10px" data-act="save-metric">Save</button></div>`;
  if (S.metrics.length) {
    h += `<div class="card" style="overflow-x:auto"><table><tr><th>Date</th><th>W</th>${METRICS.map(([k]) => `<th>${k}</th>`).join('')}<th></th></tr>
      ${[...S.metrics].reverse().map((m, ri) => `<tr><td>${fmtDate(m.date)}</td><td>${m.week}</td>${METRICS.map(([k]) => `<td>${esc(m[k] ?? '')}</td>`).join('')}
      <td><button class="btn small danger" data-act="del-metric" data-i="${S.metrics.length - 1 - ri}">×</button></td></tr>`).join('')}</table></div>`;
  }
  return h;
}

function viewSettings() {
  return `<h2>Settings</h2>
  <div class="card">
    <div class="set-row"><span>Weight step (kg)</span><select id="stepSel" class="btn">${[1, 1.25, 2, 2.5, 5].map(v => `<option ${v === S.settings.step ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
    <div class="set-row"><span>Auto rest timer</span><button class="tick ${S.settings.timer ? 'on' : ''}" data-act="toggle-timer">✓</button></div>
  </div>
  <div class="card">
    <b>Backup</b>
    <div class="muted small" style="margin:6px 0 10px">Data lives only on this phone. Export every few weeks and save it to Drive.</div>
    <div class="grid2"><button class="btn" data-act="export">Export JSON</button><button class="btn" data-act="export-csv">Export CSV (Sheets)</button></div>
    <label class="btn" style="display:block;text-align:center;margin-top:8px">Import JSON<input type="file" id="importFile" accept="application/json" hidden></label>
  </div>
  <div class="card"><button class="btn danger block" data-act="reset">Delete all data</button></div>
  <div class="muted small" style="text-align:center">${S.sessions.length} workouts logged</div>`;
}

// ---------- ACTIONS ----------
function finishWorkout() {
  const d = getDraft(currentDay);
  const anything = Object.values(d.lifts).some(l => l.sets.some(s => s.done)) || Object.keys(d.checks).length || Object.values(d.cardio).some(c => c.done);
  if (!anything) {
    if (!confirm('Nothing is ticked. Save the workout anyway?')) return;
  }
  const lifts = {};
  for (const [n, l] of Object.entries(d.lifts)) if (l.sets.some(s => s.done)) lifts[n] = { sets: l.sets.map(s => ({ ...s })) };
  const existing = S.sessions.findIndex(s => s.id === d.id);
  const rec = { id: d.id, date: d.date || today(), day: d.day, week: S.settings.week, lifts, checks: d.checks, cardio: d.cardio, note: d.note };
  if (existing >= 0) S.sessions[existing] = rec; else S.sessions.push(rec);
  S.sessions.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  delete S.drafts[currentDay];
  if (existing < 0 && d.day === '6') {
    if (S.settings.week < 8) { S.settings.week++; toast(`Week done! Starting Week ${S.settings.week}`); }
    else if (confirm('You finished all 8 weeks! Restart at Week 1?')) S.settings.week = 1;
  } else toast('Saved ✓');
  stopTimer();
  currentDay = null;
  save(); render(); scrollTo(0, 0);
}

document.addEventListener('click', e => {
  const tb = e.target.closest('.tabs button');
  if (tb) { tab = tb.dataset.tab; render(); scrollTo(0, 0); return; }
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const a = el.dataset.act, n = el.dataset.n, i = +el.dataset.i;
  const draft = currentDay ? getDraft(currentDay) : null;
  const lift = n && draft?.lifts[n];
  const step = S.settings.step;
  switch (a) {
    case 'day': currentDay = el.dataset.id; break;
    case 'toggle-block': if (e.target.closest('.pill')) return; openBlocks[el.dataset.k] = el.parentElement.classList.contains('closed'); break;
    case 'check-block': {
      e.stopPropagation();
      const b = dayById(currentDay).blocks[+el.dataset.bi];
      b.items.filter(it => it.type === 'check' && visible(it, S.settings.week)).forEach(it => draft.checks[ckey(b, it)] = true);
      break;
    }
    case 'check': draft.checks[el.dataset.k] ? delete draft.checks[el.dataset.k] : draft.checks[el.dataset.k] = true; break;
    case 'cardio-done': { const c = draft.cardio[n] ||= {}; c.done = !c.done; break; }
    case 'w-': lift.sets[i].w = Math.max(0, round((num(lift.sets[i].w) || 0) - step)); propagateW(lift, i); break;
    case 'w+': lift.sets[i].w = round((num(lift.sets[i].w) || 0) + step); propagateW(lift, i); break;
    case 'r-': lift.sets[i].r = Math.max(0, (num(lift.sets[i].r) || 0) - 1); break;
    case 'r+': lift.sets[i].r = (num(lift.sets[i].r) || 0) + 1; break;
    case 'set-done': {
      const s = lift.sets[i]; s.done = !s.done;
      if (s.done && S.settings.timer && +el.dataset.rest && i < lift.sets.length - 1) startTimer(+el.dataset.rest);
      break;
    }
    case 'all-sets': lift.sets.forEach(s => s.done = true); break;
    case 'add-set': { const last = lift.sets[lift.sets.length - 1] || { w: '', r: '' }; lift.sets.push({ w: last.w, r: last.r, done: false }); break; }
    case 'del-set': lift.sets.pop(); break;
    case 'apply-sug': lift.sets.forEach(s => { if (!s.done) s.w = +el.dataset.w; }); break;
    case 'show-all': showAll = !showAll; break;
    case 'finish': return finishWorkout();
    case 'discard': if (confirm('Discard everything logged in this workout?')) { delete S.drafts[currentDay]; } break;
    case 'timer-add': timerEnd += 30000; tickTimer(); return;
    case 'timer-stop': stopTimer(); return;
    case 'del-session': if (confirm('Delete this workout?')) S.sessions = S.sessions.filter(s => s.id !== el.dataset.id); break;
    case 'edit-session': {
      const s = S.sessions.find(x => x.id === el.dataset.id);
      S.drafts[s.day] = structuredClone({ ...s, lifts: s.lifts, checks: s.checks || {}, cardio: s.cardio || {} });
      currentDay = s.day; tab = 'today'; toast('Edit, then tap Finish workout'); break;
    }
    case 'save-metric': {
      const m = { date: today(), week: S.settings.week }; let any = false;
      METRICS.forEach(([k]) => { const v = $('#m_' + k).value.trim(); if (v) { m[k] = v; any = true; } });
      if (!any) return toast('Enter at least one value');
      S.metrics.push(m); toast('Saved ✓'); break;
    }
    case 'del-metric': if (confirm('Delete this entry?')) S.metrics.splice(i, 1); break;
    case 'toggle-timer': S.settings.timer = !S.settings.timer; break;
    case 'export': download(`hybrid-backup-${today()}.json`, JSON.stringify(S, null, 1), 'application/json'); return;
    case 'export-csv': download(`hybrid-sets-${today()}.csv`, toCSV(), 'text/csv'); return;
    case 'reset': if (confirm('Are you sure? This deletes everything.') && confirm('Really sure?')) { S = structuredClone(DEFAULT); currentDay = null; } break;
    default: return;
  }
  save(); render();
});

// typing a new weight in set 1 copies it to later sets that aren't done yet (less typing)
function propagateW(lift, i) {
  for (let j = i + 1; j < lift.sets.length; j++) if (!lift.sets[j].done) lift.sets[j].w = lift.sets[i].w;
}

document.addEventListener('input', e => {
  const t = e.target;
  if (!currentDay && tab === 'today') return;
  const draft = currentDay && getDraft(currentDay);
  if (t.dataset.w !== undefined && draft) { const l = draft.lifts[t.dataset.w]; l.sets[+t.dataset.i].w = t.value; }
  else if (t.dataset.r !== undefined && draft) { draft.lifts[t.dataset.r].sets[+t.dataset.i].r = t.value; }
  else if (t.dataset.cardio && draft) { (draft.cardio[t.dataset.cardio] ||= {})[t.dataset.f] = t.value; }
  else if (t.dataset.bind === 'note' && draft) draft.note = t.value;
  else return;
  save();
});
document.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset.w !== undefined && currentDay) {
    // no full re-render here: it would swallow the tap on ✓ that caused the blur
    const l = getDraft(currentDay).lifts[t.dataset.w]; propagateW(l, +t.dataset.i); save();
    t.closest('.sets').querySelectorAll('input[data-w]').forEach(inp => { inp.value = l.sets[+inp.dataset.i].w; });
  }
  if (t.id === 'weekSel') { S.settings.week = +t.value; save(); render(); }
  if (t.id === 'progSel') { progEx = t.value; render(); }
  if (t.id === 'stepSel') { S.settings.step = +t.value; save(); }
  if (t.id === 'importFile' && t.files[0]) {
    t.files[0].text().then(txt => {
      try {
        const d = JSON.parse(txt);
        if (!Array.isArray(d.sessions)) throw 0;
        if (!confirm(`Replace current data with ${d.sessions.length} workouts?`)) return;
        S = { ...structuredClone(DEFAULT), ...d, settings: { ...DEFAULT.settings, ...d.settings } };
        save(); render(); toast('Imported ✓');
      } catch { toast('Not a valid backup file'); }
    });
  }
});
document.addEventListener('focusin', e => { if (e.target.matches('.step input')) e.target.select(); });

function download(name, data, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([data], { type }));
  a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
function toCSV() {
  const rows = [['date', 'week', 'day', 'exercise', 'set', 'weight_kg', 'reps']];
  S.sessions.forEach(s => Object.entries(s.lifts || {}).forEach(([n, l]) => l.sets.filter(x => x.done).forEach((x, i) => rows.push([s.date, s.week, s.day, n, i + 1, x.w, x.r]))));
  return rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
}

// ---------- REST TIMER ----------
let timerEnd = 0, timerInt = null;
function startTimer(sec) {
  timerEnd = Date.now() + sec * 1000;
  $('#timer').classList.remove('hidden', 'end');
  clearInterval(timerInt); timerInt = setInterval(tickTimer, 250); tickTimer();
}
function tickTimer() {
  const left = Math.round((timerEnd - Date.now()) / 1000);
  const el = $('#timer');
  if (left <= 0) {
    $('#tTime').textContent = 'Go!';
    if (!el.classList.contains('end')) { el.classList.add('end'); navigator.vibrate?.([300, 150, 300]); }
    if (left < -20) stopTimer();
    return;
  }
  $('#tTime').textContent = fmtSec(left).replace(/s$/, '') + (left < 60 ? 's' : '');
}
function stopTimer() { clearInterval(timerInt); $('#timer').classList.add('hidden'); }

// ---------- BOOT ----------
render();
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js');
})();
