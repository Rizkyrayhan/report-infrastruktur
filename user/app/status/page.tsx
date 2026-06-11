'use client';
import React from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';

export default function CekStatus() {
  return (
    <div className="max-w-xl mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cek Status Laporan</h1>
        <p className="text-gray-600">Masukkan ID Laporan Anda untuk memantau progres penanganan.</p>
      </div>
      <Card>
        <CardBody>
          <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input label="ID Laporan" placeholder="Contoh: REP-1234" />
            <Button type="submit">Cari Laporan</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
