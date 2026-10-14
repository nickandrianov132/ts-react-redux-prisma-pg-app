import { type Request, type Response } from "express";
import { prisma } from "../..";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "1322009nick";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "775391nick";

class UserController {
    async regUser(req: Request, res: Response) {
      const { username, email, password } = req.body;
    
      try {

        const existingUser = await prisma.user.findFirst({
          where: { email }
        });
    
        if (existingUser) {
          return res.status(400).json({ error: 'Пользователь с таким email уже есть' });
        }
    

        const hashedPassword = await bcrypt.hash(password, 10);
    

        const newUser = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
          },
        });
    

        const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '24h' });
    
        res.status(201).json({
          message: 'Регистрация успешна',
          user: { id: newUser.id, username: newUser.username },
          token
        });
    
      } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера при регистрации' });
      }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const {email, password} = req.body;

            const user = await prisma.user.findUnique({
                where: { email: email }
            })
            if (!user) {
                return res.status(401).json({ error: "Wrong email or password!" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: "Wrong password!" });
            }

            const accessToken = jwt.sign({ userId: user.id}, JWT_SECRET, {expiresIn: "15m"});
            const refreshToken = jwt.sign({ userId: user.id}, JWT_REFRESH_SECRET, {expiresIn: "7d"});

            // Записываем рефрештокен  куки браузера
            res.cookie('refreshToken', refreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production', // Только по HTTPS в продакшене
              sameSite: 'strict',                           // Защита от CSRF атак
              maxAge: 7 * 24 * 60 * 60 * 1000              // 7 дней время жизни кука 
            })

            res.status(200).json({
                message: "Successfully loged-in!",
                user: { id: user.id,  username: user.username},
                accessToken
            })
        } catch (error) {
            console.log("Login Error:", error);
            res.status(500).json({ error: 'Log-in server error!' });
        }
    }

    async logoutUser(req: Request, res: Response) {
        try {
          res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });

          return res.status(200).json({ message: "Successfully logged out!" });
        } catch (error) {
          return res.status(500).json({ error: "Logout server error" });
        }
    }

}

export default new UserController();