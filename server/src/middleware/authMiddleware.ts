import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'fallback-secret';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 1. достаем токен из заголовка
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied, token is missing' });
  }

  try {
    // 2. Проверка токена
    const decoded = jwt.verify(token, secret) as { userId: number };
    
    // 3. Записываем ID пользователя в запрос для дальнейшего использования
    req.userId = decoded.userId;
    
    // 4. Передаем управление следующей функции (роуту)
    next();
  } catch (error) {
    res.status(403).json({ error: 'Incorrect token' });
  }
};