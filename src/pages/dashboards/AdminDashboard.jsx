
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Users, Briefcase, Settings, BarChart3,
  MessageSquare, CalendarCheck, FileText, Truck, Wallet, PieChart, UserCheck, Image, User
} from 'lucide-react';

// Import Module Components
import UserManagement from '@/components/admin/UserManagement';
import ServiceManagement from '@/components/admin/ServiceManagement';
import CaseManagement from '@/components/admin/CaseManagement';
import ChatModule from '@/components/admin/ChatModule';
import FinanceModule from '@/components/admin/FinanceModule';
import ApplicantManagement from '@/components/admin/ApplicantManagement';
import CarouselManagement from '@/components/admin/CarouselManagement';
import ProfileManagement from '@/components/ProfileManagement';

const AdminDashboard = () => {
  const { profile } = useAuth();

  const navItems = [
    { id: 'users', label: 'Users', icon: Users, component: <UserManagement /> },
    { id: 'carousel', label: 'Carousel', icon: Image, component: <CarouselManagement /> },
    { id: 'applicants', label: 'Hiring', icon: UserCheck, component: <ApplicantManagement /> },
    { id: 'services', label: 'Services', icon: Settings, component: <ServiceManagement /> },
    { id: 'cases', label: 'Cases', icon: Briefcase, component: <CaseManagement /> },
    { id: 'chat', label: 'Chat', icon: MessageSquare, component: <ChatModule /> },
    { id: 'finance', label: 'Finance', icon: PieChart, component: <FinanceModule /> },
    { id: 'profile', label: 'Profile', icon: User, component: <ProfileManagement /> },
    // Add other modules here as they are built
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - D K Associates</title>
        <meta name="description" content="Admin control panel for D K Associates" />
      </Helmet>
      <DashboardLayout
        userProfile={profile}
        navItems={navItems}
        defaultTab="users"
      />
    </>
  );
};

export default AdminDashboard;
