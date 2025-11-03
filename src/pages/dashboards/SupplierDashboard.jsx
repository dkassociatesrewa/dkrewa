
import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Package, ShoppingCart, FileText, TrendingUp, User } from 'lucide-react';
import ProfileManagement from '@/components/ProfileManagement';

const SupplierDashboard = () => {
  const { profile } = useAuth();

  const renderPlaceholder = (title) => (
    <div className="glass-effect rounded-2xl p-6 text-center h-full flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">This module is under construction. 🚧</p>
    </div>
  );

  const navItems = [
    { id: 'products', label: 'My Products', icon: Package, component: renderPlaceholder("Product Management") },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, component: renderPlaceholder("Order Management") },
    { id: 'invoices', label: 'Invoices', icon: FileText, component: renderPlaceholder("Invoice Management") },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, component: renderPlaceholder("Performance Analytics") },
    { id: 'profile', label: 'Profile', icon: User, component: <ProfileManagement /> },
  ];

  return (
    <>
      <Helmet>
        <title>Supplier Dashboard - D K Associates</title>
        <meta name="description" content="Supplier management portal" />
      </Helmet>
      <DashboardLayout
        userProfile={profile}
        navItems={navItems}
        defaultTab="products"
      />
    </>
  );
};

export default SupplierDashboard;
