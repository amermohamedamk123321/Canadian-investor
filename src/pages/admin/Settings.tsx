/**
 * Admin Settings Page
 * Manage site configuration and settings
 */

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { useToast } from '../../hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import { getRequest, postRequest, putRequest, APIError } from '../../api/client';
import type { SiteSettings } from '../../types/index';

export function AdminSettingsPage() {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<SiteSettings>>({
    site_name: '',
    contact_email: '',
    contact_phone: '',
    company_address: '',
    company_tagline: '',
  });

  // Fetch current settings
  const { data: settingsData, isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: async () => {
      return getRequest<any>('/settings');
    },
  });

  // Initialize form with fetched data
  useEffect(() => {
    if (settingsData?.data) {
      setFormData(settingsData.data);
    }
  }, [settingsData]);

  // Create or update settings mutation
  const saveMutation = useMutation({
    mutationFn: async (data: Partial<SiteSettings>) => {
      // If we have settings ID, update; otherwise create
      if (settingsData?.data?.id) {
        return putRequest<any>(`/admin/settings/${settingsData.data.id}`, data);
      } else {
        return postRequest<any>('/admin/settings', data);
      }
    },
    onSuccess: () => {
      toast({ title: 'Settings saved successfully' });
    },
    onError: (error: any) => {
      const message = error instanceof APIError ? error.message : error.message;
      toast({ title: 'Error', description: message, variant: 'destructive' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.site_name || !formData.contact_email) {
      toast({ 
        title: 'Error', 
        description: 'Site name and contact email are required',
        variant: 'destructive' 
      });
      return;
    }
    saveMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center p-8">
          <Loader2 className="animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Helmet>
        <title>Settings - Alpha Partners Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="p-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading mb-2">Site Settings</h1>
          <p className="text-muted-foreground">Configure your site information and contact details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white border rounded-lg p-6">
          {/* Site Name */}
          <div>
            <label className="text-sm font-medium block mb-2">Site Name</label>
            <Input
              placeholder="e.g., Alpha Partners"
              value={formData.site_name || ''}
              onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">The name of your company/site</p>
          </div>

          {/* Company Tagline */}
          <div>
            <label className="text-sm font-medium block mb-2">Company Tagline</label>
            <Input
              placeholder="e.g., Your investment partner"
              value={formData.company_tagline || ''}
              onChange={(e) => setFormData({ ...formData, company_tagline: e.target.value })}
            />
            <p className="text-xs text-muted-foreground mt-1">A brief tagline describing your company</p>
          </div>

          {/* Contact Email */}
          <div>
            <label className="text-sm font-medium block mb-2">Contact Email</label>
            <Input
              type="email"
              placeholder="contact@example.com"
              value={formData.contact_email || ''}
              onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">Primary contact email address</p>
          </div>

          {/* Contact Phone */}
          <div>
            <label className="text-sm font-medium block mb-2">Contact Phone</label>
            <Input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.contact_phone || ''}
              onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
            />
            <p className="text-xs text-muted-foreground mt-1">Primary contact phone number</p>
          </div>

          {/* Company Address */}
          <div>
            <label className="text-sm font-medium block mb-2">Company Address</label>
            <Textarea
              placeholder="123 Main Street&#10;City, Province, Country"
              value={formData.company_address || ''}
              onChange={(e) => setFormData({ ...formData, company_address: e.target.value })}
              rows={4}
            />
            <p className="text-xs text-muted-foreground mt-1">Full company address</p>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={saveMutation.isPending}
          >
            {saveMutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save size={16} className="mr-2" />}
            Save Settings
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AdminSettingsPage;
