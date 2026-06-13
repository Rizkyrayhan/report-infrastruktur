import { Router } from 'express';
import { getReports, getReportById, createReport, updateReportStatus } from '../controllers/report.controller';
import { verifyToken, verifyAdmin } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { z } from 'zod';

const router = Router();

const createReportSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Judul minimal 5 karakter'),
    description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
    address: z.string().min(5, 'Alamat minimal 5 karakter'),
    latitude: z.number().optional().nullable(),
    longitude: z.number().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    categoryId: z.string().min(1, 'Kategori tidak boleh kosong'),
  }),
});

const updateStatusSchema = z.object({
  body: z.object({
    status: z.enum(['PENDING', 'PROCESSED', 'COMPLETED', 'REJECTED'], {
      message: 'Status harus salah satu dari: PENDING, PROCESSED, COMPLETED, REJECTED',
    }),
  }),
});

// Endpoint publik: Siapa pun bisa melihat daftar laporan dan detailnya
router.get('/', getReports);
router.get('/:id', getReportById);

// Endpoint privat: Warga terautentikasi dapat membuat laporan
router.post('/', verifyToken, validate(createReportSchema), createReport);

// Endpoint privat (Admin): Mengubah status laporan
router.put('/:id/status', verifyToken, verifyAdmin, validate(updateStatusSchema), updateReportStatus);

export default router;
