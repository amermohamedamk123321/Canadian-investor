/**
 * Admin Pages Editor
 * Edit content for all static pages
 */

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useToast } from '../../hooks/use-toast';
import { Save, Loader2, RefreshCw } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_description: string;
  og_title: string;
  og_image: string;
  published: boolean;
}

const PAGE_SLUGS = ['home', 'about', 'canadian-investors', 'international-investors', 'services', 'opportunities', 'contact'];

export function AdminPagesPage() {
  const { token } = useAdminAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    meta_description: '',
    og_title: '',
    og_image: '',
  });

  // Fetch all pages
  const { data: pagesData, isLoading: pagesLoading, refetch } = useQuery({
    queryKey: ['admin-pages'],
    queryFn: async () => {
      const response = await fetch('/api/admin/pages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch pages');
      return response.json();
    },
  });

  // Update page mutation
  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!selectedPage) throw new Error('No page selected');
      const response = await fetch(`/api/admin/pages/${selectedPage.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update page');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pages'] });
      toast({ title: 'Page updated successfully' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const pages = pagesData?.data || [];

  const handlePageSelect = (page: Page) => {
    setSelectedPage(page);
    setFormData({
      title: page.title,
      content: page.content,
      meta_description: page.meta_description || '',
      og_title: page.og_title || '',
      og_image: page.og_image || '',
    });
  };

  const handleSave = () => {
    if (!selectedPage) return;
    updateMutation.mutate(formData);
  };

  if (pagesLoading) {
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
        <title>Pages - Alpha Partners Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading mb-2">Pages</h1>
            <p className="text-muted-foreground">Edit content for public pages</p>
          </div>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            <RefreshCw size={16} /> Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Page List Sidebar */}
          <div className="border rounded-lg p-4">
            <h2 className="font-semibold mb-4">Pages</h2>
            <div className="space-y-2">
              {pages
                .filter((p: Page) => PAGE_SLUGS.includes(p.slug))
                .sort((a: Page, b: Page) => PAGE_SLUGS.indexOf(a.slug) - PAGE_SLUGS.indexOf(b.slug))
                .map((page: Page) => (
                  <button
                    key={page.id}
                    onClick={() => handlePageSelect(page)}
                    className={`w-full text-left px-4 py-2 rounded transition ${
                      selectedPage?.id === page.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="font-medium text-sm">{page.title}</div>
                    <div className="text-xs opacity-75">/{page.slug}</div>
                  </button>
                ))}
            </div>
          </div>

          {/* Page Editor */}
          <div className="lg:col-span-3">
            {selectedPage ? (
              <div className="border rounded-lg p-6">
                <Tabs defaultValue="content" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Page Title</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Page title"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-2">Page Content (HTML)</label>
                      <Textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Page content in HTML format"
                        rows={15}
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        You can use HTML tags: &lt;h1&gt;, &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;, etc.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="seo" className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Meta Description</label>
                      <Textarea
                        value={formData.meta_description}
                        onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                        placeholder="Page meta description (appears in search results)"
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {formData.meta_description.length}/160 characters
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-2">OG Title (Social)</label>
                      <Input
                        value={formData.og_title}
                        onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                        placeholder="Title for social media sharing"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-2">OG Image URL</label>
                      <Input
                        value={formData.og_image}
                        onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-2 mt-6">
                  <Button onClick={handleSave} disabled={updateMutation.isPending}>
                    {updateMutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                    <Save size={16} className="mr-2" /> Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border rounded-lg p-8 text-center text-muted-foreground">
                <p>Select a page to edit its content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPagesPage;
