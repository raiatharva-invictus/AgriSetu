# AgriSetu (कृषिसेतु) — Mobile Application

AgriSetu is a human-centered mobile application designed for Indian farmers and agricultural experts. It bridges the gap between rural crop health issues and certified agricultural scientists (ICAR / KVK / Private Agronomists).

---

## 🛠️ QA & Development Workflow (Android Emulator First)

We separate development and testing into two distinct levels to avoid slow Gradle/APK builds during ordinary feature work:

### LEVEL 1 — DEVELOPMENT (Android Emulator)
> **Purpose**: Fast iteration, UI changes, and functional testing via Fast Refresh. No APK build required.

#### 1. Start Android Emulator & Expo Server
```bash
# Launch Expo development server targeting Android emulator
npm run android

# Or general dev server
npm run dev
```

#### 2. Live Emulator Development Workflow
1. Start your AVD / Android Emulator in Android Studio (`emulator -avd <your_avd_name>`).
2. Run `npm run android`. Expo will connect directly to the emulator.
3. Edit code in your IDE — changes reflect instantly via **Fast Refresh**.
4. Test live flows:
   - Splash & Language selection
   - Farmer & Expert onboarding
   - Session persistence
   - Reset Demo button
   - Ask for Help & Crop problem submission
   - Expert Matching Engine & Ranking
   - Consultation booking & Case status updates

---

### 🧪 AUTOMATED TESTING & SMOKE CHECKS

```bash
# Run fast Android & Supabase data layer smoke tests
npm run test:android

# Run TypeScript compilation check
npx tsc --noEmit
```

---

### LEVEL 2 — RELEASE & APK CREATION
> **Purpose**: Final milestone distributable build and physical Android device verification.

#### Release Command
```bash
# Canonical milestone release APK build (EAS)
npm run release:android
```

> [!IMPORTANT]
> **Release Gate Criteria**:
> `npm run release:android` should only be run at code-freeze milestones.
> Pre-release checklist before triggering EAS APK creation:
> 1. `npx tsc --noEmit` passes with 0 errors.
> 2. `npm run test:android` passes all 32 acceptance items.
> 3. Supabase database schema & RLS policies verified.

---

### 📱 Physical Device Verification Checklist

After generating the APK via `npm run release:android` and installing on a physical Android phone, verify:
- [ ] **Touch Interactions**: 48px+ touch targets responsive to thumb input.
- [ ] **Keyboard Behavior**: Text inputs do not obscure action buttons.
- [ ] **Image Upload**: Camera & gallery permissions and photo selection.
- [ ] **Network & Offline Behavior**: Resilient data handling during network toggles.
- [ ] **Supabase Persistence**: Session stays logged in after app kill & restart.
- [ ] **Reset Demo**: Tapping Reset Demo returns the app to Splash & Language selection.

---

## 🏗️ Technical Architecture

- **Framework**: React Native + Expo (Expo Router) + TypeScript
- **Backend & Database**: Supabase PostgreSQL + Row Level Security (RLS) + Storage
- **Matching Engine**: Weighted multi-factor scoring ([matchingEngine.ts](file:///d:/Hackathons/Jynex/AgriSetu/src/services/matchingEngine.ts))
- **Localization**: 4 supported languages (`en`, `hi`, `bn`, `as`)
