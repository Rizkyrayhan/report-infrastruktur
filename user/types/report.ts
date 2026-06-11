export interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl?: string;
  status: 'PENDING' | 'PROCESSING' | 'RESOLVED';
  createdAt: string;
}
