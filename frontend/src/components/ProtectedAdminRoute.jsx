import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { checkAdminAuth } from '@/lib/api';

const ProtectedAdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('checking'); // checking | authenticated | unauthenticated

  useEffect(() => {
    let cancelled = false;
    checkAdminAuth()
      .then(() => { if (!cancelled) setStatus('authenticated'); })
      .catch(() => { if (!cancelled) setStatus('unauthenticated'); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      navigate('/admin');
    }
  }, [status, navigate]);

  if (status !== 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return children;
};

export default ProtectedAdminRoute;