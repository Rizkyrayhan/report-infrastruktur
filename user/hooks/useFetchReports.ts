import { useState, useEffect } from 'react';
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
