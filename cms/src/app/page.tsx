export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-gov-navy)]">Ringkasan Dasbor</h2>
        <p className="text-gray-600">Pantau status laporan infrastruktur terkini di wilayah Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-sm border border-[var(--color-gov-border)] p-6 flex flex-col gap-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Laporan</h3>
            <span className="text-blue-500 bg-blue-100 w-10 h-10 flex items-center justify-center rounded-lg text-lg">📄</span>
          </div>
          <span className="text-3xl font-bold text-[var(--color-foreground)]">1,248</span>
          <span className="text-sm text-green-600 font-medium">+12% dari bulan lalu</span>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-sm border border-[var(--color-gov-border)] p-6 flex flex-col gap-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Menunggu</h3>
            <span className="text-[var(--color-status-wait)] bg-red-100 w-10 h-10 flex items-center justify-center rounded-lg text-lg">⏳</span>
          </div>
          <span className="text-3xl font-bold text-[var(--color-foreground)]">45</span>
          <span className="text-sm text-gray-500 font-medium">Membutuhkan verifikasi</span>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-sm border border-[var(--color-gov-border)] p-6 flex flex-col gap-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Diproses</h3>
            <span className="text-[var(--color-status-process)] bg-yellow-100 w-10 h-10 flex items-center justify-center rounded-lg text-lg">🚧</span>
          </div>
          <span className="text-3xl font-bold text-[var(--color-foreground)]">112</span>
          <span className="text-sm text-gray-500 font-medium">Sedang dalam pengerjaan</span>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl shadow-sm border border-[var(--color-gov-border)] p-6 flex flex-col gap-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Selesai</h3>
            <span className="text-[var(--color-status-done)] bg-green-100 w-10 h-10 flex items-center justify-center rounded-lg text-lg">✅</span>
          </div>
          <span className="text-3xl font-bold text-[var(--color-foreground)]">1,091</span>
          <span className="text-sm text-gray-500 font-medium">Masalah terselesaikan</span>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-xl shadow-sm border border-[var(--color-gov-border)] p-6 flex flex-col min-h-[300px]">
        <h3 className="text-lg font-bold text-[var(--color-gov-navy)] mb-4 border-b border-[var(--color-gov-border)] pb-2">Aktivitas Terbaru</h3>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-400 flex flex-col items-center gap-2">
            <span className="text-4xl">📭</span>
            <p>Belum ada aktivitas terbaru hari ini.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
