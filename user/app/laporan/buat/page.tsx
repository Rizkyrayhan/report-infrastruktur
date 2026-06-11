'use client';
import React from 'react';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import { Button } from '../../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../../components/ui/Card';

export default function BuatLaporan() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Buat Laporan Baru</h1>
          <p className="text-sm text-gray-600 mt-1">Sampaikan keluhan infrastruktur di wilayah Anda secara detail.</p>
        </CardHeader>
        <CardBody>
          <form className="space-y-4">
            <Input label="Judul Laporan" placeholder="Contoh: Jalan berlubang di Jl. Sudirman" />
            <TextArea label="Deskripsi Detail" placeholder="Jelaskan kondisi kerusakan secara rinci..." rows={4} />
            <Input label="Lokasi Kejadian" placeholder="Contoh: Depan pasar induk, Kota Metro" />
            <div className="pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Unggah Foto (Opsional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="text-sm text-gray-500">Klik untuk memilih foto atau seret ke sini</span>
              </div>
            </div>
            <div className="pt-6 border-t mt-6">
              <Button fullWidth type="button">Kirim Laporan</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
