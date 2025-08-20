import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Breadcrumb - Navigation breadcrumb component
 * 
 * A breadcrumb component that shows the current navigation path and allows
 * users to navigate back to parent pages easily.
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
        icon: Home
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  // Don't show breadcrumb on dashboard
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
              <span className="font-medium text-foreground">
                {Icon && <Icon className="h-4 w-4 inline mr-1" />}
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
