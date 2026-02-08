/**
 * Admin Dashboard Layout
 * Main layout with sidebar navigation for admin panel
 */

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Button } from '../ui/button';
import { Menu, X, LogOut, Home, FileText, Briefcase, Users, Settings, MessageSquare, Eye } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { label: 'Pages', href: '/admin/pages', icon: FileText },
  { label: 'Opportunities', href: '/admin/opportunities', icon: Briefcase },
  { label: 'Partners', href: '/admin/partners', icon: Users },
  { label: 'Submissions', href: '/admin/submissions', icon: MessageSquare },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`bg-sidebar text-sidebar-foreground transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } border-r border-sidebar-border flex flex-col`}
      >
        {/* Logo/Brand */}
        <div className="p-4 border-b border-sidebar-border">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 font-heading text-xl font-bold text-primary hover:text-primary/80 transition"
          >
            {sidebarOpen && 'Admin Panel'}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'hover:bg-sidebar-accent/50'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-sidebar-border space-y-3">
          {sidebarOpen && (
            <div className="text-sm">
              <p className="text-sidebar-foreground/80">Logged in as:</p>
              <p className="font-medium truncate">{user?.email}</p>
              <p className="text-xs text-sidebar-foreground/60 capitalize">{user?.role}</p>
            </div>
          )}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full"
          >
            <LogOut size={16} />
            {sidebarOpen && 'Logout'}
          </Button>
        </div>

        {/* Toggle Button */}
        <div className="p-2 border-t border-sidebar-border">
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            variant="ghost"
            size="sm"
            className="w-full"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-card border-b border-border h-16 flex items-center px-6">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl font-heading font-bold text-foreground">Admin Dashboard</h1>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition"
            >
              <Eye size={16} />
              View Site
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
    </>
  );
}
