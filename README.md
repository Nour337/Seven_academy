# Hybrid Athlete Tracker

Simple mobile web app for logging the 8-week hybrid program. Works offline and installs to the home screen.

## Files
| File | What's inside | Edit when |
|---|---|---|
| `program.js` | The whole program (days, exercises, per-week targets, starting weights) | Changing/adding exercises |
| `app.js` | App logic (screens, saving, rest timer) | Adding features |
| `style.css` | Look & colors | Design tweaks |
| `sw.js` | Offline cache | Bump `CACHE` if an update doesn't show |

## Adding an exercise (program.js)
```js
{ "name": "Hip Thrust", "type": "lift", "target": {"1":"3x10","2":"3x10","3":"4x8"}, "rir": "7", "rest": 90, "seed": 40 }
```
- `type`: `lift` (weight + reps) · `cardio` (distance/time) · `check` (tick only) · `info` (note)
- `weeks`: `[3,4]` = only shows in those weeks
- Weeks missing from `target` default to 3 sets

## Data
Stored in the phone's browser (localStorage). **Export a backup from Settings every few weeks** — clearing browser data deletes it.
