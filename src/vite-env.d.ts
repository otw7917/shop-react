/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_APP_ID: string;
  readonly VITE_DATABASE_URL: string;
  readonly VITE_UPLOAD_URL: string;
  readonly VITE_UPLOAD_PRESET: string;
}
