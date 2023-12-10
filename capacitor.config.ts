import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.landsurvey.app',
  appName: 'land-survey',
  webDir: 'dist/land-survey',
  server: {
    androidScheme: 'https'
  }
};

export default config;
