export {}; // Делает файл модулем

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}