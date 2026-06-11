import React from 'react';
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
