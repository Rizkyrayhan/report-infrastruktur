import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b-4 border-blue-900 shadow-sm sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl">
              RI
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900 tracking-tight">Portal Pelaporan Infrastruktur</span>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Pemerintah Republik Indonesia</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/user" 
              className="text-gray-700 hover:text-blue-900 font-semibold px-3 py-2 rounded-md transition-colors border-b-2 border-transparent hover:border-blue-900"
            >
              Beranda
            </Link>
            <Link 
              href="/user/laporan/buat" 
              className="text-gray-700 hover:text-blue-900 font-semibold px-3 py-2 rounded-md transition-colors border-b-2 border-transparent hover:border-blue-900"
            >
              Buat Laporan
            </Link>
            <Link 
              href="/user/status" 
              className="text-gray-700 hover:text-blue-900 font-semibold px-3 py-2 rounded-md transition-colors border-b-2 border-transparent hover:border-blue-900"
            >
              Cek Status
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-gray-700 hover:text-blue-900 focus:outline-none p-2"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
