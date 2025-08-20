import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import { 
  LayoutDashboard, 
  Car, 
  Wrench, 
  Calculator, 
  Users, 
  FileText, 
  Settings,
  TrendingUp,
  Package,
  Calendar,
  CreditCard,
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { UserRole, NavigationItem } from '@/types';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  currentRole: UserRole;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/',
    roles: Object.values(UserRole)
  },
  {
    id: 'sales',
    label: 'Sales',
    icon: 'Car',
    children: [
      { id: 'deals', label: 'Deals', icon: 'FileText', path: '/sales/deals' },
      { id: 'prospects', label: 'Prospects', icon: 'Users', path: '/sales/prospects' },
      { id: 'inventory', label: 'Inventory', icon: 'Package', path: '/sales/inventory' },
      { id: 'appraisals', label: 'Appraisals', icon: 'Calculator', path: '/sales/appraisals' }
    ],
    roles: [UserRole.GENERAL_MANAGER, UserRole.SALES_MANAGER, UserRole.SALESPERSON, UserRole.FINANCE_MANAGER]
  },
  {
    id: 'service',
    label: 'Service',
    icon: 'Wrench',
    children: [
      { id: 'appointments', label: 'Appointments', icon: 'Calendar', path: '/service/appointments' },
      { id: 'repair-orders', label: 'Repair Orders', icon: 'FileText', path: '/service/repair-orders' },
      { id: 'estimates', label: 'Estimates', icon: 'Calculator', path: '/service/estimates' },
      { id: 'parts', label: 'Parts', icon: 'Package', path: '/service/parts' }
    ],
    roles: [UserRole.GENERAL_MANAGER, UserRole.SERVICE_MANAGER, UserRole.SERVICE_ADVISOR, UserRole.TECHNICIAN, UserRole.PARTS_COUNTER]
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: 'CreditCard',
    children: [
      { id: 'accounting', label: 'Accounting', icon: 'Calculator', path: '/finance/accounting' },
      { id: 'reports', label: 'Reports', icon: 'BarChart3', path: '/finance/reports' },
      { id: 'payments', label: 'Payments', icon: 'CreditCard', path: '/finance/payments' }
    ],
    roles: [UserRole.GENERAL_MANAGER, UserRole.FINANCE_MANAGER, UserRole.ACCOUNTANT]
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: 'Users',
    path: '/customers',
    roles: Object.values(UserRole)
  },
  {
    id: 'orders',
    label: 'Order Management',
    icon: 'Package',
    path: '/orders',
    roles: [UserRole.GENERAL_MANAGER, UserRole.SALES_MANAGER, UserRole.SERVICE_MANAGER, UserRole.FINANCE_MANAGER, UserRole.SALESPERSON, UserRole.SERVICE_ADVISOR, UserRole.PARTS_COUNTER]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'TrendingUp',
    path: '/analytics',
    roles: [UserRole.GENERAL_MANAGER, UserRole.SALES_MANAGER, UserRole.SERVICE_MANAGER]
  }
];

const iconMap = {
  LayoutDashboard,
  Car,
  Wrench,
  Calculator,
  Users,
  FileText,
  Settings,
  TrendingUp,
  Package,
  Calendar,
  CreditCard,
  BarChart3
};

/**
 * Sidebar - Main navigation sidebar with role-based menu items
 * 
 * A responsive sidebar component that provides navigation based on user roles.
 * Features collapsible functionality, expandable menu sections, and role-based
 * access control. The sidebar automatically filters navigation items based on
 * the current user's role and permissions.
 * 
 * @component
 * @example
 * ```tsx
 * <Sidebar 
 *   collapsed={false}
 *   onToggle={() => setCollapsed(!collapsed)}
 *   currentRole={UserRole.GENERAL_MANAGER}
 * />
 * ```
 * 
 * @param {SidebarProps} props - Component props
 * @param {boolean} props.collapsed - Whether the sidebar is collapsed
 * @param {() => void} props.onToggle - Callback to toggle sidebar collapse state
 * @param {UserRole} props.currentRole - Current user role for filtering navigation
 * 
 * @returns {JSX.Element} Rendered sidebar component
 */
