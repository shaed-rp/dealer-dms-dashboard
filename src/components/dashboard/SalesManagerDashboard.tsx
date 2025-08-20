
import { WidgetGrid, WidgetRow, WidgetSection } from '@/components/widgets/WidgetGrid';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { WidgetBase } from '@/components/widgets/WidgetBase';
import { SalesPerformanceChart } from '@/components/charts/SalesPerformanceChart';
import { DealsTable } from '@/components/tables/DealsTable';
import { MockDataGenerator } from '@/data/mockData';
import { UserRole } from '@/types';

import { Button } from '@/components/ui/button';
import { Plus, Eye, Edit } from 'lucide-react';

/**
 * SalesManagerDashboard - Sales management dashboard for sales managers
 * 
 * A comprehensive sales management dashboard that provides team performance
 * metrics, deal pipeline analysis, individual salesperson tracking, and
 * inventory management tools. Designed for sales team oversight and
 * performance optimization.
 * 
 * @component
 * @example
 * ```tsx
 * <SalesManagerDashboard />
 * ```
 * 
 * @returns {JSX.Element} Rendered sales manager dashboard
 */
export function SalesManagerDashboard() {
  const kpiData = MockDataGenerator.generateKPIData(UserRole.SALES_MANAGER);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Sales Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor sales performance, team productivity, and deal pipeline
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Prospect
        </Button>
      </div>

      {/* KPI Section */}
      <WidgetSection title="Sales Metrics">
        <WidgetGrid columns={4}>
          {kpiData.map((kpi) => (
            <KPIWidget key={kpi.id} data={kpi} />
          ))}
        </WidgetGrid>
      </WidgetSection>

      {/* Sales Analytics */}
      <WidgetSection title="Performance Analytics">
        <WidgetRow>
          <SalesPerformanceChart />
        </WidgetRow>
      </WidgetSection>

      {/* Recent Activity */}
      <WidgetSection title="Recent Deals">
        <DealsTable maxRows={8} />
      </WidgetSection>

      {/* Inventory and Actions */}
      <WidgetSection title="Inventory & Actions">
        <WidgetGrid columns={3}>
          <WidgetBase 
            title="Hot Inventory" 
            description="Fast-moving vehicles"
          >
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium">2024 Honda Civic</p>
                <p className="text-sm text-muted-foreground">3 inquiries this week</p>
                <p className="text-sm font-medium text-green-600">$28,500</p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium">2023 Toyota RAV4</p>
                <p className="text-sm text-muted-foreground">5 inquiries this week</p>
                <p className="text-sm font-medium text-green-600">$32,900</p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium">2024 Ford F-150</p>
                <p className="text-sm text-muted-foreground">2 inquiries this week</p>
                <p className="text-sm font-medium text-green-600">$45,200</p>
              </div>
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Aging Inventory" 
            description="Vehicles needing attention"
          >
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="font-medium">2023 BMW X3</p>
                <p className="text-sm text-muted-foreground">85 days on lot</p>
                <p className="text-sm font-medium text-yellow-600">$48,900</p>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-medium">2022 Mercedes C-Class</p>
                <p className="text-sm text-muted-foreground">120 days on lot</p>
                <p className="text-sm font-medium text-red-600">$42,500</p>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-medium">2023 Audi A4</p>
                <p className="text-sm text-muted-foreground">95 days on lot</p>
                <p className="text-sm font-medium text-red-600">$39,800</p>
              </div>
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Quick Actions" 
            description="Common sales tasks"
          >
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Add New Prospect
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="mr-2 h-4 w-4" />
                Review Pending Deals
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Edit className="mr-2 h-4 w-4" />
                Update Inventory Pricing
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Generate Sales Report
              </Button>
            </div>
          </WidgetBase>
        </WidgetGrid>
      </WidgetSection>
    </div>
  );
}

