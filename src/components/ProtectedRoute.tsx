// src/components/ProtectedRoute.tsx
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setAuthenticated(!!data.session);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return <p className="p-6">Checking auth...</p>;
  return authenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
