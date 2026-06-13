'use client';
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import FeatureList from '../components/FeatureList';
import ReportCard from '../components/ReportCard';
import { Report } from '../types/report';
import { getReports } from '../utils/storage';

export default function Home() {
  const [recentReports, setRecentReports] = useState<Report[]>([]);

  useEffect(() => {
    const allReports = getReports();
    // Ambil 4 laporan terbaru (berdasarkan urutan input terakhir)
    setRecentReports(allReports.slice(-4).reverse());
  }, []);

  return (
    <div>
      <Hero />
      <FeatureList />
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Laporan Terbaru dari Masyarakat</h2>
        {recentReports.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            Belum ada laporan terbaru. Jadilah yang pertama melaporkan!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentReports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
