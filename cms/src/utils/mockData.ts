export type ReportStatus = 'PENDING' | 'PROCESSING' | 'RESOLVED';

export interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  status: ReportStatus;
  createdAt: string;
  imageUrl?: string;
}

// Data simulasi awal jika localStorage kosong
export const initialMockData: Report[] = [
  {
    id: 'REP-1001',
    title: 'Jalan Berlubang di Jl. Sudirman',
    description: 'Ada lubang besar di tengah jalan dekat lampu merah, sangat membahayakan pengendara motor saat malam hari.',
    location: 'Jl. Sudirman, Jakarta Pusat',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 jam yang lalu
  },
  {
    id: 'REP-1002',
    title: 'Lampu Jalan Mati',
    description: 'Sudah seminggu lampu jalan di sepanjang jalan merdeka mati total. Mohon segera diperbaiki.',
    location: 'Jl. Merdeka, Bandung',
    status: 'PROCESSING',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 hari yang lalu
  },
  {
    id: 'REP-1003',
    title: 'Jembatan Ambruk',
    description: 'Jembatan kayu penghubung desa ambruk akibat banjir semalam.',
    location: 'Desa Sukamaju, Kab. Bogor',
    status: 'RESOLVED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 hari yang lalu
  }
];

const STORAGE_KEY = 'cms_mock_reports';

export const getReports = (): Report[] => {
  if (typeof window === 'undefined') return initialMockData;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockData));
    return initialMockData;
  }
  return JSON.parse(stored);
};

export const updateReportStatus = (id: string, newStatus: ReportStatus): void => {
  if (typeof window === 'undefined') return;
  const reports = getReports();
  const updated = reports.map(r => r.id === id ? { ...r, status: newStatus } : r);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
