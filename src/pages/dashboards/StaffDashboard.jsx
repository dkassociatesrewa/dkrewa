
import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Briefcase, Users, FileText, Calendar, User } from 'lucide-react';
import ProfileManagement from '@/components/ProfileManagement';

const StaffDashboard = () => {
  const { profile } = useAuth();

  const renderPlaceholder = (title) => (
    <div className="glass-effect rounded-2xl p-6 text-center h-full flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">This module is under construction. 🚧</p>
    </div>
  );

  // Filter navItems based on staff permissions from profile
  const navItems = [
    { id: 'cases', label: 'Manage Cases', icon: Briefcase, component: renderPlaceholder("Case Management") },
    { id: 'workers', label: 'Assign Workers', icon: Users, component: renderPlaceholder("Worker Assignment") },
    { id: 'quotes', label: 'Create Quote', icon: FileText, component: renderPlaceholder("Quote Creation") },
    { id: 'schedule', label: 'Schedule', icon: Calendar, component: renderPlaceholder("Scheduling") },
    { id: 'profile', label: 'Profile', icon: User, component: <ProfileManagement /> },
  ];

  return (
    <>
      <Helmet>
        <title>Staff Dashboard - D K Associates</title>
        <meta name="description" content="Staff operations dashboard" />
      </Helmet>
      <DashboardLayout
        userProfile={profile}
        navItems={navItems}
        defaultTab="cases"
      />
    </>
  );
};

export default StaffDashboard;
