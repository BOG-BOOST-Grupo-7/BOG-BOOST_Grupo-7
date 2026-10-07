import Constants from 'expo-constants';

// URL base del backend Express (el mismo que usa la web).
// Prioridad: 1) variable EXPO_PUBLIC_API_URL (.env)  2) la IP de tu PC detectada por Expo en desarrollo  3) localhost.
// En un celular real "localhost" apunta al propio celular, por eso se usa la IP del bundler de Expo.
const fromEnv = process.env.EXPO_PUBLIC_API_URL;
const devHost = Constants.expoConfig?.hostUri?.split(':')[0];

export const API_URL: string =
    fromEnv ?? (devHost ? `http://${devHost}:3000/api` : 'http://localhost:3000/api');
