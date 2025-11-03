
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Sparkles, User, Lock } from 'lucide-react';

const LoginPage = () => {
  const { signIn, loading } = useAuth();
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    signIn(loginData.username, loginData.password);
  };

  return (
    <>
      <Helmet>
        <title>Login - D K Associates</title>
        <meta name="description" content="Login to your D K Associates account" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 opacity-50"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-3xl p-8 w-full max-w-md relative z-10"
        >
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
              <Sparkles className="h-10 w-10 text-blue-600" />
              <span className="text-3xl font-bold gradient-text">D K Associates</span>
            </Link>
            <p className="text-gray-600">Welcome back! Please login to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="your.username"
                  className="pl-10"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/sa_admin_dk" className="text-sm text-gray-500 hover:text-blue-600 transition">
              Admin Login
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;