export function Sidebar({ collapsed, onToggle, currentRole }: SidebarProps) {
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['sales', 'service']);
  const location = useLocation();

  // Auto-expand parent items when a child route is active
  React.useEffect(() => {
    const newExpandedItems = new Set(expandedItems);
    
    navigationItems.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => 
          child.path && location.pathname === child.path
        );
        if (hasActiveChild) {
          newExpandedItems.add(item.id);
        }
      }
    });
    
    if (newExpandedItems.size !== expandedItems.length) {
      setExpandedItems(Array.from(newExpandedItems));
    }
  }, [location.pathname, expandedItems]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredNavigation = navigationItems.filter(item => 
    !item.roles || item.roles.includes(currentRole)
  );

  const renderNavItem = (item: NavigationItem, level = 0) => {
    const Icon = iconMap[item.icon as keyof typeof iconMap];
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const filteredChildren = item.children?.filter(child => 
      !child.roles || child.roles.includes(currentRole)
    );
    
    // Check if current item or any of its children are active
    const isActive = item.path && location.pathname === item.path;
    const hasActiveChild = filteredChildren?.some(child => 
      child.path && location.pathname === child.path
    );
    const isActiveOrHasActiveChild = isActive || hasActiveChild;

    if (hasChildren) {
      return (
        <div key={item.id}>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-10 px-3 sidebar-icon-transition hover:bg-accent hover:text-accent-foreground",
              level > 0 && "ml-4 w-[calc(100%-1rem)]",
              collapsed && level === 0 && "px-2 justify-center",
              isActiveOrHasActiveChild && "bg-secondary text-secondary-foreground"
            )}
            onClick={() => toggleExpanded(item.id)}
          >
            {Icon && (
              <Icon className={cn(
                "h-4 w-4 sidebar-icon-transition",
                !collapsed && "mr-2",
                collapsed && level === 0 && "mx-auto"
              )} />
            )}
            {!collapsed && (
              <>
                <span className="flex-1 text-left font-medium text-fade-in">{item.label}</span>
                <ChevronRight className={cn(
                  "h-4 w-4 sidebar-icon-transition",
                  isExpanded && "rotate-90"
                )} />
              </>
            )}
          </Button>
          
          {isExpanded && !collapsed && filteredChildren && (
            <div className="mt-1 space-y-1 animate-in slide-in-from-left-2 duration-200">
              {filteredChildren.map(child => {
                const childIcon = iconMap[child.icon as keyof typeof iconMap];
                const childIsActive = child.path && location.pathname === child.path;
                
                return (
                  <div key={child.id}>
                    <Link to={child.path || '#'}>
                      <Button
                        variant={childIsActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start h-10 px-3 sidebar-icon-transition hover:bg-accent hover:text-accent-foreground",
                          level > 0 && "ml-4 w-[calc(100%-1rem)]",
                          collapsed && level === 0 && "px-2 justify-center",
                          childIsActive && "bg-secondary text-secondary-foreground shadow-sm"
                        )}
                      >
                        {childIcon && React.createElement(childIcon, {
                          className: cn(
                            "h-4 w-4 sidebar-icon-transition",
                            !collapsed && "mr-2",
                            collapsed && level === 0 && "mx-auto"
                          )
                        })}
                        {!collapsed && (
                          <>
                            <span className="flex-1 text-left font-medium text-fade-in">{child.label}</span>
                            {child.badge && (
                              <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                                {child.badge}
                              </span>
                            )}
                          </>
                        )}
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={item.id}>
        <Link to={item.path || '#'}>
          <Button
            variant={isActive ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start h-10 px-3 sidebar-icon-transition hover:bg-accent hover:text-accent-foreground",
              level > 0 && "ml-4 w-[calc(100%-1rem)]",
              collapsed && level === 0 && "px-2 justify-center",
              isActive && "bg-secondary text-secondary-foreground shadow-sm"
            )}
          >
            {Icon && (
              <Icon className={cn(
                "h-4 w-4 sidebar-icon-transition",
                !collapsed && "mr-2",
                collapsed && level === 0 && "mx-auto"
              )} />
            )}
            {!collapsed && (
              <>
                <span className="flex-1 text-left font-medium text-fade-in">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Toggle Button - Always visible and clickable */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className={cn(
          "sidebar-toggle-hover sidebar-content-transition z-50",
          collapsed 
            ? "absolute -right-3 top-6 h-6 w-6 rounded-full border bg-background shadow-sm hover:shadow-md" 
            : "absolute -right-3 top-6 h-6 w-6 rounded-full border bg-background shadow-sm hover:shadow-md"
        )}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* Sidebar Container */}
      <div className={cn(
        "bg-sidebar border-r border-sidebar-border sidebar-collapse-transition flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}>
        {/* Header with Logo */}
        <div className="flex h-16 items-center px-4 border-b border-sidebar-border">
          <div className={cn(
            "flex items-center sidebar-content-transition",
            collapsed ? "justify-center w-full" : "space-x-2"
          )}>
            <img 
              src="/logo-pni.png" 
              alt="Pritchard Companies Logo" 
              className={cn(
                "object-contain logo-scale sidebar-content-transition",
                collapsed ? "h-8 w-8" : "h-6 w-6"
              )}
            />
            {!collapsed && (
              <span className="font-semibold text-sidebar-foreground text-fade-in">
                Pritchard Companies
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {filteredNavigation.map(item => renderNavItem(item))}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-10 sidebar-icon-transition hover:bg-accent hover:text-accent-foreground",
              collapsed && "px-2 justify-center"
            )}
          >
            <Settings className={cn(
              "h-4 w-4 sidebar-icon-transition",
              !collapsed && "mr-2",
              collapsed && "mx-auto"
            )} />
            {!collapsed && <span className="font-medium text-fade-in">Settings</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}

