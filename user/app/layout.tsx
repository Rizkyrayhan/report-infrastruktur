import Header from './components/Header';

import Footer from '../components/Footer';\n\nexport default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-900 selection:text-white flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-gray-900 text-gray-300 py-6 border-t-4 border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm font-medium">
          &copy; {new Date().getFullYear()} Portal Pelaporan Infrastruktur. Pemerintah Republik Indonesia.
        </div>
      </footer>
    </div>
  );
}
