import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client/default.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';
import router from './src/routes/index';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3001;

// 1. Настройка подключения к PostgreSQL  Prisma 7
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });


// 1. Настройка cors
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); 

// 2. Парсеры 
app.use(express.json()); // Чтобы читать req.body
app.use(cookieParser()); // Чтобы читать req.cookies

// 3. Entry Route
app.use('/api', router);


// Запуск сервера
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
