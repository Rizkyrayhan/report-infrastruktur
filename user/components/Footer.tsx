import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16 border-t-4 border-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Portal Pelaporan Infrastruktur</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Layanan publik resmi Pemerintah Republik Indonesia untuk menerima dan menindaklanjuti laporan kerusakan infrastruktur jalan dan fasilitas umum dari masyarakat.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/user" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/user/laporan/buat" className="hover:text-white transition-colors">Buat Laporan</Link></li>
              <li><Link href="/user/status" className="hover:text-white transition-colors">Cek Status Laporan</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Kontak Kami</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Gedung Kementerian Pekerjaan Umum</li>
              <li>Jl. Pattimura No. 20, Kebayoran Baru, Jakarta Selatan</li>
              <li>Email: info@pu.go.id</li>
              <li>Call Center: 1500-286</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm font-medium text-gray-500">
          &copy; {new Date().getFullYear()} Pemerintah Republik Indonesia. Hak Cipta Dilindungi Undang-Undang.
        </div>
      </div>
    </footer>
  );
}
