
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('dkUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username, password, isAdmin = false) => {
    const users = JSON.parse(localStorage.getItem('dkUsers') || '[]');
    const loginEmail = `${username}@hidk.in`;
    
    if (isAdmin) {
      if (username === 'administrator' && password === 'administrator') {
        const adminUser = {
          id: 'admin-001',
          email: 'administrator@hidk.in',
          username: 'administrator',
          userType: 'admin',
          personalInfo: {
            firstName: 'System',
            lastName: 'Administrator'
          },
          permissions: { canManageEverything: true }
        };
        setUser(adminUser);
        setIsAuthenticated(true);
        localStorage.setItem('dkUser', JSON.stringify(adminUser));
        navigate('/dashboard/admin');
        toast({
          title: "Welcome Admin!",
          description: "Successfully logged in to admin panel.",
        });
        return true;
      }
      toast({
        title: "Login Failed",
        description: "Invalid admin credentials.",
        variant: "destructive"
      });
      return false;
    }

    const foundUser = users.find(u => u.email === loginEmail && u.password === password);
    
    if (foundUser) {
      const userSession = { ...foundUser };
      delete userSession.password;
      setUser(userSession);
      setIsAuthenticated(true);
      localStorage.setItem('dkUser', JSON.stringify(userSession));
      navigate(`/dashboard/${foundUser.userType}`);
      toast({
        title: "Welcome back!",
        description: `Logged in as ${foundUser.personalInfo.firstName}`,
      });
      return true;
    }
    
    toast({
      title: "Login Failed",
      description: "Invalid username or password.",
      variant: "destructive"
    });
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('dkUser');
    navigate('/');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('dkUsers') || '[]');
    const newUser = {
      ...userData,
      email: `${userData.username}@hidk.in`,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isActive: true,
      permissions: {}
    };
    users.push(newUser);
    localStorage.setItem('dkUsers', JSON.stringify(users));
    
    toast({
      title: "Registration Successful",
      description: "You can now log in with your credentials.",
    });
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
