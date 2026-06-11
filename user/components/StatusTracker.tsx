import React from 'react';
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
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold ${
                idx <= currentIndex 
                  ? 'bg-blue-900 border-blue-900 text-white' 
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {idx + 1}
              </div>
              <span className={`mt-2 text-sm font-medium ${idx <= currentIndex ? 'text-blue-900' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-4 rounded ${
                idx < currentIndex ? 'bg-blue-900' : 'bg-gray-200'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
