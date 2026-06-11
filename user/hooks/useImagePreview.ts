import { useState } from 'react';

export function useImagePreview() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const clearImage = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  return { previewUrl, file, handleImageChange, clearImage };
}
