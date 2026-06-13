import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import prisma from '../utils/prisma';
import { successResponse, errorResponse } from '../utils/response';
import { ReportStatus } from '@prisma/client';

export const getReports = async (req: AuthRequest, res: Response) => {
  try {
    const { userId, status, categoryId } = req.query;

    const whereClause: any = {};
    if (userId) whereClause.userId = String(userId);
    if (status) whereClause.status = status as ReportStatus;
    if (categoryId) whereClause.categoryId = String(categoryId);

    const reports = await prisma.report.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json(successResponse(reports, 'Berhasil mengambil daftar laporan'));
  } catch (error) {
    console.error('[Get Reports Error]', error);
    return res.status(500).json(errorResponse('Terjadi kesalahan pada server'));
  }
};

export const getReportById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!report) {
      return res.status(404).json(errorResponse('Laporan tidak ditemukan'));
    }

    return res.status(200).json(successResponse(report, 'Berhasil mengambil detail laporan'));
  } catch (error) {
    console.error('[Get Report By ID Error]', error);
    return res.status(500).json(errorResponse('Terjadi kesalahan pada server'));
  }
};

export const createReport = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, address, latitude, longitude, imageUrl, categoryId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json(errorResponse('Unauthorized: User tidak teridentifikasi'));
    }

    // Validasi Kategori
    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      return res.status(400).json(errorResponse('Kategori tidak valid atau tidak ditemukan'));
    }

    const newReport = await prisma.report.create({
      data: {
        title,
        description,
        address,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        imageUrl,
        userId,
        categoryId,
      },
      include: {
        category: {
          select: { name: true },
        },
      },
    });

    return res.status(201).json(successResponse(newReport, 'Laporan berhasil dibuat'));
  } catch (error) {
    console.error('[Create Report Error]', error);
    return res.status(500).json(errorResponse('Terjadi kesalahan pada server'));
  }
};

export const updateReportStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Pastikan status ada dalam enum ReportStatus
    const validStatuses = Object.values(ReportStatus);
    if (!validStatuses.includes(status as ReportStatus)) {
      return res.status(400).json(errorResponse(`Status tidak valid. Harus salah satu dari: ${validStatuses.join(', ')}`));
    }

    const existingReport = await prisma.report.findUnique({ where: { id } });
    if (!existingReport) {
      return res.status(404).json(errorResponse('Laporan tidak ditemukan'));
    }

    const updatedReport = await prisma.report.update({
      where: { id },
      data: { status: status as ReportStatus },
    });

    return res.status(200).json(successResponse(updatedReport, 'Status laporan berhasil diperbarui'));
  } catch (error) {
    console.error('[Update Report Status Error]', error);
    return res.status(500).json(errorResponse('Terjadi kesalahan pada server'));
  }
};
