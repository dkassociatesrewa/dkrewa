
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Lock, User } from 'lucide-react';

const AdminLogin = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials.username, credentials.password, true);
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - D K Associates</title>
        <meta name="description" content="Secure admin login portal" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-white/20"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-300">Secure access only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="adminUser" className="text-white">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="adminUser"
                  type="text"
                  placeholder="administrator"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="adminPass" className="text-white">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="adminPass"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Access Admin Panel
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-gray-300 hover:text-white transition">
              ← Back to User Login
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLogin;
