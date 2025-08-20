import { DealsTable } from '@/components/tables/DealsTable';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { WidgetGrid, WidgetSection } from '@/components/widgets/WidgetGrid';
import { MockDataGenerator } from '@/data/mockData';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, Download, Filter } from 'lucide-react';

/**
 * DealsPage - Comprehensive deals management page
 * 
 * A dedicated page for viewing, filtering, and managing all deal transactions.
 * Features advanced filtering, sorting, and bulk operations for deal management.
 * 
 * @component
 * @example
 * ```tsx
 * <DealsPage />
 * ```
 * 
 * @returns {JSX.Element} Rendered deals page
 */
export function DealsPage() {
  const kpiData = MockDataGenerator.generateKPIData(UserRole.SALES_MANAGER);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deals Management</h1>
          <p className="text-muted-foreground">
            View and manage all deal transactions across the dealership
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Deal
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <WidgetSection>
        <WidgetGrid columns={4}>
          {kpiData.slice(0, 4).map((kpi) => (
            <KPIWidget
              key={kpi.id}
              data={kpi}
            />
          ))}
        </WidgetGrid>
      </WidgetSection>

      {/* Deals Table */}
      <DealsTable 
        title="All Deals"
        description="Complete list of all deal transactions"
        maxRows={50}
      />
    </div>
  );
}
