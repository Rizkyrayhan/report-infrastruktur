import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { successResponse, errorResponse } from '../utils/response';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(successResponse(categories, 'Berhasil mengambil daftar kategori'));
  } catch (error) {
    console.error('[Get Categories Error]', error);
    return res.status(500).json(errorResponse('Terjadi kesalahan pada server'));
  }
};
