
import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Briefcase, Calendar, DollarSign, Star, User } from 'lucide-react';
import ProfileManagement from '@/components/ProfileManagement';

const WorkerDashboard = () => {
  const { profile } = useAuth();

  const renderPlaceholder = (title) => (
    <div className="glass-effect rounded-2xl p-6 text-center h-full flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">This module is under construction. 🚧</p>
    </div>
  );

  const navItems = [
    { id: 'assignments', label: 'Assignments', icon: Briefcase, component: renderPlaceholder("My Assignments") },
    { id: 'schedule', label: 'My Schedule', icon: Calendar, component: renderPlaceholder("My Schedule") },
    { id: 'payments', label: 'Payments', icon: DollarSign, component: renderPlaceholder("Payment History") },
    { id: 'performance', label: 'Performance', icon: Star, component: renderPlaceholder("My Performance") },
    { id: 'profile', label: 'Profile', icon: User, component: <ProfileManagement /> },
  ];

  return (
    <>
      <Helmet>
        <title>Worker Dashboard - D K Associates</title>
        <meta name="description" content="Worker self-service portal" />
      </Helmet>
      <DashboardLayout
        userProfile={profile}
        navItems={navItems}
        defaultTab="assignments"
      />
    </>
  );
};

export default WorkerDashboard;
