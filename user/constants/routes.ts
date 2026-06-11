export const APP_ROUTES = {
  HOME: '/user',
  CREATE_REPORT: '/user/laporan/buat',
  CHECK_STATUS: '/user/status',
  REPORT_DETAIL: (id: string) => `/user/laporan/${id}`
};
