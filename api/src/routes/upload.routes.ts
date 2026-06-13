import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { successResponse, errorResponse } from '../utils/response';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router.post('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const { image } = req.body; // Expect base64 image data url (e.g. data:image/png;base64,...)

    if (!image) {
      return res.status(400).json(errorResponse('Tidak ada file gambar yang diunggah'));
    }

    // Check if it's a valid data URL
    const matches = image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json(errorResponse('Format gambar tidak valid. Harus berupa base64 Data URL.'));
    }

    const imageType = matches[1]; // e.g. png, jpeg, webp
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // Limit size to 2MB (2 * 1024 * 1024 bytes)
    if (buffer.length > 2 * 1024 * 1024) {
      return res.status(400).json(errorResponse('Ukuran gambar maksimal 2MB'));
    }

    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filename = `img-${Date.now()}-${Math.floor(Math.random() * 1000)}.${imageType === 'jpeg' ? 'jpg' : imageType}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);

    // Return the relative url path
    const fileUrl = `/uploads/${filename}`;
    return res.status(200).json(successResponse({ url: fileUrl }, 'Gambar berhasil diunggah'));
  } catch (error) {
    console.error('[Upload Error]', error);
    return res.status(500).json(errorResponse('Terjadi kesalahan saat mengunggah gambar'));
  }
});

export default router;
