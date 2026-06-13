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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location) return alert('Harap isi semua bidang');
    
    const newReport = {
      id: `REP-${Math.floor(Math.random() * 10000)}`,
      title,
      description,
      location,
      status: 'PENDING' as const,
      createdAt: new Date().toISOString()
    };
    
    saveReport(newReport);
    alert(`Laporan berhasil dibuat! ID Laporan: ${newReport.id}`);
    router.push('/status');
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="text-sm text-gray-500">Klik untuk memilih foto atau seret ke sini</span>
              </div>
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
