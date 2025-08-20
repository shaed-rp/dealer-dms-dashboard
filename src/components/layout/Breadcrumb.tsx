import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronRight, 
  Home, 
  Car, 
  Wrench, 
  DollarSign, 
  Users, 
  FileText, 
  Settings,
  BarChart3,
  Package,
  Calculator,
  CreditCard,
  Calendar,
  ClipboardList,
  ShoppingCart,
  TrendingUp,
  LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

/**
 * Breadcrumb - Navigation breadcrumb component
 * 
 * A breadcrumb component that shows the current navigation path and allows
 * users to navigate back to parent pages easily. Now includes contextual
 * icons based on the current path and user role.
 * 
 * @component
 * @example
 * ```tsx
 * <Breadcrumb />
 * ```
 * 
 * @returns {JSX.Element} Rendered breadcrumb component
 */
export function Breadcrumb() {
  const location = useLocation();
  
  // Icon mapping for different sections and roles
  const getIconForPath = (path: string, segment: string): LucideIcon => {
    // Role-based dashboard icons
    if (segment === 'general-manager') return Settings;
    if (segment === 'sales-manager') return Car;
    if (segment === 'service-manager') return Wrench;
    if (segment === 'finance-manager') return DollarSign;
    if (segment === 'salesperson') return Users;
    if (segment === 'service-advisor') return Calendar;
    if (segment === 'technician') return Wrench;
    if (segment === 'parts-counter') return Package;
    if (segment === 'accountant') return Calculator;
    
    // Section-based icons - check for both /section/ and /section paths
    if (path.includes('/sales/') || path === '/sales') {
      if (segment === 'sales') return Car; // Handle the 'sales' segment specifically
      if (segment === 'deals') return FileText; // Changed from CreditCard to FileText to match sidebar
      if (segment === 'prospects') return Users;
      if (segment === 'inventory') return Package; // Changed from Car to Package to match sidebar
      if (segment === 'appraisals') return Calculator; // Changed from ClipboardList to Calculator to match sidebar
      return Car; // Default sales icon
    }
    
    if (path.includes('/service/') || path === '/service') {
      if (segment === 'service') return Wrench; // Handle the 'service' segment specifically
      if (segment === 'appointments') return Calendar;
      if (segment === 'repair-orders') return FileText; // Changed from Wrench to FileText to match sidebar
      if (segment === 'estimates') return Calculator; // Changed from FileText to Calculator to match sidebar
      if (segment === 'parts') return Package;
      return Wrench; // Default service icon
    }
    
    if (path.includes('/finance/') || path === '/finance') {
      if (segment === 'finance') return DollarSign; // Handle the 'finance' segment specifically
      if (segment === 'accounting') return Calculator;
      if (segment === 'reports') return FileText;
      if (segment === 'payments') return CreditCard;
      return DollarSign; // Default finance icon
    }
    
    // Handle standalone sections
    if (segment === 'customers') return Users;
    if (segment === 'orders') return ShoppingCart;
    if (segment === 'analytics') return TrendingUp;
    
    // Default icon for unknown segments
    return Home;
  };
  
  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Dashboard', path: '/', icon: Home }
    ];
    
    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      
      // Convert segment to readable label
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        label,
        path: currentPath,
        icon: getIconForPath(currentPath, segment)
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  // Don't show breadcrumb on main dashboard
  if (location.pathname === '/' || location.pathname === '/general-manager') {
    return null;
  }
  
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const Icon = breadcrumb.icon;
        
        return (
          <React.Fragment key={breadcrumb.path}>
            {index > 0 && (
              <ChevronRight className="h-4 w-4" />
            )}
            {isLast ? (
              <span className="font-medium text-foreground flex items-center">
                {Icon && <Icon className="h-4 w-4 mr-1" />}
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                to={breadcrumb.path}
                className={cn(
                  "hover:text-foreground transition-colors flex items-center"
                )}
              >
                {Icon && <Icon className="h-4 w-4 mr-1" />}
                {breadcrumb.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
