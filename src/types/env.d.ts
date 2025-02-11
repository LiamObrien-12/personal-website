declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_VERCEL_PROJECT_ID: string;
      NODE_ENV: 'development' | 'production' | 'test';
      REACT_APP_OPENAI_API_KEY: string;
      REACT_APP_CHATBASE_API_KEY: string;
    }
  }
}

export {} 