
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (user) => {
    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } else {
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    const getSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      await fetchProfile(currentUser);
      setLoading(false);
    };

    getSessionAndProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        setLoading(true);
        await fetchProfile(currentUser);
        setLoading(false);

        if (event === 'SIGNED_IN' && currentUser) {
          const { data } = await supabase.from('profiles').select('user_type').eq('id', currentUser.id).single();
          if (data) {
            navigate(`/dashboard/${data.user_type}`);
          } else {
            navigate('/');
          }
        } else if (event === 'SIGNED_OUT') {
          navigate('/');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile, navigate]);

  const signIn = useCallback(async (username, password) => {
    const email = `${username}@hidk.in`;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign in Failed",
        description: error.message || "Something went wrong",
      });
    }

    return { error };
  }, [toast]);

  const adminSignIn = useCallback(async (username, password) => {
      if (username === 'administrator' && password === 'administrator') {
          const { data, error } = await supabase.auth.signInWithPassword({
              email: 'admin@hidk.in',
              password: 'password' // Use a strong, pre-seeded admin password
          });
          if (error) {
              toast({ variant: "destructive", title: "Admin login failed", description: "Could not log in admin user."});
          } else {
             navigate('/dashboard/admin');
          }
      } else {
           toast({ variant: "destructive", title: "Admin login failed", description: "Invalid credentials."});
      }
  }, [navigate, toast]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Sign out Failed",
        description: error.message || "Something went wrong",
      });
    }
    return { error };
  }, [toast]);
  
  const changePassword = useCallback(async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast({ variant: "destructive", title: "Password Change Failed", description: error.message });
    } else {
      toast({ title: "Success!", description: "Your password has been updated." });
    }
    return { error };
  }, [toast]);

  const value = useMemo(() => ({
    user,
    profile,
    session,
    loading,
    signIn,
    adminSignIn,
    signOut,
    changePassword,
  }), [user, profile, session, loading, signIn, adminSignIn, signOut, changePassword]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
