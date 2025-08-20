import { InventoryTable } from '@/components/tables/InventoryTable';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { WidgetGrid, WidgetSection } from '@/components/widgets/WidgetGrid';
import { mockVehicles } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, Download, Filter } from 'lucide-react';

/**
 * InventoryPage - Vehicle inventory management page
 * 
 * A dedicated page for viewing, filtering, and managing vehicle inventory.
 * Features inventory health monitoring, age analysis, and stock management.
 * 
 * @component
 * @example
 * ```tsx
 * <InventoryPage />
 * ```
 * 
 * @returns {JSX.Element} Rendered inventory page
 */
export function InventoryPage() {
  // Generate inventory-specific KPIs
  const inventoryKPIs = [
    {
      id: 'total-vehicles',
      title: 'Total Vehicles',
      value: mockVehicles.length,
      previousValue: mockVehicles.length - 8,
      change: 8,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'Car',
      color: 'green'
    },
    {
      id: 'new-vehicles',
      title: 'New Vehicles',
      value: mockVehicles.filter(v => v.IsNew).length,
      previousValue: mockVehicles.filter(v => v.IsNew).length - 3,
      change: 3,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'Package',
      color: 'blue'
    },
    {
      id: 'avg-days-on-lot',
      title: 'Avg Days on Lot',
      value: Math.round(mockVehicles.reduce((sum, v) => sum + (v.DaysOnLot || 0), 0) / mockVehicles.length),
      previousValue: Math.round(mockVehicles.reduce((sum, v) => sum + (v.DaysOnLot || 0), 0) / mockVehicles.length) + 2,
      change: -2,
      changeType: 'decrease' as const,
      format: 'number' as const,
      icon: 'TrendingUp',
      color: 'green'
    },
    {
      id: 'aging-inventory',
      title: 'Aging Inventory',
      value: mockVehicles.filter(v => (v.DaysOnLot || 0) > 60).length,
      previousValue: mockVehicles.filter(v => (v.DaysOnLot || 0) > 60).length + 1,
      change: -1,
      changeType: 'decrease' as const,
      format: 'number' as const,
      icon: 'AlertTriangle',
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">
            View and manage vehicle inventory across all locations
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
            Add Vehicle
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <WidgetSection>
        <WidgetGrid columns={4}>
          {inventoryKPIs.map((kpi) => (
            <KPIWidget
              key={kpi.id}
              data={kpi}
            />
          ))}
        </WidgetGrid>
      </WidgetSection>

      {/* Inventory Table */}
      <InventoryTable 
        title="Vehicle Inventory"
        description="Complete inventory of all vehicles"
        maxRows={50}
      />
    </div>
  );
}
