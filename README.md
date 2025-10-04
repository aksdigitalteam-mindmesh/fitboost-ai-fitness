# FitBoost AI Fitness App

A complete fitness and nutrition AI coaching app built with Next.js, featuring personalized workout plans, diet recommendations, and progress tracking.

## Features

✅ **AI-Powered Workout & Diet Plans** - Generate personalized fitness and nutrition plans
✅ **Dashboard with Progress Tracking** - Calorie, macro, and water intake tracking
✅ **Guided Workout Sessions** - Step-by-step workout guidance with timers
✅ **Recipe Collection** - Discover and save healthy recipes
✅ **Profile Management** - Personal settings, theme switching, and subscription management
✅ **LocalStorage Persistence** - All data saved locally for offline use
✅ **Mock AI Responses** - Works offline without real API keys
✅ **AdMob Integration** - Ready for monetization
✅ **Capacitor Support** - Android app ready

## Tech Stack

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS** + **ShadCN UI**
- **Next Themes** (Dark/Light mode)
- **Lucide React** (Icons)
- **Capacitor** (Mobile app)
- **AdMob** (Monetization)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Setup

Create a `.env.local` file in the root directory:

```env
# Genkit AI API Key (optional - app works without it using mock data)
GENKIT_API_KEY=your_actual_genkit_api_key_here

# AdMob Configuration
NEXT_PUBLIC_ADMOB_APP_ID=ca-app-pub-yourappid~id
NEXT_PUBLIC_ADMOB_BANNER_ID=ca-app-pub-yourbannerid
NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID=ca-app-pub-yourinterstitialid
```

## AI Integration

The app includes two modes:

1. **Mock Mode** (Default) - Works offline with realistic mock data
2. **Real API Mode** - Uses your Genkit API key for real AI responses

To enable real AI:
1. Get a Genkit API key
2. Add it to your `.env.local` file
3. Restart the development server

## Mobile App (Android)

To build for Android:

1. **Install Capacitor:**
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android
   ```

2. **Initialize Capacitor:**
   ```bash
   npx cap init fitboost com.fitboost.app
   npx cap add android
   ```

3. **Build and sync:**
   ```bash
   npm run build
   npx cap sync
   npx cap open android
   ```

## AdMob Integration

The app includes AdMob placeholders for:
- Banner ads on dashboard and other pages
- Interstitial ads before AI generation
- Rewarded ads for premium features

To enable ads:
1. Create an AdMob account
2. Add your AdMob IDs to `.env.local`
3. The ads will automatically appear

## Project Structure

```
app/
├── dashboard/          # Main app pages
│   ├── page.tsx       # Dashboard home
│   ├── workout/       # Workout tracking
│   ├── programs/      # AI coach
│   ├── recipes/       # Recipe collection
│   └── profile/       # User profile
├── api/               # API routes
│   ├── generate-workout/
│   └── generate-diet/
└── globals.css        # Global styles

components/
├── ui/                # Reusable UI components
├── bottom-nav.tsx     # Bottom navigation
└── theme-provider.tsx # Theme management

src/
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── ai/                # AI-related utilities
```

## Features Overview

### Dashboard
- Calorie tracking with circular progress
- Macro nutrition bars (Protein, Carbs, Fats)
- Water intake tracker
- Today's workout card
- Meal logging system

### Workout
- 7-day workout plans
- Guided exercise sessions
- Progress tracking
- Workout statistics

### AI Coach
- Workout plan generator
- Diet plan generator
- Premium subscription system
- Usage tracking

### Recipes
- Recipe discovery and search
- Saved recipes collection
- Shopping list management
- Nutrition information

### Profile
- Personal information management
- Theme switching (Light/Dark/System)
- Subscription management
- Settings and preferences

## Customization

The app is fully customizable:
- Colors and themes in `tailwind.config.js`
- Mock data in API routes
- UI components in `components/ui/`
- Hooks for state management in `src/hooks/`

## License

MIT License - feel free to use this project for your own fitness app!

## Support

For questions or support, please open an issue on GitHub.
