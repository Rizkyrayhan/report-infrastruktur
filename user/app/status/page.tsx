'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';

export default function CekStatus() {
  const router = useRouter();
  const [reportId, setReportId] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportId.trim()) return alert('Masukkan ID Laporan terlebih dahulu');
    
    router.push(`/laporan/${reportId.trim()}`);
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cek Status Laporan</h1>
        <p className="text-gray-600">Masukkan ID Laporan Anda untuk memantau progres penanganan.</p>
      </div>
      <Card>
        <CardBody>
          <form className="flex flex-col space-y-4" onSubmit={handleSearch}>
            <Input 
              label="ID Laporan" 
              placeholder="Contoh: REP-1234" 
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
            />
            <Button type="submit">Cari Laporan</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
