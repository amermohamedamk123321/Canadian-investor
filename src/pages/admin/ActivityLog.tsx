/**
 * Activity Log Page
 * Displays audit trail of admin actions
 */

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { useToast } from '../../hooks/use-toast';
import { RefreshCw, Loader2 } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export function AdminActivityLogPage() {
  const { token } = useAdminAuth();
  const { toast } = useToast();

  const { data: activityData, isLoading, refetch } = useQuery({
    queryKey: ['admin-activity'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/activity?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch activity logs');
      return response.json();
    },
  });

  const activities = activityData?.data || [];

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-50 text-green-700';
      case 'update':
        return 'bg-blue-50 text-blue-700';
      case 'delete':
        return 'bg-red-50 text-red-700';
      case 'publish':
        return 'bg-purple-50 text-purple-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case 'page':
        return '📄';
      case 'opportunity':
        return '💼';
      case 'submission':
        return '✉️';
      case 'admin_user':
        return '👤';
      case 'file':
        return '📁';
      case 'seo':
        return '🔍';
      case 'service':
        return '⚙️';
      case 'canadian_investor':
        return '🍁';
      case 'international_track':
        return '🌍';
      default:
        return '📌';
    }
  };

  return (
    <AdminLayout>
      <Helmet>
        <title>Activity Log - Alpha Partners Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Activity Log</h1>
            <p className="text-muted-foreground">Audit trail of all admin actions</p>
          </div>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            <RefreshCw size={16} /> Refresh
          </Button>
        </div>

        {/* Activity Table */}
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="animate-spin" />
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            No activity recorded yet
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead className="text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity: any) => (
                  <TableRow key={activity.id}>
                    <TableCell className="text-sm">
                      {new Date(activity.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm font-medium">{activity.user_id.slice(0, 8)}</TableCell>
                    <TableCell>
                      <Badge className={getActionColor(activity.action)}>
                        {activity.action.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      <span className="mr-1">{getEntityIcon(activity.entity_type)}</span>
                      <span className="capitalize">{activity.entity_type.replace(/_/g, ' ')}</span>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {activity.entity_id.slice(0, 8)}...
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Showing {activities.length} recent activities. Use the logs for auditing and compliance tracking.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminActivityLogPage;
