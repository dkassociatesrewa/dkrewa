
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { UserPlus, Trash2, Edit } from 'lucide-react';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Spinner } from '@/components/ui/spinner';

const permissionsList = [
  { id: 'canManageWorkers', label: 'Manage Workers' },
  { id: 'canManageClients', label: 'Manage Clients' },
  { id: 'canManageSuppliers', label: 'Manage Suppliers' },
  { id: 'canApproveTransfers', label: 'Approve Transfers' },
  { id: 'canAccessFinance', label: 'Access Finance' },
  { id: 'canManageCarousel', label: 'Manage Carousel' },
];

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) {
      toast({ variant: 'destructive', title: 'Error fetching users', description: error.message });
    } else {
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpen = (user = null) => {
    if (user) {
      setIsEditing(true);
      setCurrentUser({
        ...user,
        permissions: user.permissions || {}
      });
    } else {
      setIsEditing(false);
      setCurrentUser({
        first_name: '', last_name: '', username: '', password: '', user_type: 'client', permissions: {}
      });
    }
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permissionId) => {
    setCurrentUser(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permissionId]: !prev.permissions[permissionId]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const { id, ...userData } = currentUser;
      const { error } = await supabase.from('profiles').update({
        first_name: userData.first_name,
        last_name: userData.last_name,
        user_type: userData.user_type,
        permissions: userData.permissions,
      }).eq('id', id);

      if (error) {
        toast({ variant: 'destructive', title: 'Update failed', description: error.message });
      } else {
        toast({ title: 'User Updated!' });
      }
    } else {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: `${currentUser.username}@hidk.in`,
        password: currentUser.password,
        options: {
          data: {
            username: currentUser.username,
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            user_type: currentUser.user_type,
            permissions: currentUser.permissions,
          }
        }
      });

      if (signUpError) {
        toast({ variant: 'destructive', title: 'Creation failed', description: signUpError.message });
      } else {
        toast({ title: 'User Created!', description: 'Confirmation email sent.' });
      }
    }
    setOpen(false);
    fetchUsers();
  };

  const handleDelete = async (userId) => {
    // Note: Deleting users directly is complex due to auth/db separation.
    // This is a simplified version. A real app would use a server-side function.
    toast({ title: 'Deletion Disabled', description: 'User deletion must be handled via Supabase admin panel for security.' });
  };

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button onClick={() => handleOpen()} className="bg-gradient-to-r from-blue-600 to-indigo-600">
          <UserPlus className="h-4 w-4 mr-2" /> Add User
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit User' : 'Create New User'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" name="first_name" value={currentUser?.first_name || ''} onChange={handleChange} required />
              <Input placeholder="Last Name" name="last_name" value={currentUser?.last_name || ''} onChange={handleChange} required />
            </div>
            <Input placeholder="Username" name="username" value={currentUser?.username || ''} onChange={handleChange} required disabled={isEditing} />
            {!isEditing && <Input type="password" placeholder="Password" name="password" value={currentUser?.password || ''} onChange={handleChange} required />}
            <Select onValueChange={(value) => setCurrentUser({...currentUser, user_type: value})} value={currentUser?.user_type || 'client'}>
              <SelectTrigger><SelectValue placeholder="Select user type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="worker">Worker</SelectItem>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="supplier">Supplier</SelectItem>
              </SelectContent>
            </Select>
            {currentUser?.user_type === 'staff' && (
              <div className="space-y-2 pt-4 border-t">
                <h4 className="font-medium">Staff Permissions</h4>
                {permissionsList.map(p => (
                  <div key={p.id} className="flex items-center space-x-2">
                    <Checkbox id={p.id} checked={!!currentUser.permissions[p.id]} onCheckedChange={() => handlePermissionChange(p.id)} />
                    <Label htmlFor={p.id}>{p.label}</Label>
                  </div>
                ))}
              </div>
            )}
            <DialogFooter><Button type="submit">Save</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {loading ? <Spinner /> : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b"><th className="text-left p-3">Name</th><th className="text-left p-3">Username</th><th className="text-left p-3">Type</th><th className="text-right p-3">Actions</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{u.first_name} {u.last_name}</td>
                  <td className="p-3">{u.username}</td>
                  <td className="p-3"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs capitalize">{u.user_type}</span></td>
                  <td className="p-3 text-right space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleOpen(u)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(u.id)}><Trash2 className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
