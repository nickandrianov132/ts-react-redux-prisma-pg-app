import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client/default.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import router from './src/routes/index'

const app = express();
const port = 3001;

// 1. Настройка подключения к PostgreSQL  Prisma 7
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });


const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

// 2. Middlewares
app.use(cors()); 
app.use(express.json()); 

// 3. Entry Route
app.use('/api', router);


// Запуск сервера
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
