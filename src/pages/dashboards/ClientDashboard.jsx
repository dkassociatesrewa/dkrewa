
import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Briefcase, Calendar, FileText, MessageSquare, User } from 'lucide-react';
import ProfileManagement from '@/components/ProfileManagement';

const ClientDashboard = () => {
  const { profile } = useAuth();

  const renderPlaceholder = (title) => (
    <div className="glass-effect rounded-2xl p-6 text-center h-full flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">This module is under construction. 🚧</p>
    </div>
  );

  const navItems = [
    { id: 'bookings', label: 'My Bookings', icon: Briefcase, component: renderPlaceholder("My Bookings") },
    { id: 'schedule', label: 'My Schedule', icon: Calendar, component: renderPlaceholder("My Schedule") },
    { id: 'invoices', label: 'Invoices', icon: FileText, component: renderPlaceholder("My Invoices") },
    { id: 'support', label: 'Support', icon: MessageSquare, component: renderPlaceholder("Support Center") },
    { id: 'profile', label: 'Profile', icon: User, component: <ProfileManagement /> },
  ];

  return (
    <>
      <Helmet>
        <title>Client Dashboard - D K Associates</title>
        <meta name="description" content="Client service portal" />
      </Helmet>
      <DashboardLayout
        userProfile={profile}
        navItems={navItems}
        defaultTab="bookings"
      />
    </>
  );
};

export default ClientDashboard;
