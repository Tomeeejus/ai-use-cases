import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b1a9f34c792f42669adfee1a754fe6af',
  appName: 'usecase-nexus',
  webDir: 'dist',
  server: {
    url: 'https://b1a9f34c-792f-4266-9adf-ee1a754fe6af.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1b23',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#8b5cf6'
    }
  }
};

export default config;