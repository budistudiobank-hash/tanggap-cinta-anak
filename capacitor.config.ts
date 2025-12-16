import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.tanggapstunting.app',
  appName: 'Tanggap Stunting',
  webDir: 'dist',
  server: {
    url: 'https://ea00f616-7306-49b5-b67b-f6ea0aae6945.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    }
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#16A34A',
      showSpinner: false,
    }
  }
};

export default config;
