# DeSiaVe Web Application Implementation Plan

A comprehensive mobile-first gaming, rewards, and financial tracking web application ("DeSiaVe") featuring interactive task lists, inventory management, rewards claiming, authentication, account customization, and local sample data fallback.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> Based on your confirmed choices in Phase 1:
> - **Workspace Extraction**: All files, components, styles, data schemas, and assets will be unpacked directly into the current AI Studio workspace and run in the live preview.
> - **Data Layer Connection**: The app will use the included high-fidelity sample data and local client-state mock fallback so you can immediately explore and test all screens without needing external Supabase credentials.

- **Confirmed Decision 1**: Unpack and place all project files (screens, components, styles, hooks, data, assets) without modifications to project architecture or structure.
- **Confirmed Decision 2**: Enable seamless local mock/sample fallback for Supabase client operations to ensure smooth out-of-the-box rendering in AI Studio.

---

### 1. Overview & Core Concept

- **What It Does**: DeSiaVe is a gamified productivity and rewards application that combines interactive quest/task management, wallet/money tracking, inventory/chest loot system, and account leveling.
- **Target Audience**: Users seeking an engaging, gamified interface for tracking tasks, earning virtual currency/points, leveling up through quests, and managing in-app rewards.
- **Key Value**: Delivers an immersive, touch-optimized visual experience with instant feedback, tactile animations, rich iconography, and persistent user progress tracking.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Splash & Authentication**: Seamless login/signup flow with guest/mock mode support and quick credential access.
  2. **Home / Dashboard**: Overview of current level, health/energy meters, active quests, daily bonus loot chests, and highlighted tasks.
  3. **Money / Wallet**: Balance overview, earnings history, transaction logs, withdrawal/deposit simulation, and reward exchange options.
  4. **Pages & Tasks**: Categorized quest lists with interactive checkboxes, reward multipliers, filter tabs, and progress counters.
  5. **Account & Settings**: Profile customization, avatar selection, stats overview, theme toggles, and security preferences.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Vibrant, tactile gamified interface with rich dark/gold palette accents, custom game icons, and sleek mobile-first container ergonomics.
  - *Color Palette*: Deep obsidian slate canvas (`#0f172a`), metallic gold and amber accents (`#f59e0b`, `#eab308`), neon cyan energy meters (`#06b6d4`), and emerald reward indicators (`#10b981`).
  - *Typography*: Clean, legible sans-serif hierarchy with bold tabular numerals (`tabular-nums`) for currency, level numbers, and countdown timers.
  - *Component Styling*: Ergonomic rounded cards (`rounded-2xl`), subtle hairline borders, floating bottom navigation bar with active state glow, and interactive micro-press states.

- **Interactive Feedback & Motion**:
  - Smooth bottom navigation transitions between tabs.
  - Tactile loot chest open animations and reward claim feedback toasts.
  - Instant progress bar fills upon task completion.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Full Workspace Unpack with Exact Folder Hierarchy**
  - *Chosen Approach*: Extract all project files (`src/components/gx`, `src/screens`, `src/pages`, `src/hooks`, `src/data`, `src/lib`, `src/context`, `src/styles`, `public/assets`, `supabase`) exactly as structured.
  - *Why*: Ensures 100% fidelity to the original codebase without missing dependencies or broken asset paths.
  - *Alternatives Considered*: Re-architecting into single-page components (rejected to preserve exact project structure).

- **Decision 2: Resilient Local Sample Data Fallback**
  - *Chosen Approach*: Configure the Supabase client wrapper with graceful fallback to `sample.ts` and local mock state when Supabase environment variables are not provided.
  - *Why*: Allows immediate visual preview and full interaction without requiring external Supabase project setup.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                       DeSiaVe Web Client                        │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 │       App & AuthContext       │
                 └───────────────┬───────────────┘
                                 │
     ┌───────────────────┬───────┴───────────┬───────────────────┐
     ▼                   ▼                   ▼                   ▼
┌──────────────┐  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Home Screen  │  │ Money Screen │   │ Pages Screen │   │Account Screen│
│ • Quests     │  │ • Balance    │   │ • Task Lists │   │ • Profile    │
│ • Loot Chest │  │ • Transfers  │   │ • Filters    │   │ • Stats      │
└──────┬───────┘  └──────┬───────┘   └──────┬───────┘   └──────┬───────┘
       │                 │                  │                  │
       └─────────────────┼──────────────────┴──────────────────┘
                         ▼
       ┌─────────────────────────────────────────┐
       │         Data Layer & Hooks              │
       │ • useRows.ts (Quests, Tasks, Rewards)   │
       │ • Supabase Client & local sample.ts     │
       └─────────────────────────────────────────┘
```

- **Core Entities & State**:
  - `User Profile`: Level, XP, Gold/Coins, Energy, Avatar, Streak.
  - `Tasks / Rows`: Title, category, reward value, completion status, difficulty tier.
  - `Transactions`: Type, amount, timestamp, description, status.
  - `Inventory Items`: Chests, consumables, badges, unlockable skins.
- **Interactive Component Mapping**:
  - `Navigation.tsx`: Fixed 4-tab bottom navigation bar with active route highlighting.
  - `ListScreen.tsx`: High-performance virtualized list for tasks and transactions with filter chips.
  - `Icon.tsx` & `Basics.tsx`: Shared atomic visual components and asset loaders.
