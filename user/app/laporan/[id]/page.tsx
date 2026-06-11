import React from 'react';
import { Card, CardBody, CardHeader } from '../../../../components/ui/Card';
import StatusTracker from '../../../../components/StatusTracker';
import { ReportStatus } from '../../../../types/status';

export default function DetailLaporan({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Detail Laporan: {params.id}</h1>
      <Card className="mb-6">
        <CardBody>
          <h2 className="font-bold text-gray-900 text-lg mb-4">Progres Penanganan</h2>
          <StatusTracker currentStatus={ReportStatus.PROCESSING} />
        </CardBody>
      </Card>
      
      <Card>
        <CardHeader className="bg-gray-50">
          <h3 className="font-semibold text-gray-900">Informasi Laporan</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <div>
            <span className="block text-sm text-gray-500">Judul</span>
            <span className="font-medium">Lampu jalan mati di perempatan</span>
          </div>
          <div>
            <span className="block text-sm text-gray-500">Lokasi</span>
            <span className="font-medium">Perempatan Sukarame, Bandar Lampung</span>
          </div>
          <div>
            <span className="block text-sm text-gray-500">Deskripsi</span>
            <p className="text-gray-800 mt-1">Sudah dua minggu lampu lalu lintas dan penerangan jalan padam, sangat rawan kecelakaan di malam hari.</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
