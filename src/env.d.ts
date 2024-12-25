/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RECAPTCHA_SITE_KEY: string
  readonly VITE_API_URL: string
  // add more environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}