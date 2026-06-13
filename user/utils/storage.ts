import { Report } from '../types/report';

const STORAGE_KEY = 'report_infrastruktur_data';

export const getReports = (): Report[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveReport = (report: Report): void => {
  if (typeof window === 'undefined') return;
  const reports = getReports();
  reports.push(report);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
};

export const getReportById = (id: string): Report | undefined => {
  const reports = getReports();
  return reports.find(r => r.id === id);
};
