/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_TOKEN: string;
  readonly VITE_IMAGE_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
