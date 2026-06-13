'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import { Button } from '../../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../../components/ui/Card';
import { saveReport } from '../../../utils/storage';

export default function BuatLaporan() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran foto maksimal 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location) return alert('Harap isi semua bidang');
    
    const newReport = {
      id: `REP-${Math.floor(Math.random() * 10000)}`,
      title,
      description,
      location,
      imageUrl: imageUrl || undefined,
      status: 'PENDING' as const,
      createdAt: new Date().toISOString()
    };
    
    saveReport(newReport);
    alert(`Laporan berhasil dibuat! ID Laporan Anda adalah: ${newReport.id}`);
    router.push(`/laporan/${newReport.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Buat Laporan Baru</h1>
          <p className="text-sm text-gray-600 mt-1">Sampaikan keluhan infrastruktur di wilayah Anda secara detail.</p>
        </CardHeader>
        <CardBody>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input 
              label="Judul Laporan" 
              placeholder="Contoh: Jalan berlubang di Jl. Sudirman" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea 
              label="Deskripsi Detail" 
              placeholder="Jelaskan kondisi kerusakan secara rinci..." 
              rows={4} 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input 
              label="Lokasi Kejadian" 
              placeholder="Contoh: Depan pasar induk, Kota Metro" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <div className="pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Unggah Foto (Opsional)</label>
              {imageUrl ? (
                <div className="relative w-full h-48 border rounded-lg overflow-hidden mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setImageUrl(null)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full text-xs font-bold w-6 h-6 flex items-center justify-center hover:bg-red-700"
                  >
                    X
                  </button>
                </div>
              ) : (
                <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <span className="text-sm text-gray-500">Klik untuk memilih foto (Maks 2MB)</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
            <div className="pt-6 border-t mt-6">
              <Button fullWidth type="submit">Kirim Laporan</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
