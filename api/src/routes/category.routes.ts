import { Router } from 'express';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller';
import { verifyToken, verifyAdmin } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { z } from 'zod';

const router = Router();

const categorySchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Nama kategori minimal 3 karakter'),
    description: z.string().optional()
  })
});

// Endpoint publik: Warga bisa melihat daftar kategori
router.get('/', getCategories);

// Endpoint private (Admin CMS): CRUD kategori
router.post('/', verifyToken, verifyAdmin, validate(categorySchema), createCategory);
router.put('/:id', verifyToken, verifyAdmin, validate(categorySchema), updateCategory);
router.delete('/:id', verifyToken, verifyAdmin, deleteCategory);

export default router;
