export enum ReportStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  RESOLVED = 'RESOLVED'
}

export const StatusLabel: Record<ReportStatus, string> = {
  [ReportStatus.PENDING]: 'Menunggu',
  [ReportStatus.PROCESSING]: 'Diproses',
  [ReportStatus.RESOLVED]: 'Selesai'
};
