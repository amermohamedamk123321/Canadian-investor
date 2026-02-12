/**
 * Admin SEO Management Page
 * Manage SEO metadata for all pages
 */

import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Search } from 'lucide-react';

const pages = [
  {
    id: '1',
    slug: 'home',
    title: 'Alpha Partners Investment Inc. | Strategic Canadian Investments',
    description: 'Alpha Partners connects visionary entrepreneurs with strategic investment opportunities across Canada.',
  },
  {
    id: '2',
    slug: 'about',
    title: 'About Alpha Partners',
    description: 'Learn about our mission, values, and expertise in the investment space.',
  },
  {
    id: '3',
    slug: 'opportunities',
    title: 'Investment Opportunities',
    description: 'Explore our curated list of vetted investment opportunities across Canada.',
  },
];

export function AdminSEOPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPage, setEditingPage] = useState<typeof pages[0] | null>(null);

  const filteredPages = pages.filter(page =>
    page.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-heading">SEO Management</h2>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Pages Grid */}
        {filteredPages.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-foreground/70">No pages found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredPages.map((page) => (
              <Card key={page.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg capitalize">{page.slug}</CardTitle>
                      <p className="text-sm text-foreground/70 mt-2 font-medium">Title Tag</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">{page.title}</p>
                      <p className="text-sm text-foreground/70 mt-3 font-medium">Meta Description</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{page.description}</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => setEditingPage(page)}
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit SEO for {page.slug}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="title">Page Title Tag (50-60 chars)</Label>
                            <Input
                              id="title"
                              defaultValue={page.title}
                              placeholder="Page title for search results"
                              maxLength={60}
                            />
                            <p className="text-xs text-muted-foreground">
                              {page.title.length} / 60 characters
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Meta Description (150-160 chars)</Label>
                            <Textarea
                              id="description"
                              defaultValue={page.description}
                              placeholder="Description for search results"
                              rows={3}
                              maxLength={160}
                            />
                            <p className="text-xs text-muted-foreground">
                              {page.description.length} / 160 characters
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                            <Textarea
                              id="keywords"
                              placeholder="investment, opportunities, canada"
                              rows={2}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="og-image">OG Image URL</Label>
                            <Input
                              id="og-image"
                              placeholder="https://example.com/og-image.jpg"
                              type="url"
                            />
                            <p className="text-xs text-muted-foreground">
                              Used when sharing on social media
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="canonical">Canonical URL</Label>
                            <Input
                              id="canonical"
                              placeholder="https://alphapartners.ca/page"
                              type="url"
                            />
                            <p className="text-xs text-muted-foreground">
                              Prevent duplicate content issues
                            </p>
                          </div>

                          <Button type="submit" className="w-full">
                            Save SEO Changes
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {/* SEO Tips Card */}
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="text-lg">SEO Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-foreground">Title Tag</p>
              <p className="text-muted-foreground">Keep between 50-60 characters. Include main keyword near the beginning.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Meta Description</p>
              <p className="text-muted-foreground">Keep between 150-160 characters. Be descriptive and include a call-to-action.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Keywords</p>
              <p className="text-muted-foreground">Use 3-5 relevant keywords that your audience searches for.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">OG Images</p>
              <p className="text-muted-foreground">Use 1200x630px images for best display on social media.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
