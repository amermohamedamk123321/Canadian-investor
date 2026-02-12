/**
 * Admin Users Management Page
 * Allows super-admins to create, edit, and manage admin user accounts
 */

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '../../components/ui/alert-dialog';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { useToast } from '../../hooks/use-toast';
import { Plus, Edit2, Trash2, RefreshCw, Loader2 } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { getRequest, postRequest, putRequest, deleteRequest, APIError } from '../../api/client';

export function AdminUsersPage() {
  const { token, user } = useAdminAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'editor' });

  // Check if current user is super admin
  const isSuperAdmin = user?.role === 'admin';

  // Fetch users
  const { data: usersData, isLoading: isLoadingUsers, refetch } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      return getRequest<any>('/admin/users');
    },
    enabled: isSuperAdmin,
  });

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (data: any) => {
      return postRequest<any>('/admin/users', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({ title: 'User created successfully' });
      setIsCreateOpen(false);
      setFormData({ email: '', password: '', role: 'editor' });
    },
    onError: (error: any) => {
      const message = error instanceof APIError ? error.message : error.message;
      toast({ title: 'Error', description: message, variant: 'destructive' });
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async (data: any) => {
      return putRequest<any>(`/admin/users/${editingUser.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({ title: 'User updated successfully' });
      setIsEditOpen(false);
      setEditingUser(null);
      setFormData({ email: '', password: '', role: 'editor' });
    },
    onError: (error: any) => {
      const message = error instanceof APIError ? error.message : error.message;
      toast({ title: 'Error', description: message, variant: 'destructive' });
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      return deleteRequest<any>(`/admin/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({ title: 'User deleted successfully' });
      setDeleteUserId(null);
    },
    onError: (error: any) => {
      const message = error instanceof APIError ? error.message : error.message;
      toast({ title: 'Error', description: message, variant: 'destructive' });
    },
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({ title: 'Error', description: 'Email and password required', variant: 'destructive' });
      return;
    }
    createUserMutation.mutate(formData);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: any = { role: formData.role };
    if (formData.password) {
      updateData.password = formData.password;
    }
    updateUserMutation.mutate(updateData);
  };

  const handleEditClick = (userData: any) => {
    setEditingUser(userData);
    setFormData({ email: userData.email, password: '', role: userData.role });
    setIsEditOpen(true);
  };

  if (!isSuperAdmin) {
    return (
      <AdminLayout>
        <div className="p-8">
          <p className="text-red-600">You do not have permission to access this page. Super Admin role required.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Helmet>
        <title>Admin Users - Alpha Partners Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading mb-2">Admin Users</h1>
            <p className="text-muted-foreground">Manage admin user accounts and permissions</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => refetch()} variant="outline" size="sm">
              <RefreshCw size={16} /> Refresh
            </Button>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus size={16} /> Create User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Admin User</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      type="password"
                      placeholder="Strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Super Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full" disabled={createUserMutation.isPending}>
                    {createUserMutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                    Create User
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Users Table */}
        {isLoadingUsers ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="animate-spin" />
          </div>
        ) : usersData?.data?.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            No admin users found
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersData?.data?.map((userData: any) => (
                  <TableRow key={userData.id}>
                    <TableCell className="font-medium">{userData.email}</TableCell>
                    <TableCell>
                      <Badge variant={userData.role === 'admin' ? 'default' : 'secondary'}>
                        {userData.role === 'admin' ? 'Super Admin' : 'Editor'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={userData.active ? 'outline' : 'destructive'}>
                        {userData.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {userData.last_login ? new Date(userData.last_login).toLocaleDateString() : 'Never'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(userData.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(userData)}
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteUserId(userData.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Edit User Dialog */}
        {editingUser && (
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit User: {editingUser.email}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" value={editingUser.email} disabled className="bg-muted" />
                </div>
                <div>
                  <label className="text-sm font-medium">New Password (leave blank to keep current)</label>
                  <Input
                    type="password"
                    placeholder="Leave blank to keep current password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Super Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={updateUserMutation.isPending}>
                  {updateUserMutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                  Update User
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteUserId} onOpenChange={(open) => !open && setDeleteUserId(null)}>
          <AlertDialogContent>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </AlertDialogDescription>
            <div className="flex gap-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteUserId && deleteUserMutation.mutate(deleteUserId)}
                disabled={deleteUserMutation.isPending}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
              >
                {deleteUserMutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                Delete
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}

export default AdminUsersPage;
