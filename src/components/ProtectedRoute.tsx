import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const localToken = localStorage.getItem(
      Object.keys(localStorage).find((key) => key.includes('auth-token')) || ''
    );

    console.log('Session:', session);
    console.log('Local Token:', localToken);

    // Hanya autentikasi jika ada session DAN token tersimpan di localStorage
    if (session && localToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  checkSession();

  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    setIsAuthenticated(!!session);
  });

  return () => {
    listener?.subscription.unsubscribe();
  };
}, []);


  if (isAuthenticated === null) {
    return <div className="p-6">Checking auth...</div>; // show loading state
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
