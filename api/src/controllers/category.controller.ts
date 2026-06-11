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

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    
    const existingCategory = await prisma.category.findUnique({ where: { name } });
    if (existingCategory) {
      return res.status(400).json(errorResponse('Kategori sudah ada'));
    }

    const category = await prisma.category.create({
      data: { name, description }
    });

    return res.status(201).json(successResponse(category, 'Kategori berhasil ditambahkan'));
  } catch (error) {
    console.error('[Create Category Error]', error);
    return res.status(500).json(errorResponse('Terjadi kesalahan pada server'));
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    const category = await prisma.category.update({
      where: { id },
      data: { name, description }
    });
    return res.status(200).json(successResponse(category, 'Kategori berhasil diubah'));
  } catch (error) {
    return res.status(500).json(errorResponse('Kategori tidak ditemukan atau terjadi kesalahan server'));
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id } });
    return res.status(200).json(successResponse(null, 'Kategori berhasil dihapus'));
  } catch (error) {
    return res.status(500).json(errorResponse('Kategori tidak ditemukan atau gagal dihapus'));
  }
};
