
import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Briefcase, FileText, Calendar, User } from 'lucide-react';
import ProfileManagement from '@/components/ProfileManagement';

const ApplicantDashboard = () => {
  const { profile } = useAuth();

  const renderPlaceholder = (title) => (
    <div className="glass-effect rounded-2xl p-6 text-center h-full flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">This module is under construction. 🚧</p>
    </div>
  );

  const navItems = [
    { id: 'applications', label: 'My Applications', icon: Briefcase, component: renderPlaceholder("My Applications") },
    { id: 'interviews', label: 'Interviews', icon: Calendar, component: renderPlaceholder("Interview Schedule") },
    { id: 'documents', label: 'My Documents', icon: FileText, component: renderPlaceholder("My Documents") },
    { id: 'profile', label: 'Profile', icon: User, component: <ProfileManagement /> },
  ];

  return (
    <>
      <Helmet>
        <title>Applicant Dashboard - D K Associates</title>
        <meta name="description" content="Job applicant tracking portal" />
      </Helmet>
      <DashboardLayout
        userProfile={profile}
        navItems={navItems}
        defaultTab="applications"
      />
    </>
  );
};

export default ApplicantDashboard;
