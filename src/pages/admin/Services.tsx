/**
 * Admin Services Page
 * Manage advisory and coordination services
 */

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '../../components/ui/alert-dialog';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { useToast } from '../../hooks/use-toast';
import { Plus, Edit2, Trash2, RefreshCw, Loader2, ChevronUp, ChevronDown } from 'lucide-react';
import { getRequest, postRequest, putRequest, deleteRequest, APIError } from '../../api/client';

interface ServiceEntry {
  id: string;
  title: string;
  slug: string;
  description: string;
  details: string;
  audience: string;
  attachments: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export function AdminServicesPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceEntry | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    details: '',
    audience: 'both',
  });

  // Fetch services
  const { data: servicesData, isLoading, refetch } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      return getRequest<any>('/services');
    },
  });

  // Create service mutation
  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return postRequest<any>('/admin/services', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: 'Service created successfully' });
      setIsCreateOpen(false);
      setFormData({ title: '', slug: '', description: '', details: '', audience: 'both' });
    },
    onError: (error: any) => {
      const message = error instanceof APIError ? error.message : error.message;
      toast({ title: 'Error', description: message, variant: 'destructive' });
    },
  });

  // Update service mutation
  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      return putRequest<any>(`/admin/services/${editingService?.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: 'Service updated successfully' });
      setIsEditOpen(false);
      setEditingService(null);
      setFormData({ title: '', slug: '', description: '', details: '', audience: 'both' });
    },
    onError: (error: any) => {
      const message = error instanceof APIError ? error.message : error.message;
      toast({ title: 'Error', description: message, variant: 'destructive' });
    },
  });

  // Delete service mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return deleteRequest<any>(`/admin/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: 'Service deleted successfully' });
      setDeleteServiceId(null);
    },
    onError: (error: any) => {
      const message = error instanceof APIError ? error.message : error.message;
      toast({ title: 'Error', description: message, variant: 'destructive' });
    },
  });

  // Reorder mutation
  const reorderMutation = useMutation({
    mutationFn: async ({ id, display_order }: { id: string; display_order: number }) => {
      return putRequest<any>(`/admin/services/${id}`, { display_order });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.description) {
      toast({ title: 'Error', description: 'Title, slug, and description required', variant: 'destructive' });
      return;
    }
    createMutation.mutate(formData);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.description) {
      toast({ title: 'Error', description: 'Title, slug, and description required', variant: 'destructive' });
      return;
    }
    updateMutation.mutate(formData);
  };

  const handleEditClick = (service: ServiceEntry) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      description: service.description,
      details: service.details,
      audience: service.audience || 'both',
    });
    setIsEditOpen(true);
  };

  const handleMoveUp = (service: ServiceEntry) => {
    const newOrder = Math.max(0, service.display_order - 1);
    reorderMutation.mutate({ id: service.id, display_order: newOrder });
  };

  const handleMoveDown = (service: ServiceEntry) => {
    const newOrder = service.display_order + 1;
    reorderMutation.mutate({ id: service.id, display_order: newOrder });
  };

  const services = servicesData?.data || [];

  const getAudienceBadgeColor = (audience: string) => {
    switch (audience) {
      case 'canadian':
        return 'bg-red-100 text-red-800';
      case 'international':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <Helmet>
        <title>Services - Alpha Partners Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading mb-2">Services</h1>
            <p className="text-muted-foreground">Manage advisory and coordination services</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => refetch()} variant="outline" size="sm">
              <RefreshCw size={16} /> Refresh
            </Button>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus size={16} /> Add Service
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Service Title</label>
                    <Input
                      placeholder="e.g., Investment Advisory"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Slug</label>
                    <Input
                      placeholder="e.g., investment-advisory"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Short Description</label>
                    <Textarea
                      placeholder="Brief description of the service"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Detailed Description</label>
                    <Textarea
                      placeholder="Full details of the service"
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Audience</label>
                    <Select value={formData.audience} onValueChange={(value) => setFormData({ ...formData, audience: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="both">Both (Canadian & International)</SelectItem>
                        <SelectItem value="canadian">Canadian Investors Only</SelectItem>
                        <SelectItem value="international">International Investors Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                    {createMutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                    Create Service
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Services Table */}
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="animate-spin" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            No services found. Create the first one!
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service: ServiceEntry, index: number) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>
                      <Badge className={getAudienceBadgeColor(service.audience)}>
                        {service.audience === 'both' ? 'Both' : service.audience === 'canadian' ? 'Canadian' : 'International'}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                      {service.description}
                    </TableCell>
                    <TableCell>{service.display_order}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMoveUp(service)}
                          disabled={index === 0}
                        >
                          <ChevronUp size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMoveDown(service)}
                          disabled={index === services.length - 1}
                        >
                          <ChevronDown size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(service)}
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteServiceId(service.id)}
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

        {/* Edit Service Dialog */}
        {editingService && (
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit: {editingService.title}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Service Title</label>
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
                  <label className="text-sm font-medium">Short Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Detailed Description</label>
                  <Textarea
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Audience</label>
                  <Select value={formData.audience} onValueChange={(value) => setFormData({ ...formData, audience: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="both">Both (Canadian & International)</SelectItem>
                      <SelectItem value="canadian">Canadian Investors Only</SelectItem>
                      <SelectItem value="international">International Investors Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                  Update Service
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteServiceId} onOpenChange={(open) => !open && setDeleteServiceId(null)}>
          <AlertDialogContent>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this service? This action cannot be undone.
            </AlertDialogDescription>
            <div className="flex gap-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteServiceId && deleteMutation.mutate(deleteServiceId)}
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

export default AdminServicesPage;
