
import React, { useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const ProfileManagement = () => {
  const { profile, changePassword } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    phone: profile?.phone || '',
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        // Admin approval would be handled by a separate process/trigger in a real app
      })
      .eq('id', profile.id);

    if (error) {
      toast({ variant: "destructive", title: "Update Failed", description: error.message });
    } else {
      toast({ title: "Profile Updated", description: "Your profile information has been updated." });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({ variant: "destructive", title: "Error", description: "Passwords do not match." });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast({ variant: "destructive", title: "Error", description: "Password must be at least 6 characters long." });
      return;
    }
    await changePassword(passwordData.newPassword);
    setPasswordData({ newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-12">
      <div className="glass-effect rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Profile</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-lg">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>First Name</Label><Input name="first_name" value={formData.first_name} onChange={handleProfileChange} /></div>
            <div><Label>Last Name</Label><Input name="last_name" value={formData.last_name} onChange={handleProfileChange} /></div>
          </div>
          <div><Label>Phone</Label><Input name="phone" value={formData.phone} onChange={handleProfileChange} /></div>
          <Button type="submit">Update Profile</Button>
          <p className="text-xs text-gray-500">Note: Profile changes may require admin approval.</p>
        </form>
      </div>

      <div className="glass-effect rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
          <div><Label>New Password</Label><Input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} /></div>
          <div><Label>Confirm New Password</Label><Input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} /></div>
          <Button type="submit">Change Password</Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileManagement;
