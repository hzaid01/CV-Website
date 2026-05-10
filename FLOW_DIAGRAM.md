# Portfolio Flow Diagram

## User Experience Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     USER VISITS SITE                        │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   VIDEO INTRO COMPONENT                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  1. Show Loading Spinner                              │  │
│  │     "Loading Experience... 0%"                        │  │
│  │                                                        │  │
│  │  2. Preload Frames in Background                      │  │
│  │     - Desktop: 800 frames (1920x1080)                 │  │
│  │     - Mobile: 800 frames (1080x1920)                  │  │
│  │     - Progress: 0% → 100%                             │  │
│  │                                                        │  │
│  │  3. At 50% Loaded → Start Playing                     │  │
│  │     - Hide loading spinner                            │  │
│  │     - Show canvas with frames                         │  │
│  │     - Play at 50 FPS (smooth!)                        │  │
│  │                                                        │  │
│  │  4. After 1 Second → Show Skip Button                 │  │
│  │     [Skip Intro →]                                    │  │
│  │                                                        │  │
│  │  5. Play All 800 Frames (16 seconds)                  │  │
│  │     OR User Clicks Skip                               │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   LOADING SCREEN                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  - Show loading progress (0% → 100%)                  │  │
│  │  - Load 3D models and assets                          │  │
│  │  - Animated loading button                            │  │
│  │  - "Full Stack Developer" marquee                     │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   MAIN PORTFOLIO                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  - Landing Section                                     │  │
│  │  - About Section                                       │  │
│  │  - Career Section (UPDATED!)                          │  │
│  │    • Buzzware Tech (Aug 2024 - Sep 2024)             │  │
│  │    • Hazza Institute (Apr 2025 - Jul 2025)           │  │
│  │    • Freelance (2024 - Present)                       │  │
│  │  - Projects Section                                    │  │
│  │  - Contact Section                                     │  │
│  │  - 3D Character Model                                  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

```
App.tsx
├── [showIntro = true]
│   └── VideoIntro Component
│       ├── Loading Indicator (while preloading)
│       ├── Canvas (frame playback)
│       └── Skip Button (after 1s)
│
└── [showIntro = false]
    └── LoadingProvider
        └── MainContainer
            ├── Loading Screen
            └── Character Model + Portfolio Sections
```

## State Management

```
┌─────────────────────────────────────────────────────────────┐
│                      App.tsx                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  const [showIntro, setShowIntro] = useState(true)      │ │
│  │                                                         │ │
│  │  handleIntroComplete() {                               │ │
│  │    setShowIntro(false) // Hide intro, show main app    │ │
│  │  }                                                      │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  VideoIntro.tsx                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  const [isLoading, setIsLoading] = useState(true)      │ │
│  │  const [loadProgress, setLoadProgress] = useState(0)   │ │
│  │  const [canSkip, setCanSkip] = useState(false)         │ │
│  │  const [isSkipped, setIsSkipped] = useState(false)     │ │
│  │                                                         │ │
│  │  // Preload frames                                     │ │
│  │  img.onload = () => {                                  │ │
│  │    loadedCount++                                       │ │
│  │    setLoadProgress(loadedCount / totalFrames * 100)    │ │
│  │    if (loadedCount === 50%) {                          │ │
│  │      setIsLoading(false) // Start playing             │ │
│  │      playFrames()                                      │ │
│  │    }                                                    │ │
│  │  }                                                      │ │
│  │                                                         │ │
│  │  // Frame playback                                     │ │
│  │  playFrames() {                                        │ │
│  │    requestAnimationFrame(animate)                      │ │
│  │    // Play at 50 FPS                                   │ │
│  │    if (frameRef.current >= 799) {                      │ │
│  │      onComplete() // Call parent's handleIntroComplete │ │
│  │    }                                                    │ │
│  │  }                                                      │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Timeline

```
Time:  0s    1s    2s    3s    4s    5s    ...    16s
       │     │     │     │     │     │             │
       ▼     ▼     ▼     ▼     ▼     ▼             ▼
       │     │     │     │     │     │             │
Load   ├─────┤     │     │     │     │             │
0-50%  │ ████│     │     │     │     │             │
       │     │     │     │     │     │             │
Play   │     ├─────┴─────┴─────┴─────┴─────────────┤
Frames │     │ ████████████████████████████████████│
       │     │                                      │
Skip   │     ├─────────────────────────────────────┤
Button │     │ [Skip Intro →] Available            │
       │     │                                      │
       └─────┴──────────────────────────────────────┘
                                                    │
                                                    ▼
                                            Transition to
                                            Loading Screen
```

## Responsive Behavior

```
┌─────────────────────────────────────────────────────────────┐
│                    Device Detection                         │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │ window.innerWidth     │
              └───────────┬───────────┘
                          │
          ┌───────────────┴───────────────┐
          │                               │
          ▼                               ▼
    ┌─────────┐                     ┌─────────┐
    │ ≤ 768px │                     │ > 768px │
    │ MOBILE  │                     │ DESKTOP │
    └────┬────┘                     └────┬────┘
         │                               │
         ▼                               ▼
┌─────────────────┐           ┌─────────────────┐
│ Load Mobile     │           │ Load Desktop    │
│ Frames          │           │ Frames          │
│ 1080x1920       │           │ 1920x1080       │
│ 800 frames      │           │ 800 frames      │
│ 134.51 MB       │           │ 145.28 MB       │
└─────────────────┘           └─────────────────┘
```

## Performance Optimization

```
┌─────────────────────────────────────────────────────────────┐
│                  Frame Loading Strategy                     │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │ Start Loading Frames  │
              │ (All 800 in parallel) │
              └───────────┬───────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │ Track Progress        │
              │ 0% → 100%             │
              └───────────┬───────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │ At 50% Loaded         │
              │ (400 frames ready)    │
              └───────────┬───────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │ START PLAYING         │
              │ (Don't wait for 100%) │
              └───────────┬───────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │ Continue Loading      │
              │ Remaining 400 Frames  │
              │ While Playing         │
              └───────────────────────┘
```

## Key Differences: Before vs After

```
┌─────────────────────────────────────────────────────────────┐
│                         BEFORE                              │
├─────────────────────────────────────────────────────────────┤
│  1. Loading screen appears first                            │
│  2. Frames play on scroll (in background)                   │
│  3. 82 frames at 45 FPS                                     │
│  4. Scroll prompt: "Scroll Down ↓"                          │
│  5. User must scroll to see animation                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         AFTER                               │
├─────────────────────────────────────────────────────────────┤
│  1. Video intro plays FIRST (before loading)                │
│  2. Frames play automatically (no scroll needed)            │
│  3. 800 frames at 50 FPS (smoother!)                        │
│  4. Skip button: "Skip Intro →"                             │
│  5. Professional intro experience                           │
│  6. Then transitions to loading screen                      │
└─────────────────────────────────────────────────────────────┘
```

---

**This flow ensures a smooth, professional intro experience!**
