'use client';

import React from 'react';
import { Report } from '../utils/mockData';

interface ReportTableProps {
  reports: Report[];
  onStatusChange?: (id: string, newStatus: Report['status']) => void;
}

export function ReportTable({ reports, onStatusChange }: ReportTableProps) {
  if (reports.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow border border-gray-200 text-center text-gray-500">
        Tidak ada laporan untuk status ini.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th scope="col" className="px-6 py-3">ID Laporan</th>
              <th scope="col" className="px-6 py-3">Judul & Lokasi</th>
              <th scope="col" className="px-6 py-3">Tanggal</th>
              <th scope="col" className="px-6 py-3">Aksi Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {report.id}
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-800">{report.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{report.location}</div>
                </td>
                <td className="px-6 py-4">
                  {new Date(report.createdAt).toLocaleDateString('id-ID')}
                </td>
                <td className="px-6 py-4">
                  {onStatusChange && (
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      value={report.status}
                      onChange={(e) => onStatusChange(report.id, e.target.value as Report['status'])}
                    >
                      <option value="PENDING">Menunggu</option>
                      <option value="PROCESSING">Diproses</option>
                      <option value="RESOLVED">Selesai</option>
                    </select>
                  )}
                  {!onStatusChange && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-400">
                      Terselesaikan
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
