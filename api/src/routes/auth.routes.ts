import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { z } from 'zod';

const router = Router();

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Nama minimal 3 karakter'),
    email: z.string().email('Format email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    phone: z.string().optional()
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Format email tidak valid'),
    password: z.string().min(1, 'Password tidak boleh kosong')
  })
});

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;
