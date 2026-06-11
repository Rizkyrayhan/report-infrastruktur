export function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-[var(--color-gov-border)] flex items-center justify-between px-8 shadow-sm sticky top-0 z-10">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-[var(--color-gov-navy)]">Sistem Informasi Pengelolaan Laporan</h1>
        <span className="text-sm text-gray-500">Pusat Data Infrastruktur Daerah</span>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-600 hover:bg-[var(--color-gov-light)] rounded-full transition-colors">
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-status-wait)] rounded-full"></span>
          <span className="text-xl">🔔</span>
        </button>
        <div className="h-10 w-px bg-[var(--color-gov-border)] mx-2"></div>
        <div className="flex items-center gap-3 cursor-pointer hover:bg-[var(--color-gov-light)] p-2 rounded-lg transition-colors">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-[var(--color-foreground)]">Admin Utama</span>
            <span className="text-xs text-gray-500">Superadmin Instansi</span>
          </div>
          <div className="w-10 h-10 bg-[var(--color-gov-navy)] text-white rounded-full flex items-center justify-center font-bold">
            AU
          </div>
        </div>
      </div>
    </header>
  );
}
