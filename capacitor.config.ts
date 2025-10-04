import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fitboost.app',
  appName: 'FitBoost AI',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    AdMob: {
      appId: process.env.NEXT_PUBLIC_ADMOB_APP_ID,
      bannerAdId: process.env.NEXT_PUBLIC_ADMOB_BANNER_ID,
      interstitialAdId: process.env.NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID,
    }
  }
};

export default config;
