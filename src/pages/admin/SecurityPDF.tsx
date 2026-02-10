/**
 * Admin Security PDF Manager
 * Manage the Security & Compliance Guidelines PDF upload and versioning
 */

import { useState, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { useToast } from '../../hooks/use-toast';
import { Upload, Loader2, Download, Trash2, File, RefreshCw } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';

interface FileAsset {
  id: string;
  name: string;
  url: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  uploaded_at: string;
}

export function AdminSecurityPDFPage() {
  const { token } = useAdminAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [deleteFileId, setDeleteFileId] = useState<string | null>(null);
  const [summary, setSummary] = useState('');

  // Fetch uploaded files
  const { data: filesData, isLoading: filesLoading, refetch } = useQuery({
    queryKey: ['security-files'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/files?limit=20`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch files');
      return response.json();
    },
  });

  // Upload file mutation
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/files`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload file');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-files'] });
      toast({ title: 'PDF uploaded successfully' });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  // Delete file mutation
  const deleteMutation = useMutation({
    mutationFn: async (fileId: string) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/files/${fileId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to delete file');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-files'] });
      toast({ title: 'File deleted successfully' });
      setDeleteFileId(null);
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const files = filesData?.data || [];
  const currentPDF = files.length > 0 ? files[0] : null;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({ title: 'Error', description: 'Please upload a PDF file', variant: 'destructive' });
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        toast({ title: 'Error', description: 'File size must be less than 50MB', variant: 'destructive' });
        return;
      }
      uploadMutation.mutate(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      uploadMutation.mutate(file);
    } else {
      toast({ title: 'Error', description: 'Please upload a PDF file', variant: 'destructive' });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <AdminLayout>
      <Helmet>
        <title>Security PDF Manager - Alpha Partners Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Security & Compliance PDF</h1>
            <p className="text-muted-foreground">Manage the downloadable security guidelines document</p>
          </div>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            <RefreshCw size={16} /> Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Area */}
            <Card
              className={`p-8 border-2 border-dashed transition cursor-pointer ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploadMutation.isPending}
              />

              <div className="text-center">
                <Upload className="mx-auto mb-4 text-muted-foreground" size={32} />
                <h3 className="font-semibold mb-2">Upload Security PDF</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your PDF here or click to select
                </p>
                <p className="text-xs text-muted-foreground">
                  Maximum file size: 50MB
                </p>
              </div>
            </Card>

            {/* Summary Section */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Short Summary (shown on homepage)
              </label>
              <Textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief description of what's in the security guidelines PDF"
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-2">
                This summary is displayed on the homepage alongside the download button
              </p>
              <Button className="mt-4" disabled={uploadMutation.isPending}>
                {uploadMutation.isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                Save Summary
              </Button>
            </div>
          </div>

          {/* Current PDF Info */}
          <div>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Current PDF</h3>

              {currentPDF ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <File className="text-primary mt-1 flex-shrink-0" size={20} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{currentPDF.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(currentPDF.file_size)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded {new Date(currentPDF.uploaded_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <a href={currentPDF.url} target="_blank" rel="noopener noreferrer">
                        <Download size={16} className="mr-2" />
                        Download
                      </a>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => setDeleteFileId(currentPDF.id)}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </Button>
                  </div>

                  <Badge variant="outline" className="w-full justify-center">
                    {files.length} version(s)
                  </Badge>
                </div>
              ) : (
                <div className="text-center text-muted-foreground text-sm">
                  <p>No PDF uploaded yet</p>
                  <p className="text-xs mt-2">Upload your first security guidelines PDF above</p>
                </div>
              )}
            </Card>

            {/* File History */}
            {files.length > 1 && (
              <Card className="p-6 mt-4">
                <h3 className="font-semibold mb-3 text-sm">Version History</h3>
                <div className="space-y-2">
                  {files.slice(1).map((file: FileAsset) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between text-xs p-2 bg-muted rounded"
                    >
                      <span className="truncate">{file.name}</span>
                      <button
                        onClick={() => setDeleteFileId(file.id)}
                        className="text-destructive hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteFileId} onOpenChange={(open) => !open && setDeleteFileId(null)}>
          <AlertDialogContent>
            <AlertDialogTitle>Delete PDF</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this PDF? This action cannot be undone.
            </AlertDialogDescription>
            <div className="flex gap-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteFileId && deleteMutation.mutate(deleteFileId)}
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

export default AdminSecurityPDFPage;
