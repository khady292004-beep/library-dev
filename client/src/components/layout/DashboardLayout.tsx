import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { BookOpen, LayoutDashboard, BookMarked, Clock, User, LogOut, Menu, X, Moon, Sun, Sparkles, Bot } from 'lucide-react';
import clsx from 'clsx';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useAuth } from '@/hooks/useAuth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/catalogue', icon: BookOpen, label: 'Catalogue' },
  { href: '/emprunts', icon: BookMarked, label: 'Mes emprunts' },
  { href: '/historique', icon: Clock, label: 'Historique' },
  { href: '/recommandations', icon: Sparkles, label: 'Recommandations' },
  { href: '/bibliai', icon: Bot, label: 'BibliAI' },
  { href: '/profil', icon: User, label: 'Profil' },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [location, setLocation] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed left-0 top-0 h-screen w-64 bg-card border-r border-border transition-transform duration-300 z-40',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <Link href="/dashboard">
            <a className="flex items-center gap-2 font-bold text-lg text-primary">
              <BookOpen className="w-6 h-6" />
              <span>BiblioTech</span>
            </a>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a
                  className={clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-6 border-t border-border space-y-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-all duration-200"
          >
            {isDark ? (
              <>
                <Sun className="w-5 h-5" />
                <span className="font-medium">Mode clair</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5" />
                <span className="font-medium">Mode sombre</span>
              </>
            )}
          </button>

          {/* User Info */}
          {user && (
            <div className="px-4 py-3 bg-muted rounded-lg">
              <p className="text-sm font-semibold text-foreground">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex-1" />

            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-muted rounded-lg transition-colors hidden md:block"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
