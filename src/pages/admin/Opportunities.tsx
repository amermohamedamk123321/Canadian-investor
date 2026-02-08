/**
 * Admin Opportunities Page
 * Manage investment opportunities
 */

import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useOpportunities, useCreateOpportunity, useDeleteOpportunity } from '../../api/hooks';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { CreateOpportunityInput } from '../../types';

export function AdminOpportunitiesPage() {
  const { data: opportunities, isLoading } = useOpportunities(false);
  const createMutation = useCreateOpportunity();
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateOpportunityInput>();

  const handleCreate = async (data: CreateOpportunityInput) => {
    try {
      await createMutation.mutateAsync(data);
      reset();
    } catch (error) {
      console.error('Failed to create opportunity:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-heading font-bold">Opportunities</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Opportunity
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Opportunity</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(handleCreate)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Opportunity title"
                      {...register('title', { required: 'Title is required' })}
                    />
                    {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      placeholder="opportunity-slug"
                      {...register('slug', { required: 'Slug is required' })}
                    />
                    {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed description"
                    rows={5}
                    {...register('description', { required: 'Description is required' })}
                  />
                  {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sector">Sector</Label>
                    <Input
                      id="sector"
                      placeholder="e.g., Technology"
                      {...register('sector', { required: 'Sector is required' })}
                    />
                    {errors.sector && <p className="text-sm text-destructive">{errors.sector.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="province">Province</Label>
                    <Input
                      id="province"
                      placeholder="e.g., Ontario"
                      {...register('province', { required: 'Province is required' })}
                    />
                    {errors.province && <p className="text-sm text-destructive">{errors.province.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="min_investment">Min Investment</Label>
                    <Input
                      id="min_investment"
                      type="number"
                      placeholder="50000"
                      {...register('min_investment', { 
                        required: 'Minimum investment is required',
                        valueAsNumber: true 
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max_investment">Max Investment</Label>
                    <Input
                      id="max_investment"
                      type="number"
                      placeholder="500000"
                      {...register('max_investment', { 
                        required: 'Maximum investment is required',
                        valueAsNumber: true 
                      })}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Creating...' : 'Create Opportunity'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {deleteError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{deleteError}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-foreground/70">Loading opportunities...</p>
          </div>
        ) : opportunities?.data?.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-foreground/70">No opportunities yet. Create one to get started!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {opportunities?.data?.map((opp) => (
              <Card key={opp.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle className="text-lg">{opp.title}</CardTitle>
                    <p className="text-sm text-foreground/70 mt-1">{opp.sector} • {opp.province}</p>
                  </div>
                  <div className="flex gap-2">
                    {opp.published ? (
                      <span className="px-3 py-1 bg-teal/20 text-teal rounded-full text-xs font-medium">
                        Published
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                        Draft
                      </span>
                    )}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
