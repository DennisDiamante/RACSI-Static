
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { UserPlus, Trash2, Key, Shield, ShieldAlert, Code, Eye, EyeOff } from 'lucide-react';

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status || 'loading';
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState<string>('');
  
  // Create user dialog
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'admin' });
  const [showPassword, setShowPassword] = useState(false);
  
  // Change password dialog
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>('');
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isChangingOwnPassword, setIsChangingOwnPassword] = useState(false);
  
  // Delete user dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchUsers();
      // Get current user role
      fetchCurrentUserRole();
    }
  }, [status, router]);

  const fetchCurrentUserRole = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const allUsers = await response.json();
        const currentUser = allUsers.find((u: User) => u.email === session?.user?.email);
        if (currentUser) {
          setCurrentUserRole(currentUser.role);
        }
      }
    } catch (error) {
      console.error('Error fetching current user role:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      if (!newUser.email || !newUser.password || !newUser.role) {
        toast.error('Please fill in all required fields');
        return;
      }

      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        toast.success('User created successfully');
        setIsCreateDialogOpen(false);
        setNewUser({ name: '', email: '', password: '', role: 'admin' });
        fetchUsers();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user');
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      const response = await fetch(`/api/admin/users/${userToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('User deleted successfully');
        setIsDeleteDialogOpen(false);
        setUserToDelete(null);
        fetchUsers();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleChangePassword = async () => {
    try {
      if (!passwordData.newPassword) {
        toast.error('Please enter a new password');
        return;
      }

      if (isChangingOwnPassword && !passwordData.currentPassword) {
        toast.error('Please enter your current password');
        return;
      }

      const response = await fetch(`/api/admin/users/${selectedUserId}/password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData),
      });

      if (response.ok) {
        toast.success('Password changed successfully');
        setIsPasswordDialogOpen(false);
        setPasswordData({ currentPassword: '', newPassword: '' });
        setSelectedUserId('');
        setSelectedUserEmail('');
        setIsChangingOwnPassword(false);
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Failed to change password');
    }
  };

  const openPasswordDialog = (userId: string, userEmail: string) => {
    setSelectedUserId(userId);
    setSelectedUserEmail(userEmail);
    setIsChangingOwnPassword(userEmail === session?.user?.email);
    setPasswordData({ currentPassword: '', newPassword: '' });
    setIsPasswordDialogOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      developer: { icon: Code, color: 'bg-purple-100 text-purple-800', label: 'Developer' },
      super_admin: { icon: ShieldAlert, color: 'bg-red-100 text-red-800', label: 'Super Admin' },
      admin: { icon: Shield, color: 'bg-blue-100 text-blue-800', label: 'Admin' },
    };

    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.admin;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-4 h-4 mr-1" />
        {config.label}
      </span>
    );
  };

  const canCreateUser = () => {
    return currentUserRole === 'super_admin' || currentUserRole === 'developer';
  };

  const canDeleteUser = (targetRole: string, targetEmail: string) => {
    // Developers can delete Super Admins and Admins, but not themselves or other Developers
    if (currentUserRole === 'developer') {
      if (targetEmail === session?.user?.email) return false; // Can't delete yourself
      return targetRole === 'super_admin' || targetRole === 'admin';
    }
    // Super Admins can only delete Admins
    if (currentUserRole === 'super_admin') {
      return targetRole === 'admin' && targetEmail !== session?.user?.email;
    }
    return false;
  };

  const canChangePassword = (targetEmail: string) => {
    // Developers can change passwords of all users
    if (currentUserRole === 'developer') return true;
    // Others can only change their own password
    return targetEmail === session?.user?.email;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-2 text-gray-600">
            Manage user accounts and permissions
          </p>
        </div>

        {/* Create User Button */}
        {canCreateUser() && (
          <div className="mb-6">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-600 hover:bg-yellow-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create New User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                  <DialogDescription>
                    Add a new user to the system
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        placeholder="Enter password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currentUserRole === 'developer' && (
                          <>
                            <SelectItem value="developer">Developer</SelectItem>
                            <SelectItem value="super_admin">Super Admin</SelectItem>
                          </>
                        )}
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateUser} className="bg-yellow-600 hover:bg-yellow-700">
                    Create User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Users List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{user.name || 'No Name'}</CardTitle>
                    <CardDescription className="mt-1">{user.email}</CardDescription>
                  </div>
                  {getRoleBadge(user.role)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Created:</span>{' '}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Updated:</span>{' '}
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  {canChangePassword(user.email) && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openPasswordDialog(user.id, user.email)}
                      className="flex-1"
                    >
                      <Key className="w-4 h-4 mr-1" />
                      Change Password
                    </Button>
                  )}
                  {canDeleteUser(user.role, user.email) && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => openDeleteDialog(user)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Change Password Dialog */}
        <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                {isChangingOwnPassword
                  ? 'Change your password'
                  : `Change password for ${selectedUserEmail}`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {isChangingOwnPassword && (
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password *</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, currentPassword: e.target.value })
                      }
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password *</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsPasswordDialogOpen(false);
                  setPasswordData({ currentPassword: '', newPassword: '' });
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleChangePassword} className="bg-yellow-600 hover:bg-yellow-700">
                Change Password
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete User Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the user account for{' '}
                <strong>{userToDelete?.email}</strong>. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setUserToDelete(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteUser}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete User
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
