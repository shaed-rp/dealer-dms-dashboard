import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Home, 
  Car, 
  Wrench, 
  DollarSign, 
  Users, 
  FileText, 
  Settings,
  Package,
  Calculator,
  CreditCard,
  Calendar,
  ShoppingCart,
  TrendingUp,
  LucideIcon
} from 'lucide-react';

/**
 * BreadcrumbDebug - Debug component to understand breadcrumb generation
 */
export function BreadcrumbDebug() {
  const location = useLocation();
  
  // Same logic as the actual breadcrumb component
  const getIconForPath = (path: string, segment: string): LucideIcon => {
    console.log(`Debug - Path: "${path}", Segment: "${segment}"`);
    
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
      console.log(`Debug - Sales section detected for path: "${path}"`);
      if (segment === 'sales') return Car;
      if (segment === 'deals') return FileText;
      if (segment === 'prospects') return Users;
      if (segment === 'inventory') return Package;
      if (segment === 'appraisals') return Calculator;
      return Car;
    }
    
    if (path.includes('/service/') || path === '/service') {
      console.log(`Debug - Service section detected for path: "${path}"`);
      if (segment === 'service') return Wrench;
      if (segment === 'appointments') return Calendar;
      if (segment === 'repair-orders') return FileText;
      if (segment === 'estimates') return Calculator;
      if (segment === 'parts') return Package;
      return Wrench;
    }
    
    if (path.includes('/finance/') || path === '/finance') {
      console.log(`Debug - Finance section detected for path: "${path}"`);
      if (segment === 'finance') return DollarSign;
      if (segment === 'accounting') return Calculator;
      if (segment === 'reports') return FileText;
      if (segment === 'payments') return CreditCard;
      return DollarSign;
    }
    
    // Handle standalone sections
    if (segment === 'customers') return Users;
    if (segment === 'orders') return ShoppingCart;
    if (segment === 'analytics') return TrendingUp;
    
    console.log(`Debug - Using default Home icon for segment: "${segment}"`);
    return Home;
  };
  
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    console.log(`Debug - Path segments:`, pathSegments);
    
    const breadcrumbs = [
      { label: 'Dashboard', path: '/', icon: Home }
    ];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      console.log(`Debug - Processing segment ${index}: "${segment}", currentPath: "${currentPath}"`);
      
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      const icon = getIconForPath(currentPath, segment);
      console.log(`Debug - Icon selected for "${segment}":`, icon.name);
      
      breadcrumbs.push({
        label,
        path: currentPath,
        icon
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 mb-4">
      <h3 className="font-bold mb-2">Breadcrumb Debug Info</h3>
      <p><strong>Current Path:</strong> {location.pathname}</p>
      <p><strong>Generated Breadcrumbs:</strong></p>
      <ul className="list-disc ml-4">
        {breadcrumbs.map((breadcrumb, index) => {
          const Icon = breadcrumb.icon;
          return (
            <li key={index} className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span>{breadcrumb.label} ({breadcrumb.path}) - {breadcrumb.icon.name}</span>
            </li>
          );
        })}
      </ul>
      <p className="text-sm text-gray-600 mt-2">Check browser console for detailed logs</p>
    </div>
  );
}
