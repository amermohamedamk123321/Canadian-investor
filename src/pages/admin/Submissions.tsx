/**
 * Admin Submissions Page
 * View and manage contact form submissions
 */

import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Mail, Phone, MessageSquare, Download, Trash2 } from 'lucide-react';
import type { ContactSubmission } from '../../types';

// Mock data - replace with actual API call
const mockSubmissions: ContactSubmission[] = [
  {
    id: '1',
    name: 'John Investor',
    email: 'john@example.com',
    phone: '(416) 555-0100',
    inquiry_type: 'investment',
    message: 'Interested in learning more about your technology opportunities.',
    status: 'new',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Partnership',
    email: 'jane@example.com',
    phone: '(416) 555-0101',
    inquiry_type: 'partnership',
    message: 'Would like to discuss partnership opportunities.',
    status: 'contacted',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-green-100 text-green-800',
};

const inquiryTypeLabels: Record<string, string> = {
  investment: 'Investment Inquiry',
  partnership: 'Partnership',
  general: 'General',
  other: 'Other',
};

export function AdminSubmissionsPage() {
  const [submissions] = useState<ContactSubmission[]>(mockSubmissions);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  const filteredSubmissions = statusFilter === 'all'
    ? submissions
    : submissions.filter(s => s.status === statusFilter);

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Type', 'Status', 'Message', 'Date'];
    const rows = filteredSubmissions.map(s => [
      s.name,
      s.email,
      s.phone || '',
      inquiryTypeLabels[s.inquiry_type],
      s.status,
      s.message,
      new Date(s.created_at).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'submissions.csv';
    a.click();
  };

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-heading">Contact Submissions</h2>
          <Button onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Submissions</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredSubmissions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-foreground/70">No submissions found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredSubmissions.map((submission) => (
              <Card
                key={submission.id}
                className="cursor-pointer hover:shadow-lg transition"
                onClick={() => setSelectedSubmission(submission)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{submission.name}</h3>
                      <div className="flex gap-4 mt-2 text-sm text-foreground/70">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {submission.email}
                        </div>
                        {submission.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {submission.phone}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge className={statusColors[submission.status]}>
                        {submission.status}
                      </Badge>
                      <span className="text-xs text-foreground/70">
                        {inquiryTypeLabels[submission.inquiry_type]}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 mt-1 text-foreground/50 flex-shrink-0" />
                    <p className="text-sm line-clamp-2">{submission.message}</p>
                  </div>
                  <p className="text-xs text-foreground/50 mt-2">
                    Received: {new Date(submission.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedSubmission && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedSubmission(null)}
          >
            <Card className="w-full max-w-2xl" onClick={e => e.stopPropagation()}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{selectedSubmission.name}</h2>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="text-foreground/50 hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-foreground/70">Email</p>
                    <p className="font-medium">{selectedSubmission.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Phone</p>
                    <p className="font-medium">{selectedSubmission.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Inquiry Type</p>
                    <p className="font-medium">{inquiryTypeLabels[selectedSubmission.inquiry_type]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Status</p>
                    <Badge className={statusColors[selectedSubmission.status]}>
                      {selectedSubmission.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-foreground/70 mb-2">Message</p>
                  <p className="p-4 bg-card rounded-lg">{selectedSubmission.message}</p>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">Mark as Contacted</Button>
                  <Button variant="outline" className="flex-1">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
