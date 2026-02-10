/**
 * Admin Canadian Investors Page
 * Manage province-based investment entries for Canadian investors
 */

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '../../components/ui/alert-dialog';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { useToast } from '../../hooks/use-toast';
import { Plus, Edit2, Trash2, RefreshCw, Loader2, ChevronUp, ChevronDown } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface CanadianInvestorEntry {
  id: string;
  title: string;
  slug: string;
  description: string;
  asset_types: string;
  attachments: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export function AdminCanadianInvestorsPage() {
  const { token } = useAdminAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<CanadianInvestorEntry | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteEntryId, setDeleteEntryId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    asset_types: '[]',
  });

  // Fetch entries
  const { data: entriesData, isLoading, refetch } = useQuery({
    queryKey: ['canadian-investors'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/canadian-investors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch entries');
      return response.json();
    },
  });

  // Create entry mutation
  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/canadian-investors`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          asset_types: data.asset_types ? JSON.parse(data.asset_types) : [],
        }),
      });
      if (!response.ok) throw new Error('Failed to create entry');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['canadian-investors'] });
      toast({ title: 'Entry created successfully' });
      setIsCreateOpen(false);
      setFormData({ title: '', slug: '', description: '', asset_types: '[]' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  // Update entry mutation
  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/canadian-investors/${editingEntry?.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          asset_types: data.asset_types ? JSON.parse(data.asset_types) : [],
        }),
      });
      if (!response.ok) throw new Error('Failed to update entry');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['canadian-investors'] });
      toast({ title: 'Entry updated successfully' });
      setIsEditOpen(false);
      setEditingEntry(null);
      setFormData({ title: '', slug: '', description: '', asset_types: '[]' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  // Delete entry mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/canadian-investors/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to delete entry');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['canadian-investors'] });
      toast({ title: 'Entry deleted successfully' });
      setDeleteEntryId(null);
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  // Reorder mutation
  const reorderMutation = useMutation({
    mutationFn: async ({ id, display_order }: { id: string; display_order: number }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/canadian-investors/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ display_order }),
      });
      if (!response.ok) throw new Error('Failed to reorder entry');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['canadian-investors'] });
    },
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.description) {
      toast({ title: 'Error', description: 'All fields required', variant: 'destructive' });
      return;
    }
    createMutation.mutate(formData);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.description) {
      toast({ title: 'Error', description: 'All fields required', variant: 'destructive' });
      return;
    }
    updateMutation.mutate(formData);
  };

  const handleEditClick = (entry: CanadianInvestorEntry) => {
    setEditingEntry(entry);
    setFormData({
      title: entry.title,
      slug: entry.slug,
      description: entry.description,
      asset_types: entry.asset_types || '[]',
    });
    setIsEditOpen(true);
  };

  const handleMoveUp = (entry: CanadianInvestorEntry) => {
    const newOrder = Math.max(0, entry.display_order - 1);
    reorderMutation.mutate({ id: entry.id, display_order: newOrder });
  };

  const handleMoveDown = (entry: CanadianInvestorEntry) => {
    const newOrder = entry.display_order + 1;
    reorderMutation.mutate({ id: entry.id, display_order: newOrder });
  };

  const entries = entriesData?.data || [];

  return (
    <AdminLayout>
      <Helmet>
        <title>Canadian Investors - Alpha Partners Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Canadian Investors</h1>
            <p className="text-muted-foreground">Manage province-based investment opportunities</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => refetch()} variant="outline" size="sm">
              <RefreshCw size={16} /> Refresh
            </Button>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus size={16} /> Add Province
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Canadian Investment Entry</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Province Name</label>
                    <Input
                      placeholder="e.g., Ontario"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Slug</label>
                    <Input
                      placeholder="e.g., ontario"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      placeholder="Describe the investment opportunities in this province"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                    {createMutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                    Create Entry
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Entries Table */}
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="animate-spin" />
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            No entries found. Create the first one!
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry: CanadianInvestorEntry, index: number) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.title}</TableCell>
                    <TableCell><Badge variant="outline">{entry.slug}</Badge></TableCell>
                    <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                      {entry.description}
                    </TableCell>
                    <TableCell>{entry.display_order}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMoveUp(entry)}
                          disabled={index === 0}
                        >
                          <ChevronUp size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMoveDown(entry)}
                          disabled={index === entries.length - 1}
                        >
                          <ChevronDown size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(entry)}
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteEntryId(entry.id)}
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

        {/* Edit Entry Dialog */}
        {editingEntry && (
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit: {editingEntry.title}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Province Name</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                  Update Entry
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteEntryId} onOpenChange={(open) => !open && setDeleteEntryId(null)}>
          <AlertDialogContent>
            <AlertDialogTitle>Delete Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this entry? This action cannot be undone.
            </AlertDialogDescription>
            <div className="flex gap-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteEntryId && deleteMutation.mutate(deleteEntryId)}
                disabled={deleteMutation.isPending}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
              >
                {deleteMutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                Delete
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}

export default AdminCanadianInvestorsPage;
