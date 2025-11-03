
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/SupabaseAuthContext';
import { DataProvider } from '@/contexts/DataContext';

import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import AdminLogin from '@/pages/AdminLogin';
import ServicesPage from '@/pages/ServicesPage';
import HiringPage from '@/pages/HiringPage';

import AdminDashboard from '@/pages/dashboards/AdminDashboard';
import StaffDashboard from '@/pages/dashboards/StaffDashboard';
import WorkerDashboard from '@/pages/dashboards/WorkerDashboard';
import ClientDashboard from '@/pages/dashboards/ClientDashboard';
import SupplierDashboard from '@/pages/dashboards/SupplierDashboard';
import ApplicantDashboard from '@/pages/dashboards/ApplicantDashboard';
import { Spinner } from '@/components/ui/spinner';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, profile } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userType = profile?.user_type;
  
  if (allowedRoles && !allowedRoles.includes(userType)) {
    return <Navigate to={`/dashboard/${userType}`} replace />;
  }
  
  return children;
};

function AppRoutes() {
  const { user, loading, profile } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }
  
  const getRedirectPath = () => {
    if (!user || !profile) return "/login";
    return `/dashboard/${profile.user_type}`;
  };

  return (
    <>
      <Helmet>
        <title>D K Associates - Workforce for Everyday Help</title>
        <meta name="description" content="Complete workforce management solution for everyday help services including cleaning, repairs, teaching, and more." />
      </Helmet>
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to={getRedirectPath()} /> : <LoginPage />} />
        <Route path="/sa_admin_dk" element={<AdminLogin />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/hiring" element={<HiringPage />} />
        
        <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/staff" element={<ProtectedRoute allowedRoles={['staff']}><StaffDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/worker" element={<ProtectedRoute allowedRoles={['worker']}><WorkerDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/client" element={<ProtectedRoute allowedRoles={['client']}><ClientDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/supplier" element={<ProtectedRoute allowedRoles={['supplier']}><SupplierDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/applicant" element={<ProtectedRoute allowedRoles={['applicant']}><ApplicantDashboard /></ProtectedRoute>} />
        
        <Route path="/dashboard/*" element={<Navigate to={getRedirectPath()} />} />
      </Routes>
      <Toaster />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
