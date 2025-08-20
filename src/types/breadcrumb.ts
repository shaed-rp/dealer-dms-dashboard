import { LucideIcon } from 'lucide-react';
import { UserRole } from './dashboard';

export interface BreadcrumbItem {
  label: string;
  path: string;
  icon: LucideIcon;
  role?: UserRole;
}

export interface BreadcrumbConfig {
  path: string;
  breadcrumbs: BreadcrumbItem[];
  icon: LucideIcon;
}

// Icon mappings for different sections
export const BREADCRUMB_ICONS = {
  // Dashboard icons
  dashboard: 'Home' as const,
  generalManager: 'Settings' as const,
  salesManager: 'Car' as const,
  serviceManager: 'Wrench' as const,
  financeManager: 'DollarSign' as const,
  salesperson: 'Users' as const,
  serviceAdvisor: 'Calendar' as const,
  technician: 'Wrench' as const,
  partsCounter: 'Package' as const,
  accountant: 'Calculator' as const,
  
     // Sales section icons
   sales: 'Car' as const,
   deals: 'FileText' as const,
   prospects: 'Users' as const,
   inventory: 'Package' as const,
   appraisals: 'Calculator' as const,
  
     // Service section icons
   service: 'Wrench' as const,
   appointments: 'Calendar' as const,
   repairOrders: 'FileText' as const,
   estimates: 'Calculator' as const,
   parts: 'Package' as const,
  
  // Finance section icons
  finance: 'DollarSign' as const,
  accounting: 'Calculator' as const,
  reports: 'FileText' as const,
  payments: 'CreditCard' as const,
  
  // Other section icons
  customers: 'Users' as const,
  orders: 'ShoppingCart' as const,
  analytics: 'TrendingUp' as const,
} as const;

// Breadcrumb configurations for different paths
export const BREADCRUMB_CONFIGS: Record<string, BreadcrumbConfig> = {
  // Dashboard routes
  '/general-manager': {
    path: '/general-manager',
    breadcrumbs: [
      { label: 'Dashboard', path: '/', icon: 'Home' as any },
      { label: 'General Manager', path: '/general-manager', icon: 'Settings' as any }
    ],
    icon: 'Settings' as any
  },
  '/sales-manager': {
    path: '/sales-manager',
    breadcrumbs: [
      { label: 'Dashboard', path: '/', icon: 'Home' as any },
      { label: 'Sales Manager', path: '/sales-manager', icon: 'Car' as any }
    ],
    icon: 'Car' as any
  },
  '/service-manager': {
    path: '/service-manager',
    breadcrumbs: [
      { label: 'Dashboard', path: '/', icon: 'Home' as any },
      { label: 'Service Manager', path: '/service-manager', icon: 'Wrench' as any }
    ],
    icon: 'Wrench' as any
  },
  '/finance-manager': {
    path: '/finance-manager',
    breadcrumbs: [
      { label: 'Dashboard', path: '/', icon: 'Home' as any },
      { label: 'Finance Manager', path: '/finance-manager', icon: 'DollarSign' as any }
    ],
    icon: 'DollarSign' as any
  },
  
  // Sales routes
     '/sales/deals': {
     path: '/sales/deals',
     breadcrumbs: [
       { label: 'Dashboard', path: '/', icon: 'Home' as any },
       { label: 'Sales', path: '/sales', icon: 'Car' as any },
       { label: 'Deals', path: '/sales/deals', icon: 'FileText' as any }
     ],
     icon: 'FileText' as any
   },
  '/sales/prospects': {
    path: '/sales/prospects',
    breadcrumbs: [
      { label: 'Dashboard', path: '/', icon: 'Home' as any },
      { label: 'Sales', path: '/sales', icon: 'Car' as any },
      { label: 'Prospects', path: '/sales/prospects', icon: 'Users' as any }
    ],
    icon: 'Users' as any
  },
     '/sales/inventory': {
     path: '/sales/inventory',
     breadcrumbs: [
       { label: 'Dashboard', path: '/', icon: 'Home' as any },
       { label: 'Sales', path: '/sales', icon: 'Car' as any },
       { label: 'Inventory', path: '/sales/inventory', icon: 'Package' as any }
     ],
     icon: 'Package' as any
   },
  
  // Service routes
  '/service/appointments': {
    path: '/service/appointments',
    breadcrumbs: [
      { label: 'Dashboard', path: '/', icon: 'Home' as any },
      { label: 'Service', path: '/service', icon: 'Wrench' as any },
      { label: 'Appointments', path: '/service/appointments', icon: 'Calendar' as any }
    ],
    icon: 'Calendar' as any
  },
     '/service/repair-orders': {
     path: '/service/repair-orders',
     breadcrumbs: [
       { label: 'Dashboard', path: '/', icon: 'Home' as any },
       { label: 'Service', path: '/service', icon: 'Wrench' as any },
       { label: 'Repair Orders', path: '/service/repair-orders', icon: 'FileText' as any }
     ],
     icon: 'FileText' as any
   },
  
  // Finance routes
  '/finance/accounting': {
    path: '/finance/accounting',
    breadcrumbs: [
      { label: 'Dashboard', path: '/', icon: 'Home' as any },
      { label: 'Finance', path: '/finance', icon: 'DollarSign' as any },
      { label: 'Accounting', path: '/finance/accounting', icon: 'Calculator' as any }
    ],
    icon: 'Calculator' as any
  },
  '/finance/reports': {
    path: '/finance/reports',
    breadcrumbs: [
      { label: 'Dashboard', path: '/', icon: 'Home' as any },
      { label: 'Finance', path: '/finance', icon: 'DollarSign' as any },
      { label: 'Reports', path: '/finance/reports', icon: 'FileText' as any }
    ],
    icon: 'FileText' as any
  },
  
  // Other routes
  '/customers': {
    path: '/customers',
    breadcrumbs: [
      { label: 'Dashboard', path: '/', icon: 'Home' as any },
      { label: 'Customers', path: '/customers', icon: 'Users' as any }
    ],
    icon: 'Users' as any
  },
  '/analytics': {
    path: '/analytics',
    breadcrumbs: [
      { label: 'Dashboard', path: '/', icon: 'Home' as any },
      { label: 'Analytics', path: '/analytics', icon: 'TrendingUp' as any }
    ],
    icon: 'TrendingUp' as any
  }
};

// Helper function to get breadcrumb configuration for a path
export const getBreadcrumbConfig = (path: string): BreadcrumbConfig | null => {
  return BREADCRUMB_CONFIGS[path] || null;
};

// Helper function to generate breadcrumbs for any path
export const generateBreadcrumbs = (path: string): BreadcrumbItem[] => {
  const config = getBreadcrumbConfig(path);
  if (config) {
    return config.breadcrumbs;
  }
  
  // Fallback: generate breadcrumbs dynamically
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', path: '/', icon: 'Home' as any }
  ];
  
  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      label,
      path: currentPath,
      icon: 'Home' as any // Default icon, will be overridden by getIconForPath
    });
  });
  
  return breadcrumbs;
};
