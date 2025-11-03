
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { LogOut, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const DashboardLayout = ({ userProfile, navItems, defaultTab }) => {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const activeComponent = navItems.find(item => item.id === activeTab)?.component;

  const sidebarVariants = {
    open: { width: '280px', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { width: '80px', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  const navTextVariants = {
    open: { opacity: 1, x: 0, display: 'inline-block' },
    closed: { opacity: 0, x: -10, transitionEnd: { display: 'none' } },
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <motion.div
        variants={sidebarVariants}
        animate={isSidebarOpen ? 'open' : 'closed'}
        className="flex-shrink-0 bg-white/80 backdrop-blur-xl border-r flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b h-20">
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center space-x-2 overflow-hidden"
              >
                <User className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-md font-bold whitespace-nowrap">{userProfile?.first_name} {userProfile?.last_name}</h1>
                  <p className="text-xs text-gray-500 capitalize whitespace-nowrap">{userProfile?.user_type} Dashboard</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {navItems.map(item => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-5 w-5 mr-4" />
              <motion.span variants={navTextVariants}>{item.label}</motion.span>
            </Button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start" onClick={signOut}>
            <LogOut className="h-5 w-5 mr-4" />
            <motion.span variants={navTextVariants}>Logout</motion.span>
          </Button>
        </div>
      </motion.div>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/80 backdrop-blur-xl border-b p-4 flex items-center justify-between h-20">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <Link to="/">
            <h1 className="text-xl font-bold gradient-text">D K Associates</h1>
          </Link>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          {activeComponent || <p>Select an option from the menu.</p>}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
