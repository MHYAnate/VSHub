export const env = {
  astra: {
    namespace: process.env.ASTRA_DB_NAMESPACE!,
    collection: process.env.ASTRA_DB_COLLECTION!,
    apiEndpoint: process.env.ASTRA_DB_API_ENDPOINT!,
    applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN!,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY!,
  },
  tavily: {
    apiKey: process.env.TAVILY_API_KEY!,
  },
  langchain: {
    apiKey: process.env.LANGCHAIN_API_KEY!,
    callbacksBackground: process.env.LANGCHAIN_CALLBACKS_BACKGROUND === 'true',
    tracingV2: process.env.LANGCHAIN_TRACING_V2 === 'true',
    project: process.env.LANGCHAIN_PROJECT!,
  },
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY!,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.FIREBASE_PROJECT_ID!,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.FIREBASE_APP_ID!,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID!,
  },
} as const;