// Generated from Hybrid_Athlete_Tracker.xlsx — edit freely.
// type: lift = weight+reps per set | cardio = distance/time | check = just tick it
// weeks: [..] = item/block only shows in those program weeks
window.PROGRAM = [
 {
  "id": "1",
  "title": "Upper Strength + Calisthenics",
  "info": "Objective: build maximal pressing/pulling strength while building the pull-up",
  "blocks": [
   {
    "name": "WARM-UP",
    "items": [
     {
      "name": "Easy bike or row",
      "type": "check",
      "rx": "1 x 5-10 min",
      "note": "Low effort"
     }
    ]
   },
   {
    "name": "PRE-TRAINING MOBILITY - 6-8 min total",
    "items": [
     {
      "name": "T-spine rotations",
      "type": "check",
      "rx": "",
      "note": "Split the 6-8 min block across these five drills"
     },
     {
      "name": "Shoulder CARs",
      "type": "check",
      "rx": "",
      "note": "Split the 6-8 min block across these five drills"
     },
     {
      "name": "Band pull-aparts",
      "type": "check",
      "rx": "",
      "note": "Split the 6-8 min block across these five drills"
     },
     {
      "name": "Scap push-ups",
      "type": "check",
      "rx": "",
      "note": "Split the 6-8 min block across these five drills"
     },
     {
      "name": "Wrist circles / wall wrist stretch",
      "type": "check",
      "rx": "",
      "note": "Split the 6-8 min block across these five drills"
     }
    ]
   },
   {
    "name": "TENDON / PLYO PREP - 3-6 min",
    "items": [
     {
      "name": "Upper-body plyo prep",
      "type": "check",
      "rx": "3-6 min",
      "note": "W1-2: wall push-up plyo taps | W3-6: clap-assisted push-ups or med-ball chest pass | W7: light plyo push-ups | W8: skip or minimal"
     }
    ]
   },
   {
    "name": "MAIN WORK",
    "items": [
     {
      "name": "Barbell Bench Press",
      "type": "lift",
      "target": {
       "1": "4x6",
       "2": "4x6",
       "3": "4x5",
       "4": "4x5",
       "5": "5x3-4",
       "6": "5x3-4",
       "7": "5x2-3",
       "8": "3x5 light"
      },
      "rir": "7-8 / 2-3 RIR",
      "rest": 150,
      "seed": 30.0,
      "note": "W3-4: 4x5 | W5-6: 5x3-4 | W7: 5x2-3 | W8: 3x5 light"
     },
     {
      "name": "Weighted / Assisted Pull-up progression",
      "type": "lift",
      "target": {
       "1": "4xAMRAP-2",
       "2": "4xAMRAP-2",
       "3": "4xAMRAP-1",
       "4": "4xAMRAP-1",
       "5": "5x3-5",
       "6": "5x3-5",
       "7": "5x2-4",
       "8": "3x5 easy"
      },
      "rir": "7-8",
      "rest": 150,
      "seed": 5.0,
      "note": "W3-4: 4xAMRAP-1 | W5-6: 5x3-5 | W7: 5x2-4 | W8: 3x5 easy. Progression: W1-2 scap pull-ups + 3-5s eccentrics + band-assisted; W3-4 band-assisted full reps + top isometric hold; W5-6 assisted + unassisted singles, less band; W7-8 max unassisted reps"
     },
     {
      "name": "Standing Overhead Press",
      "type": "lift",
      "target": {
       "1": "3x8",
       "2": "3x8",
       "3": "3x6",
       "4": "3x6",
       "5": "4x5",
       "6": "4x5",
       "7": "4x4",
       "8": "2x8 light"
      },
      "rir": "7 / 3 RIR",
      "rest": 120,
      "seed": 17.5,
      "note": "W3-4: 3x6 | W5-6: 4x5 | W7: 4x4 | W8: 2x8 light"
     },
     {
      "name": "Weighted Dips or Parallel Bar Dips",
      "type": "lift",
      "target": {
       "1": "3x8",
       "2": "3x8",
       "3": "3x6-8",
       "4": "3x6-8",
       "5": "4x5-6",
       "6": "4x5-6",
       "7": "4x5",
       "8": "2x8 easy"
      },
      "rir": "7-8",
      "rest": 120,
      "seed": 7.0,
      "note": "W3-4: 3x6-8 | W5-6: 4x5-6 | W7: 4x5 | W8: 2x8 easy"
     },
     {
      "name": "Chest-Supported Row",
      "type": "lift",
      "target": {
       "1": "3x10",
       "2": "3x10",
       "3": "3x10",
       "4": "3x10",
       "5": "3x8",
       "6": "3x8",
       "7": "3x8",
       "8": "2x10"
      },
      "rir": "7 / 3 RIR",
      "rest": 90,
      "seed": 10.0,
      "note": "W3-4: 3x10 | W5-6: 3x8 | W7: 3x8 | W8: 2x10"
     },
     {
      "name": "Face Pull",
      "type": "lift",
      "target": {
       "1": "3x15",
       "2": "3x15",
       "3": "3x15",
       "4": "3x15",
       "5": "3x12",
       "6": "3x12",
       "7": "3x12",
       "8": "2x15"
      },
      "rir": "6",
      "rest": 60,
      "seed": 30.0,
      "note": "W3-4: 3x15 | W5-6: 3x12 | W7: 3x12 | W8: 2x15"
     }
    ]
   },
   {
    "name": "CORE",
    "items": [
     {
      "name": "Hanging Knee Raise",
      "type": "check",
      "rx": "3 x 10"
     },
     {
      "name": "Pallof Press",
      "type": "check",
      "rx": "3 x 12 / side"
     }
    ]
   },
   {
    "name": "COOLDOWN / STRETCH - 5-8 min",
    "items": [
     {
      "name": "Doorway chest stretch",
      "type": "check",
      "rx": ""
     },
     {
      "name": "Lat stretch",
      "type": "check",
      "rx": ""
     },
     {
      "name": "Triceps / overhead stretch",
      "type": "check",
      "rx": ""
     },
     {
      "name": "Child's pose",
      "type": "check",
      "rx": ""
     }
    ]
   }
  ]
 },
 {
  "id": "2",
  "title": "Lower Strength + Mobility",
  "info": "Objective: squat/hinge strength, unilateral stability, posterior chain, ankle/hip mobility",
  "blocks": [
   {
    "name": "WARM-UP",
    "items": [
     {
      "name": "Bike, easy pace",
      "type": "check",
      "rx": "1 x 5-10 min"
     }
    ]
   },
   {
    "name": "PRE-TRAINING MOBILITY - 6-8 min total",
    "items": [
     {
      "name": "Ankle dorsiflexion rocks",
      "type": "check",
      "rx": "",
      "note": "Split the 6-8 min block across these five drills"
     },
     {
      "name": "Hip CARs",
      "type": "check",
      "rx": "",
      "note": "Split the 6-8 min block across these five drills"
     },
     {
      "name": "90/90 transitions",
      "type": "check",
      "rx": "",
      "note": "Split the 6-8 min block across these five drills"
     },
     {
      "name": "Walking knee hugs",
      "type": "check",
      "rx": "",
      "note": "Split the 6-8 min block across these five drills"
     },
     {
      "name": "Deep squat holds",
      "type": "check",
      "rx": "",
      "note": "Split the 6-8 min block across these five drills"
     }
    ]
   },
   {
    "name": "TENDON / PLYO PREP",
    "items": [
     {
      "name": "Ankle pogo hops",
      "type": "check",
      "rx": "2 x 15",
      "note": "W1-2 only, then replaced below. W8: pogo hops only, low dose",
      "weeks": [
       1,
       2,
       8
      ]
     },
     {
      "name": "Low box step-off + stick landing",
      "type": "check",
      "rx": "2-3 x 6",
      "note": "W3-6",
      "weeks": [
       3,
       4,
       5,
       6
      ]
     },
     {
      "name": "Low-amplitude single-leg hops",
      "type": "check",
      "rx": "2 x 8 / side",
      "note": "W7",
      "weeks": [
       7
      ]
     }
    ]
   },
   {
    "name": "MAIN WORK",
    "items": [
     {
      "name": "Back Squat",
      "type": "lift",
      "target": {
       "1": "4x6",
       "2": "4x6",
       "3": "4x5",
       "4": "4x5",
       "5": "5x3-4",
       "6": "5x3-4",
       "7": "5x2-3",
       "8": "3x5 light"
      },
      "rir": "7-8",
      "rest": 150,
      "seed": 35.0,
      "note": "W3-4: 4x5 | W5-6: 5x3-4 | W7: 5x2-3 | W8: 3x5 light"
     },
     {
      "name": "Romanian Deadlift",
      "type": "lift",
      "target": {
       "1": "3x8",
       "2": "3x8",
       "3": "3x8",
       "4": "3x8",
       "5": "4x6",
       "6": "4x6",
       "7": "4x5",
       "8": "2x8 light"
      },
      "rir": "7",
      "rest": 120,
      "seed": 40.0,
      "note": "W3-4: 3x8 | W5-6: 4x6 | W7: 4x5 | W8: 2x8 light"
     },
     {
      "name": "Bulgarian Split Squat",
      "type": "lift",
      "target": {
       "1": "3x8 / leg",
       "2": "3x8 / leg",
       "3": "3x8/leg",
       "4": "3x8/leg",
       "5": "3x6/leg",
       "6": "3x6/leg",
       "7": "3x6/leg",
       "8": "2x8/leg light"
      },
      "rir": "7",
      "rest": 90,
      "seed": 12.0,
      "note": "W3-4: 3x8/leg | W5-6: 3x6/leg | W7: 3x6/leg | W8: 2x8/leg light"
     },
     {
      "name": "Standing Calf Raise",
      "type": "lift",
      "target": {
       "1": "4x12",
       "2": "4x12",
       "3": "4x12",
       "4": "4x12",
       "5": "4x10",
       "6": "4x10",
       "7": "4x10",
       "8": "2x12"
      },
      "rir": "7",
      "rest": 60,
      "seed": 15.0,
      "note": "W3-4: 4x12 | W5-6: 4x10 | W7: 4x10 | W8: 2x12"
     },
     {
      "name": "Tibialis Raise",
      "type": "lift",
      "target": {
       "1": "3x15",
       "2": "3x15",
       "3": "3x15",
       "4": "3x15",
       "5": "3x15",
       "6": "3x15",
       "7": "3x15",
       "8": "2x15"
      },
      "rir": "6",
      "rest": 45,
      "note": "W3-7: 3x15 | W8: 2x15"
     },
     {
      "name": "Single-Leg RDL (balance)",
      "type": "lift",
      "target": {
       "1": "2x8 / leg",
       "2": "2x8 / leg",
       "3": "2x8/leg",
       "4": "2x8/leg",
       "5": "3x8/leg",
       "6": "3x8/leg",
       "7": "3x8/leg",
       "8": "2x8/leg"
      },
      "rir": "6",
      "rest": 60,
      "note": "W3-4: 2x8/leg | W5-6: 3x8/leg | W7: 3x8/leg | W8: 2x8/leg"
     }
    ]
   },
   {
    "name": "CORE",
    "items": [
     {
      "name": "Dead Bug",
      "type": "check",
      "rx": "3 x 10 / side"
     },
     {
      "name": "Side Plank",
      "type": "check",
      "rx": "3 x 30-40s / side"
     }
    ]
   },
   {
    "name": "COOLDOWN / STRETCH - 5-8 min",
    "items": [
     {
      "name": "Couch stretch",
      "type": "check",
      "rx": ""
     },
     {
      "name": "Calf stretch",
      "type": "check",
      "rx": ""
     },
     {
      "name": "Adductor stretch",
      "type": "check",
      "rx": ""
     },
     {
      "name": "Seated hamstring stretch",
      "type": "check",
      "rx": ""
     }
    ]
   }
  ]
 },
 {
  "id": "3",
  "title": "Zone 2 + Mobility + Core",
  "info": "Objective: aerobic base and running economy without compromising strength days",
  "blocks": [
   {
    "name": "WARM-UP",
    "items": [
     {
      "name": "Easy walk / jog",
      "type": "check",
      "rx": "1 x 5 min"
     }
    ]
   },
   {
    "name": "PRE-TRAINING MOBILITY - 6 min total",
    "items": [
     {
      "name": "Leg swings (front / side)",
      "type": "check",
      "rx": "",
      "note": "Split the 6 min block across these four drills"
     },
     {
      "name": "Ankle circles",
      "type": "check",
      "rx": "",
      "note": "Split the 6 min block across these four drills"
     },
     {
      "name": "Hip openers",
      "type": "check",
      "rx": "",
      "note": "Split the 6 min block across these four drills"
     },
     {
      "name": "Light dynamic hamstring sweeps",
      "type": "check",
      "rx": "",
      "note": "Split the 6 min block across these four drills"
     }
    ]
   },
   {
    "name": "TENDON / PLYO PREP",
    "items": [
     {
      "name": "Skipping drills (light)",
      "type": "check",
      "rx": "2 x 20 m",
      "note": "Minimal dose only - this is a low-fatigue day"
     }
    ]
   },
   {
    "name": "MAIN WORK",
    "items": [
     {
      "name": "Zone 2 Run",
      "type": "cardio",
      "rx": "25-30 min @ Conversational, HR ~65-75% max",
      "note": "W3-4: 30-40 min | W5-6: 35-45 min, slightly faster pace at the same HR (economy check) | W7: 30 min maintenance | W8: 20-25 min easy. Log it in RUNNING LOG"
     },
     {
      "name": "Swim substitution",
      "type": "cardio",
      "rx": "Same duration as the run @ Conversational RPE",
      "note": "Continuous easy freestyle / mixed stroke - same aerobic purpose, non-impact"
     }
    ]
   },
   {
    "name": "CORE - dedicated block",
    "items": [
     {
      "name": "Plank",
      "type": "check",
      "rx": "3 x 40-60s"
     },
     {
      "name": "Pallof Press",
      "type": "check",
      "rx": "3 x 12 / side"
     },
     {
      "name": "Bear Crawl",
      "type": "check",
      "rx": "2 x 20 m"
     },
     {
      "name": "Hollow Body Hold",
      "type": "check",
      "rx": "3 x 20-30s"
     }
    ]
   },
   {
    "name": "COOLDOWN / STRETCH - 8-10 min",
    "items": [
     {
      "name": "Hip flexor stretch",
      "type": "check",
      "rx": "",
      "note": "Fatigue is low today - stretching can run longer"
     },
     {
      "name": "Hamstring stretch",
      "type": "check",
      "rx": "",
      "note": "Fatigue is low today - stretching can run longer"
     },
     {
      "name": "Calf stretch",
      "type": "check",
      "rx": "",
      "note": "Fatigue is low today - stretching can run longer"
     },
     {
      "name": "Thoracic opener",
      "type": "check",
      "rx": "",
      "note": "Fatigue is low today - stretching can run longer"
     }
    ]
   }
  ]
 },
 {
  "id": "4",
  "title": "Upper Hypertrophy + Calisthenics Skill",
  "info": "Objective: add muscle to chest/back/shoulders/arms, more pull-up volume than Day 1",
  "blocks": [
   {
    "name": "WARM-UP",
    "items": [
     {
      "name": "Row or bike",
      "type": "check",
      "rx": "1 x 5-10 min"
     }
    ]
   },
   {
    "name": "PRE-TRAINING MOBILITY - 5-6 min total",
    "items": [
     {
      "name": "T-spine rotations",
      "type": "check",
      "rx": "",
      "note": "Same as Day 1 upper sequence, slightly abbreviated"
     },
     {
      "name": "Shoulder CARs",
      "type": "check",
      "rx": "",
      "note": "Same as Day 1 upper sequence, slightly abbreviated"
     },
     {
      "name": "Band pull-aparts",
      "type": "check",
      "rx": "",
      "note": "Same as Day 1 upper sequence, slightly abbreviated"
     },
     {
      "name": "Scap push-ups",
      "type": "check",
      "rx": "",
      "note": "Same as Day 1 upper sequence, slightly abbreviated"
     }
    ]
   },
   {
    "name": "TENDON / PLYO PREP",
    "items": [
     {
      "name": "Med-ball chest pass (optional)",
      "type": "check",
      "rx": "2 x 8",
      "note": "Skip if Day 1 fatigue lingers"
     }
    ]
   },
   {
    "name": "MAIN WORK",
    "items": [
     {
      "name": "Incline DB Press",
      "type": "lift",
      "target": {
       "1": "3x10",
       "2": "3x10",
       "3": "4x10",
       "4": "4x10",
       "5": "4x8",
       "6": "4x8",
       "7": "3x8",
       "8": "2x10"
      },
      "rir": "8",
      "rest": 90,
      "seed": 30.0,
      "note": "W3-4: 4x10 | W5-6: 4x8 | W7: 3x8 | W8: 2x10"
     },
     {
      "name": "Lat Pulldown / Pull-up skill work",
      "type": "lift",
      "target": {
       "1": "3x10",
       "2": "3x10",
       "3": "4x8",
       "4": "4x8",
       "5": "4x6",
       "6": "4x6",
       "7": "3x6",
       "8": "2x10"
      },
      "rir": "8",
      "rest": 90,
      "note": "W3-4: 4x8 | W5-6: 4x6 | W7: 3x6 | W8: 2x10"
     },
     {
      "name": "Push-up progression (tempo / deficit / weighted)",
      "type": "lift",
      "target": {
       "1": "3xAMRAP-2",
       "2": "3xAMRAP-2",
       "3": "3xAMRAP-2",
       "4": "3xAMRAP-2",
       "5": "4xAMRAP-1",
       "6": "4xAMRAP-1",
       "7": "3xAMRAP-1",
       "8": "2x15 easy"
      },
      "rir": "8",
      "rest": 90,
      "seed": 25.0,
      "note": "W3-4: 3xAMRAP-2 | W5-6: 4xAMRAP-1 | W7: 3xAMRAP-1 | W8: 2x15 easy"
     },
     {
      "name": "Seated Cable Row",
      "type": "lift",
      "target": {
       "1": "3x12",
       "2": "3x12",
       "3": "4x10",
       "4": "4x10",
       "5": "4x10",
       "6": "4x10",
       "7": "3x10",
       "8": "2x12"
      },
      "rir": "8",
      "rest": 75,
      "seed": 45.0,
      "note": "W3-4: 4x10 | W5-6: 4x10 | W7: 3x10 | W8: 2x12"
     },
     {
      "name": "Lateral Raise",
      "type": "lift",
      "target": {
       "1": "3x15",
       "2": "3x15",
       "3": "3x15",
       "4": "3x15",
       "5": "3x12",
       "6": "3x12",
       "7": "3x12",
       "8": "2x15"
      },
      "rir": "7",
      "rest": 60,
      "seed": 10.0,
      "note": "W3-4: 3x15 | W5-6: 3x12 | W7: 3x12 | W8: 2x15"
     },
     {
      "name": "Cable Triceps Pushdown",
      "type": "lift",
      "target": {
       "1": "3x12",
       "2": "3x12",
       "3": "3x12",
       "4": "3x12",
       "5": "3x10",
       "6": "3x10",
       "7": "3x10",
       "8": "2x12"
      },
      "rir": "7",
      "rest": 60,
      "seed": 15.0,
      "note": "W3-4: 3x12 | W5-6: 3x10 | W7: 3x10 | W8: 2x12"
     },
     {
      "name": "DB Curl",
      "type": "lift",
      "target": {
       "1": "3x12",
       "2": "3x12",
       "3": "3x12",
       "4": "3x12",
       "5": "3x10",
       "6": "3x10",
       "7": "3x10",
       "8": "2x12"
      },
      "rir": "7",
      "rest": 60,
      "seed": 10.0,
      "note": "W3-4: 3x12 | W5-6: 3x10 | W7: 3x10 | W8: 2x12"
     }
    ]
   },
   {
    "name": "CORE",
    "items": [
     {
      "name": "Hanging Leg Raise",
      "type": "check",
      "rx": "3 x 8-10"
     },
     {
      "name": "Cable Anti-Rotation Press",
      "type": "check",
      "rx": "3 x 10 / side"
     }
    ]
   },
   {
    "name": "COOLDOWN / STRETCH - 6-8 min",
    "items": [
     {
      "name": "Chest stretch",
      "type": "check",
      "rx": ""
     },
     {
      "name": "Lat stretch",
      "type": "check",
      "rx": ""
     },
     {
      "name": "Triceps stretch",
      "type": "check",
      "rx": ""
     },
     {
      "name": "Biceps stretch",
      "type": "check",
      "rx": ""
     }
    ]
   }
  ]
 },
 {
  "id": "5",
  "title": "Lower Power + Running Speed",
  "info": "AM: power/tendon work. PM (3-5 h later): sprints. If doing both together, do AM first.",
  "blocks": [
   {
    "name": "AM · WARM-UP",
    "items": [
     {
      "name": "Bike or jog",
      "type": "check",
      "rx": "1 x 5-8 min"
     }
    ]
   },
   {
    "name": "AM · PRE-TRAINING MOBILITY - 6 min total",
    "items": [
     {
      "name": "Ankle rocks",
      "type": "check",
      "rx": "",
      "note": "Split the 6 min block across these four drills"
     },
     {
      "name": "Hip CARs",
      "type": "check",
      "rx": "",
      "note": "Split the 6 min block across these four drills"
     },
     {
      "name": "Leg swings",
      "type": "check",
      "rx": "",
      "note": "Split the 6 min block across these four drills"
     },
     {
      "name": "Walking lunge with reach",
      "type": "check",
      "rx": "",
      "note": "Split the 6 min block across these four drills"
     }
    ]
   },
   {
    "name": "AM · TENDON / PLYO PREP",
    "items": [
     {
      "name": "Pogo jumps",
      "type": "check",
      "rx": "2 x 15",
      "note": "W1-2 and W8 (minimal). Present as base dose",
      "weeks": [
       1,
       2,
       8
      ]
     },
     {
      "name": "Low hop-and-stick",
      "type": "check",
      "rx": "2 x 5",
      "note": "W1-2",
      "weeks": [
       1,
       2
      ]
     },
     {
      "name": "Snap-downs",
      "type": "check",
      "rx": "2 x 5",
      "note": "Added W3-4",
      "weeks": [
       3,
       4
      ]
     },
     {
      "name": "Low box jumps",
      "type": "check",
      "rx": "3 x 5",
      "note": "W5-6 and W7 (W7 = peak dose, higher quality / lower volume)",
      "weeks": [
       5,
       6,
       7
      ]
     },
     {
      "name": "Bounds",
      "type": "check",
      "rx": "2 x 20 m",
      "note": "W5-6 and W7",
      "weeks": [
       5,
       6,
       7
      ]
     }
    ]
   },
   {
    "name": "AM · MAIN WORK",
    "items": [
     {
      "name": "Trap Bar Deadlift (power intent)",
      "type": "lift",
      "target": {
       "1": "4x5",
       "2": "4x5",
       "3": "4x4",
       "4": "4x4",
       "5": "5x3",
       "6": "5x3",
       "7": "5x2-3",
       "8": "2x5 light"
      },
      "rir": "7-8",
      "rest": 150,
      "note": "W3-4: 4x4 | W5-6: 5x3 | W7: 5x2-3 | W8: 2x5 light"
     },
     {
      "name": "Walking Lunge (loaded)",
      "type": "lift",
      "target": {
       "1": "3x8 / leg",
       "2": "3x8 / leg",
       "3": "3x8/leg",
       "4": "3x8/leg",
       "5": "3x6/leg",
       "6": "3x6/leg",
       "7": "3x6/leg",
       "8": "2x8/leg light"
      },
      "rir": "7",
      "rest": 90,
      "note": "W3-4: 3x8/leg | W5-6: 3x6/leg | W7: 3x6/leg | W8: 2x8/leg light"
     },
     {
      "name": "Box Jump (moderate height, stick landing)",
      "type": "lift",
      "target": {
       "1": "3x5",
       "2": "3x5",
       "3": "3x5",
       "4": "3x5",
       "5": "4x5",
       "6": "4x5",
       "7": "4x5",
       "8": "2x5 low box"
      },
      "rir": "7",
      "rest": 120,
      "note": "W3-4: 3x5 | W5-6: 4x5 | W7: 4x5 | W8: 2x5 low box"
     },
     {
      "name": "Single-Leg Calf Raise",
      "type": "lift",
      "target": {
       "1": "3x10 / leg",
       "2": "3x10 / leg",
       "3": "3x10/leg",
       "4": "3x10/leg",
       "5": "3x10/leg",
       "6": "3x10/leg",
       "7": "3x10/leg",
       "8": "2x10/leg"
      },
      "rir": "7",
      "rest": 60,
      "note": "W3-7: 3x10/leg | W8: 2x10/leg"
     }
    ]
   },
   {
    "name": "AM · CORE",
    "items": [
     {
      "name": "Suitcase Carry",
      "type": "check",
      "rx": "3 x 20 m / side"
     }
    ]
   },
   {
    "name": "AM · COOLDOWN",
    "items": [
     {
      "name": "Light stretch only",
      "type": "check",
      "rx": "1 x 5 min",
      "note": "Save full stretching for the PM session"
     }
    ]
   },
   {
    "name": "PM · WARM-UP",
    "items": [
     {
      "name": "Easy jog",
      "type": "check",
      "rx": "1 x 10 min"
     },
     {
      "name": "Dynamic drills: A-skips, high knees, butt kicks",
      "type": "check",
      "rx": ""
     }
    ]
   },
   {
    "name": "PM · PRE-TRAINING MOBILITY - 5 min total",
    "items": [
     {
      "name": "Leg swings",
      "type": "check",
      "rx": ""
     },
     {
      "name": "Ankling",
      "type": "check",
      "rx": ""
     },
     {
      "name": "Straight-leg bounds",
      "type": "check",
      "rx": ""
     }
    ]
   },
   {
    "name": "PM · MAIN WORK",
    "items": [
     {
      "name": "Sprints - W1-2",
      "type": "cardio",
      "rx": "5 x 60 m @ 75-80%",
      "restTxt": "2-3 min walk-back",
      "note": "Relaxed mechanics, posture, rhythm - not max speed yet. Log in RUNNING LOG",
      "weeks": [
       1,
       2
      ]
     },
     {
      "name": "Sprints - W3-4",
      "type": "cardio",
      "rx": "5-6 x 60-80 m @ 85%",
      "restTxt": "3 min",
      "note": "Acceleration quality and smooth top-end transition. No speed-endurance work yet",
      "weeks": [
       3,
       4
      ]
     },
     {
      "name": "Sprints - W5-6",
      "type": "cardio",
      "rx": "5 x 80-100 m @ 90-95%",
      "restTxt": "3-4 min",
      "note": "Then add 2x150 m @ ~85% with 4 min rest, AFTER the sprints, not instead of them",
      "weeks": [
       5,
       6
      ]
     },
     {
      "name": "Sprints - W7 (peak)",
      "type": "cardio",
      "rx": "4-5 x 80-100 m @ 95-100%",
      "restTxt": "4-5 min",
      "note": "Near-maximal. No speed-endurance addition this week - quality over quantity",
      "weeks": [
       7
      ]
     },
     {
      "name": "Sprints - W8 (deload)",
      "type": "cardio",
      "rx": "4 x 60 m @ 70-75%",
      "restTxt": "Full recovery",
      "note": "Pure mechanics focus ahead of retesting. No maximal efforts",
      "weeks": [
       8
      ]
     },
     {
      "name": "Swim substitution",
      "type": "cardio",
      "rx": "8x25 m fast, full rest  OR  4x50 m moderate-hard",
      "restTxt": "Full rest",
      "note": "Purpose is neuromuscular speed/power output, not distance swimming"
     }
    ]
   },
   {
    "name": "PM · COOLDOWN / STRETCH - 8-10 min",
    "items": [
     {
      "name": "Hip flexor stretch",
      "type": "check",
      "rx": ""
     },
     {
      "name": "Hamstring stretch",
      "type": "check",
      "rx": ""
     },
     {
      "name": "Calf stretch",
      "type": "check",
      "rx": ""
     },
     {
      "name": "Quad stretch",
      "type": "check",
      "rx": ""
     }
    ]
   }
  ]
 },
 {
  "id": "6",
  "title": "Hybrid Circuit + Optional Recovery",
  "info": "Run ONE circuit - the one matching the current week. Downgrade to Circuit A if fatigue is high",
  "blocks": [
   {
    "name": "WARM-UP",
    "items": [
     {
      "name": "Easy movement matching circuit modality",
      "type": "check",
      "rx": "1 x 5-8 min"
     }
    ]
   },
   {
    "name": "PRE-TRAINING MOBILITY",
    "items": [
     {
      "name": "Full-body dynamic flow",
      "type": "check",
      "rx": "1 x 5 min",
      "note": "Light, not draining"
     }
    ]
   },
   {
    "name": "CIRCUIT A - AEROBIC HYBRID (Weeks 1-2, and any high-fatigue week)",
    "items": [
     {
      "name": "A1 Goblet Squat",
      "type": "check",
      "rx": "4 rounds x 12",
      "restTxt": "60-90s between rounds",
      "note": "Continuous, ~20 min work"
     },
     {
      "name": "A2 Push-up",
      "type": "check",
      "rx": "4 rounds x 10"
     },
     {
      "name": "A3 Row erg or run",
      "type": "check",
      "rx": "4 rounds x 300 m"
     },
     {
      "name": "A4 Farmer's Carry",
      "type": "check",
      "rx": "4 rounds x 30 m"
     },
     {
      "name": "A5 Plank",
      "type": "check",
      "rx": "4 rounds x 30s"
     }
    ],
    "weeks": [
     1,
     2,
     8
    ]
   },
   {
    "name": "CIRCUIT B - STRENGTH-ENDURANCE (Weeks 3-4)",
    "items": [
     {
      "name": "B1 Kettlebell Deadlift",
      "type": "check",
      "rx": "5 rounds x 10",
      "restTxt": "90s between rounds",
      "note": "~25 min work"
     },
     {
      "name": "B2 Inverted Row",
      "type": "check",
      "rx": "5 rounds x 10"
     },
     {
      "name": "B3 Assault Bike",
      "type": "check",
      "rx": "5 rounds x 30s hard"
     },
     {
      "name": "B4 Suitcase Carry",
      "type": "check",
      "rx": "5 rounds x 20 m / side"
     },
     {
      "name": "B5 Hanging Knee Raise",
      "type": "check",
      "rx": "5 rounds x 10"
     }
    ],
    "weeks": [
     3,
     4
    ]
   },
   {
    "name": "CIRCUIT C - POWER HYBRID (Weeks 5-6)",
    "items": [
     {
      "name": "C1 DB Clean",
      "type": "check",
      "rx": "5 rounds x 6",
      "restTxt": "2 min between rounds",
      "note": "Short explosive efforts, generous rest, ~20 min work"
     },
     {
      "name": "C2 Box Jump",
      "type": "check",
      "rx": "5 rounds x 5"
     },
     {
      "name": "C3 Sled Push",
      "type": "check",
      "rx": "5 rounds x 20 m"
     },
     {
      "name": "C4 Pull-up (or assisted)",
      "type": "check",
      "rx": "5 rounds x 5"
     },
     {
      "name": "C5 Ski Erg",
      "type": "check",
      "rx": "5 rounds x 20s max effort"
     }
    ],
    "weeks": [
     5,
     6
    ]
   },
   {
    "name": "CIRCUIT D - RACE-STYLE (Week 7 only - peak intensity)",
    "items": [
     {
      "name": "D1 Dumbbell Thruster",
      "type": "check",
      "rx": "4 rounds x 10",
      "restTxt": "As needed, keep moving",
      "note": "For time, ~18-22 min total. The one week higher-intensity conditioning is emphasised"
     },
     {
      "name": "D2 Burpee",
      "type": "check",
      "rx": "4 rounds x 8"
     },
     {
      "name": "D3 Row erg",
      "type": "check",
      "rx": "4 rounds x 250 m"
     },
     {
      "name": "D4 Sandbag Carry",
      "type": "check",
      "rx": "4 rounds x 40 m"
     }
    ],
    "weeks": [
     7
    ]
   },
   {
    "name": "WEEK 8 (DELOAD)",
    "items": [
     {
      "name": "Circuit A only",
      "type": "check",
      "rx": "3 rounds x As per Circuit A",
      "restTxt": "60-90s"
     }
    ],
    "weeks": [
     8
    ]
   },
   {
    "name": "EQUIPMENT SUBSTITUTION",
    "items": [
     {
      "name": "Running available",
      "type": "info",
      "rx": "",
      "note": "Swap erg/bike for a 300-400 m run"
     },
     {
      "name": "Swimming available",
      "type": "info",
      "rx": "",
      "note": "Swap the conditioning piece for 2-4x50 m swim intervals"
     },
     {
      "name": "Minimal equipment",
      "type": "info",
      "rx": "",
      "note": "Swap loaded carries/sled for band work + bodyweight + backpack carry"
     }
    ]
   },
   {
    "name": "CORE",
    "items": [
     {
      "name": "Built into the circuit",
      "type": "info",
      "rx": "",
      "note": "Carries, planks, hanging raises - no extra direct ab work today"
     }
    ]
   },
   {
    "name": "COOLDOWN / STRETCH - 8-10 min",
    "items": [
     {
      "name": "Full-body static stretch",
      "type": "check",
      "rx": "1 x 8-10 min",
      "note": "Emphasis on whatever felt tightest"
     }
    ]
   }
  ]
 }
];
