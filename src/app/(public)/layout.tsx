import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import '@/styles/globals.css';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <Suspense fallback={<nav style={{ height: 72 }} />}>
          <Navbar />
        </Suspense>
        <main style={{ minHeight: '100vh' }}>
          <Suspense fallback={<div style={{ padding: '60px 20px', textAlign: 'center' }}>Loading...</div>}>
            {children}
          </Suspense>
        </main>
        <Footer />
        <FloatingWidgets />
      </ToastProvider>
    </AuthProvider>
  );
}

