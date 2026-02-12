/**
 * Admin International Investors Page
 * Manage investment tracks for international investors
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
import { getRequest, postRequest, putRequest, deleteRequest, APIError } from '../../api/client';

interface InternationalInvestorTrack {
  id: string;
  name: string;
  slug: string;
  description: string;
  countries: string;
  attachments: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export function AdminInternationalInvestorsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<InternationalInvestorTrack | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteTrackId, setDeleteTrackId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    countries: '',
  });

  // Fetch tracks
  const { data: tracksData, isLoading, refetch } = useQuery({
    queryKey: ['international-investors'],
    queryFn: async () => {
      return getRequest<any>('/international-investors');
    },
  });

  // Create track mutation
  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return postRequest<any>('/admin/international-investors', {
        ...data,
        countries: data.countries.split(',').map((c: string) => c.trim()).filter(Boolean),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['international-investors'] });
      toast({ title: 'Track created successfully' });
      setIsCreateOpen(false);
      setFormData({ name: '', slug: '', description: '', countries: '' });
    },
    onError: (error: any) => {
      const message = error instanceof APIError ? error.message : error.message;
      toast({ title: 'Error', description: message, variant: 'destructive' });
    },
  });

  // Update track mutation
  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      return putRequest<any>(`/admin/international-investors/${editingTrack?.id}`, {
        ...data,
        countries: data.countries.split(',').map((c: string) => c.trim()).filter(Boolean),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['international-investors'] });
      toast({ title: 'Track updated successfully' });
      setIsEditOpen(false);
      setEditingTrack(null);
      setFormData({ name: '', slug: '', description: '', countries: '' });
    },
    onError: (error: any) => {
      const message = error instanceof APIError ? error.message : error.message;
      toast({ title: 'Error', description: message, variant: 'destructive' });
    },
  });

  // Delete track mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return deleteRequest<any>(`/admin/international-investors/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['international-investors'] });
      toast({ title: 'Track deleted successfully' });
      setDeleteTrackId(null);
    },
    onError: (error: any) => {
      const message = error instanceof APIError ? error.message : error.message;
      toast({ title: 'Error', description: message, variant: 'destructive' });
    },
  });

  // Reorder mutation
  const reorderMutation = useMutation({
    mutationFn: async ({ id, display_order }: { id: string; display_order: number }) => {
      return putRequest<any>(`/admin/international-investors/${id}`, { display_order });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['international-investors'] });
    },
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug || !formData.description) {
      toast({ title: 'Error', description: 'All fields required', variant: 'destructive' });
      return;
    }
    createMutation.mutate(formData);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug || !formData.description) {
      toast({ title: 'Error', description: 'All fields required', variant: 'destructive' });
      return;
    }
    updateMutation.mutate(formData);
  };

  const handleEditClick = (track: InternationalInvestorTrack) => {
    setEditingTrack(track);
    const countries = track.countries ? JSON.parse(track.countries).join(', ') : '';
    setFormData({
      name: track.name,
      slug: track.slug,
      description: track.description,
      countries,
    });
    setIsEditOpen(true);
  };

  const handleMoveUp = (track: InternationalInvestorTrack) => {
    const newOrder = Math.max(0, track.display_order - 1);
    reorderMutation.mutate({ id: track.id, display_order: newOrder });
  };

  const handleMoveDown = (track: InternationalInvestorTrack) => {
    const newOrder = track.display_order + 1;
    reorderMutation.mutate({ id: track.id, display_order: newOrder });
  };

  const tracks = tracksData?.data || [];

  return (
    <AdminLayout>
      <Helmet>
        <title>International Investors - Alpha Partners Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">International Investors</h1>
            <p className="text-muted-foreground">Manage investment tracks for international audiences</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => refetch()} variant="outline" size="sm">
              <RefreshCw size={16} /> Refresh
            </Button>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus size={16} /> Add Track
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Investment Track</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Track Name</label>
                    <Input
                      placeholder="e.g., Commercial Real Estate"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Slug</label>
                    <Input
                      placeholder="e.g., commercial-real-estate"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      placeholder="Describe this investment track"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Countries (comma-separated)</label>
                    <Input
                      placeholder="USA, UK, Germany"
                      value={formData.countries}
                      onChange={(e) => setFormData({ ...formData, countries: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                    {createMutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                    Create Track
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tracks Table */}
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="animate-spin" />
          </div>
        ) : tracks.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            No tracks found. Create the first one!
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Track Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tracks.map((track: InternationalInvestorTrack, index: number) => (
                  <TableRow key={track.id}>
                    <TableCell className="font-medium">{track.name}</TableCell>
                    <TableCell><Badge variant="outline">{track.slug}</Badge></TableCell>
                    <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                      {track.description}
                    </TableCell>
                    <TableCell>{track.display_order}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMoveUp(track)}
                          disabled={index === 0}
                        >
                          <ChevronUp size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMoveDown(track)}
                          disabled={index === tracks.length - 1}
                        >
                          <ChevronDown size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(track)}
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteTrackId(track.id)}
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

        {/* Edit Track Dialog */}
        {editingTrack && (
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit: {editingTrack.name}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Track Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                <div>
                  <label className="text-sm font-medium">Countries (comma-separated)</label>
                  <Input
                    value={formData.countries}
                    onChange={(e) => setFormData({ ...formData, countries: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                  Update Track
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteTrackId} onOpenChange={(open) => !open && setDeleteTrackId(null)}>
          <AlertDialogContent>
            <AlertDialogTitle>Delete Track</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this track? This action cannot be undone.
            </AlertDialogDescription>
            <div className="flex gap-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteTrackId && deleteMutation.mutate(deleteTrackId)}
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

export default AdminInternationalInvestorsPage;
