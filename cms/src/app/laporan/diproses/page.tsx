'use client';

import React, { useEffect, useState } from 'react';
import { ReportTable } from '../../../components/ReportTable';
import { getReports, updateReportStatus, Report, ReportStatus } from '../../../utils/mockData';

export default function LaporanDiprosesPage() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const allReports = getReports();
    setReports(allReports.filter(r => r.status === 'PROCESSING'));
  }, []);

  const handleStatusChange = (id: string, newStatus: ReportStatus) => {
    updateReportStatus(id, newStatus);
    // Remove from current view if status is no longer PROCESSING
    if (newStatus !== 'PROCESSING') {
      setReports(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-gov-navy)]">Laporan Diproses</h2>
        <p className="text-gray-600">Daftar laporan infrastruktur yang sedang dalam tahap pengerjaan atau tindak lanjut.</p>
      </div>
      
      <ReportTable 
        reports={reports} 
        onStatusChange={handleStatusChange} 
      />
    </div>
  );
}
