'use client';

import React, { useEffect, useState } from 'react';
import { ReportTable } from '../../../components/ReportTable';
import { getReports, Report } from '../../../utils/mockData';

export default function LaporanSelesaiPage() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const allReports = getReports();
    setReports(allReports.filter(r => r.status === 'RESOLVED'));
  }, []);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-gov-navy)]">Laporan Selesai</h2>
        <p className="text-gray-600">Arsip laporan pengaduan masyarakat yang telah berhasil diselesaikan.</p>
      </div>
      
      {/* Untuk laporan selesai, kita tidak memberikan opsi ubah status lagi */}
      <ReportTable 
        reports={reports} 
      />
    </div>
  );
}
