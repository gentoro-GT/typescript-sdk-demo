/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_OPENAI_API_KEY: string
    readonly VITE_GENTORO_API_KEY: string
    readonly VITE_GENTORO_BRIDGE_UID: string
    readonly VITE_GENTORO_BASE_URI: string
    readonly VITE_OPENAI_MODEL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
