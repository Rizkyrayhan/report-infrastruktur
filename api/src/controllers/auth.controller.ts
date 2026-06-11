import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';
import { successResponse, errorResponse } from '../utils/response';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-development';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json(errorResponse('Email atau password salah'));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json(errorResponse('Email atau password salah'));
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json(successResponse({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, 'Login berhasil'));
  } catch (error) {
    console.error('[Login Error]', error);
    return res.status(500).json(errorResponse('Terjadi kesalahan pada server'));
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json(errorResponse('Email sudah terdaftar'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone
      }
    });

    return res.status(201).json(successResponse({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }, 'Registrasi berhasil'));
  } catch (error) {
    console.error('[Register Error]', error);
    return res.status(500).json(errorResponse('Terjadi kesalahan pada server'));
  }
};
