declare global {
    namespace NodeJS {
        interface ProcessEnv {
            FREE_CURRENCY_API_KEY: string,
            PORT?: string,
        }
    }
}

export {}