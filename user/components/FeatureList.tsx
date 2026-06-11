import React from 'react';

const features = [
  {
    title: 'Tulis Laporan',
    description: 'Laporkan keluhan infrastruktur dengan detail lokasi dan foto pendukung.',
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
  },
  {
    title: 'Proses Verifikasi',
    description: 'Laporan Anda akan diverifikasi oleh dinas terkait untuk ditindaklanjuti.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Tindak Lanjut',
    description: 'Pengerjaan atau perbaikan dilakukan oleh tim di lapangan.',
    icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  {
    title: 'Selesai',
    description: 'Laporan selesai dan masyarakat dapat kembali menggunakan fasilitas dengan nyaman.',
    icon: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v1m4 4H7m6 0v1m-6-1a2 2 0 00-2 2v4a2 2 0 002 2h1m5-11v1'
  }
];

export default function FeatureList() {
  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">Bagaimana Cara Kerjanya?</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="text-center relative">
            <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
            {idx < features.length - 1 && (
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-gray-300 -z-10"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
