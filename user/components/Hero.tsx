import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="bg-blue-900 rounded-2xl overflow-hidden shadow-xl mb-12 relative">
      <div className="absolute inset-0 bg-blue-800 opacity-20 pattern-grid-lg"></div>
      <div className="px-6 py-16 md:py-24 md:px-12 relative z-10 text-center md:text-left flex flex-col md:flex-row items-center">
        <div className="md:w-2/3 md:pr-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Layanan Pengaduan <br/> Infrastruktur Publik
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-2xl">
            Sampaikan laporan kerusakan jalan, jembatan, atau fasilitas umum lainnya di wilayah Anda. Kami memastikan setiap laporan ditindaklanjuti secara transparan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/laporan/buat" className="bg-white text-blue-900 hover:bg-gray-50 px-6 py-3 rounded-md font-bold text-lg text-center transition-colors shadow-sm">
              Buat Laporan Sekarang
            </Link>
            <Link href="/status" className="bg-transparent border-2 border-blue-300 text-white hover:bg-blue-800 px-6 py-3 rounded-md font-bold text-lg text-center transition-colors">
              Cek Status Laporan
            </Link>
          </div>
        </div>
        <div className="hidden md:flex md:w-1/3 justify-center">
          {/* Placeholder for an illustration */}
          <div className="w-64 h-64 bg-blue-800 rounded-full border-4 border-blue-700 flex items-center justify-center shadow-inner">
            <svg className="w-32 h-32 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
