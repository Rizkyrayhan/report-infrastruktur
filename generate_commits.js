const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const filesToCreate = [
  // 1. TYPES
  {
    path: 'types/report.ts',
    content: `export interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl?: string;
  status: 'PENDING' | 'PROCESSING' | 'RESOLVED';
  createdAt: string;
}
`,
    commitMsg: 'feat(user/types): membuat tipe data Report'
  },
  {
    path: 'types/user.ts',
    content: `export interface User {
  id: string;
  name: string;
  nik: string;
  phone: string;
}
`,
    commitMsg: 'feat(user/types): membuat tipe data User'
  },
  {
    path: 'types/status.ts',
    content: `export enum ReportStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  RESOLVED = 'RESOLVED'
}

export const StatusLabel: Record<ReportStatus, string> = {
  [ReportStatus.PENDING]: 'Menunggu',
  [ReportStatus.PROCESSING]: 'Diproses',
  [ReportStatus.RESOLVED]: 'Selesai'
};
`,
    commitMsg: 'feat(user/types): membuat enum dan label untuk ReportStatus'
  },
  {
    path: 'types/api.ts',
    content: `export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
`,
    commitMsg: 'feat(user/types): membuat tipe data ApiResponse generik'
  },
  {
    path: 'types/common.ts',
    content: `export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
`,
    commitMsg: 'feat(user/types): membuat tipe data common untuk pagination'
  },

  // 2. CONSTANTS
  {
    path: 'constants/colors.ts',
    content: `export const GovernmentColors = {
  primary: '#1E3A8A', // Blue 900
  secondary: '#3B82F6', // Blue 500
  accent: '#F59E0B', // Amber 500
  background: '#F9FAFB', // Gray 50
  surface: '#FFFFFF',
  text: '#111827', // Gray 900
  textMuted: '#6B7280', // Gray 500
};
`,
    commitMsg: 'feat(user/constants): mendefinisikan standar warna Government Style'
  },
  {
    path: 'constants/routes.ts',
    content: `export const APP_ROUTES = {
  HOME: '/user',
  CREATE_REPORT: '/user/laporan/buat',
  CHECK_STATUS: '/user/status',
  REPORT_DETAIL: (id: string) => \`/user/laporan/\${id}\`
};
`,
    commitMsg: 'feat(user/constants): membuat definisi rute aplikasi'
  },
  {
    path: 'constants/endpoints.ts',
    content: `export const API_ENDPOINTS = {
  REPORTS: '/api/reports',
  REPORT_STATUS: (id: string) => \`/api/reports/\${id}/status\`,
  UPLOAD_IMAGE: '/api/upload',
};
`,
    commitMsg: 'feat(user/constants): membuat definisi endpoint API'
  },
  {
    path: 'constants/messages.ts',
    content: `export const VALIDATION_MESSAGES = {
  REQUIRED: 'Kolom ini wajib diisi',
  MIN_LENGTH: (min: number) => \`Minimal \${min} karakter\`,
  INVALID_NIK: 'NIK harus terdiri dari 16 digit angka',
};

export const SUCCESS_MESSAGES = {
  REPORT_SUBMITTED: 'Laporan berhasil dikirim! Silakan simpan ID Laporan Anda untuk mengecek status.',
};
`,
    commitMsg: 'feat(user/constants): membuat standar pesan validasi dan sukses'
  },
  {
    path: 'constants/regions.ts',
    content: `export const DUMMY_REGIONS = [
  'Bandar Lampung',
  'Metro',
  'Lampung Selatan',
  'Lampung Tengah',
  'Lampung Timur',
  'Lampung Utara',
  'Pesawaran',
  'Pringsewu'
];
`,
    commitMsg: 'feat(user/constants): menambahkan data dummy region Lampung'
  },

  // 3. COMPONENTS/UI
  {
    path: 'components/ui/Button.tsx',
    content: `import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth, 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'px-4 py-2 font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-900 text-white hover:bg-blue-800 focus:ring-blue-900',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border-2 border-blue-900 text-blue-900 hover:bg-blue-50 focus:ring-blue-900',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={\`\${baseStyles} \${variants[variant]} \${widthStyle} \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
};
`,
    commitMsg: 'feat(user/components/ui): membuat komponen Button standar'
  },
  {
    path: 'components/ui/Input.tsx',
    content: `import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id || label.replace(/\\s+/g, '-').toLowerCase();
    
    return (
      <div className="flex flex-col space-y-1 mb-4">
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={\`border \${error ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-shadow \${className}\`}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
`,
    commitMsg: 'feat(user/components/ui): membuat komponen form Input'
  },
  {
    path: 'components/ui/TextArea.tsx',
    content: `import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id || label.replace(/\\s+/g, '-').toLowerCase();
    
    return (
      <div className="flex flex-col space-y-1 mb-4">
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <textarea
          id={inputId}
          ref={ref}
          className={\`border \${error ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-shadow min-h-[100px] \${className}\`}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
TextArea.displayName = 'TextArea';
`,
    commitMsg: 'feat(user/components/ui): membuat komponen form TextArea'
  },
  {
    path: 'components/ui/Card.tsx',
    content: `import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={\`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden \${className}\`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={\`px-6 py-4 border-b border-gray-200 \${className}\`}>{children}</div>;
};

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={\`px-6 py-4 \${className}\`}>{children}</div>;
};
`,
    commitMsg: 'feat(user/components/ui): membuat komponen Card layout container'
  },
  {
    path: 'components/ui/Badge.tsx',
    content: `import React from 'react';

interface BadgeProps {
  status: 'PENDING' | 'PROCESSING' | 'RESOLVED';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  const styles = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    PROCESSING: 'bg-blue-100 text-blue-800',
    RESOLVED: 'bg-green-100 text-green-800',
  };

  return (
    <span className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium \${styles[status]}\`}>
      {children}
    </span>
  );
};
`,
    commitMsg: 'feat(user/components/ui): membuat komponen Badge status'
  },

  // 4. COMPONENTS
  {
    path: 'components/Hero.tsx',
    content: `import React from 'react';
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
            <Link href="/user/laporan/buat" className="bg-white text-blue-900 hover:bg-gray-50 px-6 py-3 rounded-md font-bold text-lg text-center transition-colors shadow-sm">
              Buat Laporan Sekarang
            </Link>
            <Link href="/user/status" className="bg-transparent border-2 border-blue-300 text-white hover:bg-blue-800 px-6 py-3 rounded-md font-bold text-lg text-center transition-colors">
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
`,
    commitMsg: 'feat(user/components): membuat komponen Hero beranda'
  },
  {
    path: 'components/FeatureList.tsx',
    content: `import React from 'react';

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
`,
    commitMsg: 'feat(user/components): membuat komponen FeatureList alur kerja'
  },
  {
    path: 'components/ReportCard.tsx',
    content: `import React from 'react';
import { Card, CardBody } from './ui/Card';
import { Badge } from './ui/Badge';
import { Report } from '../types/report';

export default function ReportCard({ report }: { report: Report }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardBody>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 truncate pr-4">{report.title}</h3>
          <Badge status={report.status}>
            {report.status === 'PENDING' ? 'Menunggu' : report.status === 'PROCESSING' ? 'Diproses' : 'Selesai'}
          </Badge>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{report.description}</p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {report.location}
          </span>
          <span>{new Date(report.createdAt).toLocaleDateString('id-ID')}</span>
        </div>
      </CardBody>
    </Card>
  );
}
`,
    commitMsg: 'feat(user/components): membuat komponen ReportCard'
  },
  {
    path: 'components/StatusTracker.tsx',
    content: `import React from 'react';
import { ReportStatus } from '../types/status';

export default function StatusTracker({ currentStatus }: { currentStatus: ReportStatus }) {
  const steps = [
    { key: ReportStatus.PENDING, label: 'Laporan Diterima' },
    { key: ReportStatus.PROCESSING, label: 'Sedang Diproses' },
    { key: ReportStatus.RESOLVED, label: 'Selesai' }
  ];

  const getCurrentIndex = () => steps.findIndex(s => s.key === currentStatus);
  const currentIndex = getCurrentIndex();

  return (
    <div className="py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center relative z-10">
              <div className={\`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold \${
                idx <= currentIndex 
                  ? 'bg-blue-900 border-blue-900 text-white' 
                  : 'bg-white border-gray-300 text-gray-400'
              }\`}>
                {idx + 1}
              </div>
              <span className={\`mt-2 text-sm font-medium \${idx <= currentIndex ? 'text-blue-900' : 'text-gray-500'}\`}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={\`flex-1 h-1 mx-4 rounded \${
                idx < currentIndex ? 'bg-blue-900' : 'bg-gray-200'
              }\`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
`,
    commitMsg: 'feat(user/components): membuat komponen StatusTracker timeline'
  },
  {
    path: 'components/Footer.tsx',
    content: `import React from 'react';
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
`,
    commitMsg: 'feat(user/components): membuat komponen Footer detail'
  },

  // 5. HOOKS
  {
    path: 'hooks/useFormValidation.ts',
    content: `import { useState } from 'react';

export function useFormValidation<T extends Record<string, any>>(initialState: T) {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const setError = (name: keyof T, message: string) => {
    setErrors(prev => ({ ...prev, [name]: message }));
  };

  return { values, errors, handleChange, setError, setValues };
}
`,
    commitMsg: 'feat(user/hooks): membuat custom hook useFormValidation'
  },
  {
    path: 'hooks/useImagePreview.ts',
    content: `import { useState } from 'react';

export function useImagePreview() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const clearImage = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  return { previewUrl, file, handleImageChange, clearImage };
}
`,
    commitMsg: 'feat(user/hooks): membuat custom hook useImagePreview'
  },
  {
    path: 'hooks/useLocation.ts',
    content: `import { useState } from 'react';

export function useLocation() {
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setError('Geolocation tidak didukung oleh browser Anda');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  };

  return { coordinates, loading, error, requestLocation };
}
`,
    commitMsg: 'feat(user/hooks): membuat custom hook useLocation'
  },
  {
    path: 'hooks/useFetchReports.ts',
    content: `import { useState, useEffect } from 'react';
import { Report } from '../types/report';

export function useFetchReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi fetch API
    const timer = setTimeout(() => {
      setReports([
        {
          id: 'REP-001',
          title: 'Jalan berlubang di Jalan Raya Tejoagung',
          description: 'Terdapat lubang besar yang membahayakan pengendara motor di malam hari.',
          location: 'Tejoagung, Metro Timur',
          status: 'PENDING',
          createdAt: new Date().toISOString()
        },
        {
          id: 'REP-002',
          title: 'Lampu jalan mati di Pringsewu',
          description: 'Lampu penerangan jalan umum sudah seminggu padam.',
          location: 'Pringsewu Barat',
          status: 'PROCESSING',
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return { reports, loading };
}
`,
    commitMsg: 'feat(user/hooks): membuat custom hook useFetchReports dengan dummy data'
  },
  {
    path: 'hooks/useSubmitReport.ts',
    content: `import { useState } from 'react';

export function useSubmitReport() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const submit = async (data: any) => {
    setIsSubmitting(true);
    // Simulasi API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    const fakeId = 'REP-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    setSuccessId(fakeId);
    setIsSubmitting(false);
    return fakeId;
  };

  return { submit, isSubmitting, successId };
}
`,
    commitMsg: 'feat(user/hooks): membuat custom hook useSubmitReport'
  },

  // 6. PAGES & CSS
  {
    path: 'app/globals.css',
    content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #1E3A8A;
}

body {
  background-color: #f9fafb;
}

.pattern-grid-lg {
  background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}
`,
    commitMsg: 'feat(user/app): menambahkan globals.css dengan utility styles'
  },
  {
    path: 'app/page.tsx',
    content: `import React from 'react';
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
`,
    commitMsg: 'feat(user/app): membuat halaman Beranda (Landing Page)'
  },
  {
    path: 'app/laporan/buat/page.tsx',
    content: `'use client';
import React from 'react';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import { Button } from '../../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../../components/ui/Card';

export default function BuatLaporan() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Buat Laporan Baru</h1>
          <p className="text-sm text-gray-600 mt-1">Sampaikan keluhan infrastruktur di wilayah Anda secara detail.</p>
        </CardHeader>
        <CardBody>
          <form className="space-y-4">
            <Input label="Judul Laporan" placeholder="Contoh: Jalan berlubang di Jl. Sudirman" />
            <TextArea label="Deskripsi Detail" placeholder="Jelaskan kondisi kerusakan secara rinci..." rows={4} />
            <Input label="Lokasi Kejadian" placeholder="Contoh: Depan pasar induk, Kota Metro" />
            <div className="pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Unggah Foto (Opsional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="text-sm text-gray-500">Klik untuk memilih foto atau seret ke sini</span>
              </div>
            </div>
            <div className="pt-6 border-t mt-6">
              <Button fullWidth type="button">Kirim Laporan</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
`,
    commitMsg: 'feat(user/app): membuat halaman form Buat Laporan'
  },
  {
    path: 'app/status/page.tsx',
    content: `'use client';
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
`,
    commitMsg: 'feat(user/app): membuat halaman pencarian Status Laporan'
  },
  {
    path: 'app/laporan/[id]/page.tsx',
    content: `import React from 'react';
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
`,
    commitMsg: 'feat(user/app): membuat halaman Detail Laporan'
  }
];

const basePath = path.join(__dirname, 'user');

// First replace Footer in layout.tsx if not done properly
try {
  const layoutPath = path.join(basePath, 'app', 'layout.tsx');
  if (fs.existsSync(layoutPath)) {
    let content = fs.readFileSync(layoutPath, 'utf8');
    if (!content.includes("import Footer")) {
      content = content.replace(
        "export default function UserLayout", 
        "import Footer from '../components/Footer';\\n\\nexport default function UserLayout"
      );
      content = content.replace(
        new RegExp("<footer[\\\\s\\\\S]*?<\\\\/footer>"), 
        "<Footer />"
      );
      fs.writeFileSync(layoutPath, content);
      execSync('git add user/app/layout.tsx', { stdio: 'ignore' });
      execSync('git commit -m "refactor(user/layout): memisahkan footer ke komponen terpisah"', { stdio: 'ignore' });
    }
  }
} catch (e) {
  console.log("Skipping layout refactor");
}

filesToCreate.forEach((file, index) => {
  const fullPath = path.join(basePath, file.path);
  const dir = path.dirname(fullPath);
  
  // Create directories if they don't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write the file
  fs.writeFileSync(fullPath, file.content, 'utf8');
  console.log(`[${index + 1}/30] Created ${file.path}`);

  // Commit the file
  try {
    // Stage the specific file
    execSync(`git add "${path.join('user', file.path).replace(/\\\\/g, '/')}"`);
    // Commit
    execSync(`git commit -m "${file.commitMsg}"`);
    console.log(`Committed: ${file.commitMsg}`);
  } catch (error) {
    console.error(`Failed to commit ${file.path}: `, error.message);
  }
});

console.log("Successfully created 30 commits!");
