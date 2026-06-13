'use client';
import React, { useEffect, useState, use } from 'react';
import { Card, CardBody, CardHeader } from '../../../components/ui/Card';
import StatusTracker from '../../../components/StatusTracker';
import { ReportStatus } from '../../../types/status';
import { getReportById } from '../../../utils/storage';
import { Report } from '../../../types/report';

export default function DetailLaporan({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Handle async params in newer Next.js versions
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const id = unwrappedParams.id;
  
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedReport = getReportById(id);
    setReport(fetchedReport || null);
    setLoading(false);
  }, [id]);

  if (loading) return <div className="text-center py-12">Memuat...</div>;

  if (!report) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Laporan tidak ditemukan</h1>
        <p className="text-gray-600">ID Laporan: {id}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Detail Laporan: {id}</h1>
      <Card className="mb-6">
        <CardBody>
          <h2 className="font-bold text-gray-900 text-lg mb-4">Progres Penanganan</h2>
          <StatusTracker currentStatus={report.status as ReportStatus} />
        </CardBody>
      </Card>
      
      <Card>
        <CardHeader className="bg-gray-50">
          <h3 className="font-semibold text-gray-900">Informasi Laporan</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <div>
            <span className="block text-sm text-gray-500">Judul</span>
            <span className="font-medium">{report.title}</span>
          </div>
          <div>
            <span className="block text-sm text-gray-500">Lokasi</span>
            <span className="font-medium">{report.location}</span>
          </div>
          <div>
            <span className="block text-sm text-gray-500">Deskripsi</span>
            <p className="text-gray-800 mt-1 whitespace-pre-wrap">{report.description}</p>
          </div>
          {report.imageUrl && (
            <div>
              <span className="block text-sm text-gray-500 mb-2">Foto Laporan</span>
              <div className="border rounded-lg overflow-hidden w-full max-w-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={report.imageUrl} alt="Foto Bukti" className="w-full h-auto object-cover" />
              </div>
            </div>
          )}
          <div>
            <span className="block text-sm text-gray-500">Tanggal Dibuat</span>
            <p className="text-gray-800 mt-1">{new Date(report.createdAt).toLocaleString('id-ID')}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
