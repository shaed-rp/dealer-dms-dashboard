import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Breadcrumb } from './Breadcrumb';
import { UserRole } from '@/types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

/**
 * DashboardLayout - Main layout wrapper for all dashboard views
 * 
 * A comprehensive layout component that provides the main application structure
 * including the sidebar navigation, header with controls, and main content area.
 * This component manages the overall layout state and provides responsive design
 * for different screen sizes.
 * 
 * @component
 * @example
 * ```tsx
 * <DashboardLayout 
 *   currentRole={UserRole.GENERAL_MANAGER}
 *   onRoleChange={(role) => setCurrentRole(role)}
 * >
 *   <GeneralManagerDashboard />
 * </DashboardLayout>
 * ```
 * 
 * @param {DashboardLayoutProps} props - Component props
 * @param {React.ReactNode} props.children - Dashboard content to render
 * @param {UserRole} props.currentRole - Currently selected user role
 * @param {(role: UserRole) => void} props.onRoleChange - Callback when role is changed
 * 
 * @returns {JSX.Element} Rendered dashboard layout
 */
export function DashboardLayout({ children, currentRole, onRoleChange }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentRole={currentRole}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          currentRole={currentRole}
          onRoleChange={onRoleChange}
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 overflow-auto bg-muted/30 p-6">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

