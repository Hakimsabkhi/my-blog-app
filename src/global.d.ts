declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: typeof import('mongoose') | null;
        promise: Promise<typeof import('mongoose')> | null;
      };
    }
  }
}

// Prevent TypeScript from treating this file as a script
export {};
