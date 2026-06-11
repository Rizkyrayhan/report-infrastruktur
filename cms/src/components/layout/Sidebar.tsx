import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[var(--color-gov-navy)] text-white flex flex-col shadow-lg fixed left-0 top-0">
      <div className="p-6 font-bold text-2xl border-b border-blue-800 flex items-center gap-3">
        <div className="bg-white text-[var(--color-gov-navy)] rounded-full w-8 h-8 flex items-center justify-center text-sm">
          🏛️
        </div>
        Admin Panel
      </div>
      <nav className="flex-col flex flex-1 p-4 gap-2">
        <Link href="/" className="px-4 py-3 rounded-md hover:bg-[var(--color-gov-navy-hover)] transition-colors font-medium">
          Overview
        </Link>
        <Link href="/laporan/masuk" className="px-4 py-3 rounded-md hover:bg-[var(--color-gov-navy-hover)] transition-colors font-medium flex items-center justify-between">
          <span>Laporan Masuk</span>
          <span className="bg-[var(--color-status-wait)] text-xs px-2 py-1 rounded-full text-white font-bold">Baru</span>
        </Link>
        <Link href="/laporan/diproses" className="px-4 py-3 rounded-md hover:bg-[var(--color-gov-navy-hover)] transition-colors font-medium flex items-center justify-between">
          <span>Laporan Diproses</span>
          <span className="bg-[var(--color-status-process)] text-xs px-2 py-1 rounded-full text-black font-bold">3</span>
        </Link>
        <Link href="/laporan/selesai" className="px-4 py-3 rounded-md hover:bg-[var(--color-gov-navy-hover)] transition-colors font-medium">
          Selesai
        </Link>
      </nav>
      <div className="p-4 border-t border-blue-800 text-sm text-blue-300">
        &copy; 2026 Gov Infra Report
      </div>
    </aside>
  );
}
