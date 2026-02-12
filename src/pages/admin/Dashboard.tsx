/**
 * Admin Dashboard Page
 * Overview of system statistics and recent activity
 */

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useOpportunities } from '../../api/hooks';
import { Briefcase, FileText, Users, MessageSquare, TrendingUp } from 'lucide-react';

export function AdminDashboardPage() {
  const { data: opportunities } = useOpportunities(false);

  const stats = [
    {
      title: 'Total Opportunities',
      value: opportunities?.total || 0,
      icon: Briefcase,
      color: 'text-blue-600',
    },
    {
      title: 'Published Opportunities',
      value: opportunities?.data?.filter(o => o.published).length || 0,
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Pages',
      value: 6,
      icon: FileText,
      color: 'text-purple-600',
    },
    {
      title: 'Submissions',
      value: 0,
      icon: MessageSquare,
      color: 'text-orange-600',
    },
  ];

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-heading text-foreground mb-2">Dashboard</h2>
          <p className="text-foreground/70">Welcome back! Here's an overview of your site.</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-xs text-foreground/70 mt-1">Total items</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a
                href="/admin/opportunities"
                className="p-4 border border-border rounded-lg hover:bg-accent/10 transition text-center"
              >
                <Briefcase className="h-8 w-8 mx-auto mb-2 text-accent" />
                <h3 className="font-semibold text-foreground">Manage Opportunities</h3>
                <p className="text-sm text-foreground/70">Create or edit investment opportunities</p>
              </a>
              <a
                href="/admin/pages"
                className="p-4 border border-border rounded-lg hover:bg-accent/10 transition text-center"
              >
                <FileText className="h-8 w-8 mx-auto mb-2 text-accent" />
                <h3 className="font-semibold text-foreground">Edit Pages</h3>
                <p className="text-sm text-foreground/70">Update content on your pages</p>
              </a>
              <a
                href="/admin/submissions"
                className="p-4 border border-border rounded-lg hover:bg-accent/10 transition text-center"
              >
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-accent" />
                <h3 className="font-semibold text-foreground">View Submissions</h3>
                <p className="text-sm text-foreground/70">Check investor inquiries</p>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/70">Activity logs will be displayed here as you make changes.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
