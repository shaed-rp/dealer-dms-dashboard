import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbDebug } from '@/components/debug/BreadcrumbDebug';

/**
 * BreadcrumbTest - Test component to verify breadcrumb icon functionality
 * 
 * This component provides a way to test and verify that breadcrumb icons
 * are working correctly across different routes and user roles.
 * 
 * @component
 * @example
 * ```tsx
 * <BreadcrumbTest />
 * ```
 * 
 * @returns {JSX.Element} Rendered test component
 */
export function BreadcrumbTest() {
    const testRoutes = [
    // Dashboard routes
    { path: '/finance-manager', label: 'Finance Manager Dashboard', description: 'Should show Home > Finance Manager with DollarSign icon' },
    { path: '/sales-manager', label: 'Sales Manager Dashboard', description: 'Should show Home > Sales Manager with Car icon' },
    { path: '/service-manager', label: 'Service Manager Dashboard', description: 'Should show Home > Service Manager with Wrench icon' },
    { path: '/parts-counter', label: 'Parts Counter Dashboard', description: 'Should show Home > Parts Counter with Package icon' },
    { path: '/accountant', label: 'Accountant Dashboard', description: 'Should show Home > Accountant with Calculator icon' },
    
    // Sales routes
    { path: '/sales/deals', label: 'Sales Deals', description: 'Should show Home > Sales (Car) > Deals (FileText)' },
    { path: '/sales/prospects', label: 'Sales Prospects', description: 'Should show Home > Sales (Car) > Prospects (Users)' },
    { path: '/sales/inventory', label: 'Sales Inventory', description: 'Should show Home > Sales (Car) > Inventory (Package)' },
    { path: '/sales/appraisals', label: 'Sales Appraisals', description: 'Should show Home > Sales (Car) > Appraisals (Calculator)' },
    
    // Service routes
    { path: '/service/appointments', label: 'Service Appointments', description: 'Should show Home > Service (Wrench) > Appointments (Calendar)' },
    { path: '/service/repair-orders', label: 'Service Repair Orders', description: 'Should show Home > Service (Wrench) > Repair Orders (FileText)' },
    { path: '/service/estimates', label: 'Service Estimates', description: 'Should show Home > Service (Wrench) > Estimates (Calculator)' },
    { path: '/service/parts', label: 'Service Parts', description: 'Should show Home > Service (Wrench) > Parts (Package)' },
    
    // Finance routes
    { path: '/finance/accounting', label: 'Finance Accounting', description: 'Should show Home > Finance (DollarSign) > Accounting (Calculator)' },
    { path: '/finance/reports', label: 'Finance Reports', description: 'Should show Home > Finance (DollarSign) > Reports (FileText)' },
    { path: '/finance/payments', label: 'Finance Payments', description: 'Should show Home > Finance (DollarSign) > Payments (CreditCard)' },
    
    // Other routes
    { path: '/customers', label: 'Customers', description: 'Should show Home > Customers with Users icon' },
    { path: '/analytics', label: 'Analytics', description: 'Should show Home > Analytics with TrendingUp icon' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Breadcrumb Icon Test</h1>
        <p className="text-muted-foreground">
          Test the breadcrumb icon functionality by navigating to different routes.
          Each route should display appropriate contextual icons in the breadcrumb navigation.
        </p>
      </div>

      <BreadcrumbDebug />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testRoutes.map((route) => (
          <Card key={route.path} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{route.label}</CardTitle>
              <CardDescription className="text-sm">
                {route.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to={route.path}>
                <Button className="w-full">
                  Navigate to {route.label}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Expected Icon Mappings</CardTitle>
          <CardDescription>
            Here are the expected icons for different sections and roles:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Dashboard Roles</h4>
              <ul className="space-y-1">
                <li>• General Manager → Settings</li>
                <li>• Sales Manager → Car</li>
                <li>• Service Manager → Wrench</li>
                <li>• Finance Manager → DollarSign</li>
                <li>• Parts Counter → Package</li>
                <li>• Accountant → Calculator</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Sales Section</h4>
              <ul className="space-y-1">
                               <li>• Sales → Car</li>
               <li>• Deals → FileText</li>
               <li>• Prospects → Users</li>
               <li>• Inventory → Package</li>
               <li>• Appraisals → Calculator</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Service Section</h4>
              <ul className="space-y-1">
                               <li>• Service → Wrench</li>
               <li>• Appointments → Calendar</li>
               <li>• Repair Orders → FileText</li>
               <li>• Estimates → Calculator</li>
               <li>• Parts → Package</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Finance Section</h4>
              <ul className="space-y-1">
                <li>• Finance → DollarSign</li>
                <li>• Accounting → Calculator</li>
                <li>• Reports → FileText</li>
                <li>• Payments → CreditCard</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
