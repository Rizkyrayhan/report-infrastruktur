import React from 'react';
import Hero from '../components/Hero';
import FeatureList from '../components/FeatureList';
import ReportCard from '../components/ReportCard';
import { Report } from '../types/report';

// Dummy data for home page preview
const recentReports: Report[] = [
  {
    id: '1', title: 'Jalan Ambles di Natar', description: 'Sebagian bahu jalan ambles setelah hujan deras.', location: 'Natar, Lampung Selatan', status: 'PROCESSING', createdAt: new Date().toISOString()
  },
  {
    id: '2', title: 'Fasilitas Halte Rusak', description: 'Atap halte bocor dan tempat duduk patah.', location: 'Tanjung Karang Pusat', status: 'PENDING', createdAt: new Date().toISOString()
  }
];

export default function Home() {
  return (
    <div>
      <Hero />
      <FeatureList />
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Laporan Terbaru dari Masyarakat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentReports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
}
