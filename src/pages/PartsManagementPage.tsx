import { useState } from 'react';
import { WidgetBase } from '@/components/widgets/WidgetBase';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { WidgetGrid, WidgetSection } from '@/components/widgets/WidgetGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Download, Filter, Search, MoreHorizontal, ArrowUpDown } from 'lucide-react';

/**
 * PartsManagementPage - Parts inventory management page
 * 
 * A dedicated page for viewing, filtering, and managing parts inventory and ordering.
 * Features stock levels, reorder points, and parts tracking.
 * 
 * @component
 * @example
 * ```tsx
 * <PartsManagementPage />
 * ```
 * 
 * @returns {JSX.Element} Rendered parts management page
 */
export function PartsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('partNumber');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Generate parts-specific KPIs
  const partsKPIs = [
    {
      id: 'total-parts',
      title: 'Total Parts',
      value: 1247,
      previousValue: 1189,
      change: 58,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'Package',
      color: 'green'
    },
    {
      id: 'total-value',
      title: 'Total Inventory Value',
      value: 450000,
      previousValue: 425000,
      change: 25000,
      changeType: 'increase' as const,
      format: 'currency' as const,
      icon: 'DollarSign',
      color: 'blue'
    },
    {
      id: 'low-stock-items',
      title: 'Low Stock Items',
      value: 23,
      previousValue: 18,
      change: 5,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'AlertTriangle',
      color: 'orange'
    },
    {
      id: 'out-of-stock',
      title: 'Out of Stock',
      value: 7,
      previousValue: 5,
      change: 2,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'AlertTriangle',
      color: 'red'
    }
  ];

  // Mock parts data
  const mockParts = Array.from({ length: 20 }, (_, i) => ({
    id: `PART${String(i + 1).padStart(6, '0')}`,
    partNumber: `P${String(i + 1).padStart(5, '0')}`,
    description: [
      'Oil Filter',
      'Brake Pads',
      'Air Filter',
      'Spark Plugs',
      'Battery',
      'Tire',
      'Windshield Wiper',
      'Headlight Bulb',
      'Fuel Filter',
      'Transmission Fluid',
      'Coolant',
      'Power Steering Fluid',
      'Clutch Kit',
      'Alternator',
      'Starter Motor',
      'Radiator',
      'Water Pump',
      'Timing Belt',
      'Shock Absorber',
      'Muffler'
    ][i % 20],
    category: ['Engine', 'Brakes', 'Electrical', 'Suspension', 'Exhaust'][Math.floor(Math.random() * 5)],
    manufacturer: ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes'][Math.floor(Math.random() * 7)],
    currentStock: Math.floor(Math.random() * 100) + 1,
    minStock: Math.floor(Math.random() * 20) + 5,
    maxStock: Math.floor(Math.random() * 200) + 100,
    unitCost: Math.floor(Math.random() * 200) + 10,
    unitPrice: 0, // Will be calculated
    location: `A${Math.floor(Math.random() * 10) + 1}-${Math.floor(Math.random() * 10) + 1}`,
    supplier: `Supplier ${Math.floor(Math.random() * 5) + 1}`,
    lastOrderDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    status: ['In Stock', 'Low Stock', 'Out of Stock', 'On Order'][Math.floor(Math.random() * 4)]
  })).map(part => ({
    ...part,
    unitPrice: part.unitCost * (1.3 + Math.random() * 0.4) // 30-70% markup
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'On Order': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatus = (current: number, min: number) => {
    if (current === 0) return 'Out of Stock';
    if (current <= min) return 'Low Stock';
    return 'In Stock';
  };

  const filteredParts = mockParts
    .filter(part => 
      part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(part => categoryFilter === 'all' || part.category === categoryFilter)
    .sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Parts Management</h1>
          <p className="text-muted-foreground">
            Manage parts inventory and ordering
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
            Add Part
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <WidgetSection>
        <WidgetGrid columns={4}>
          {partsKPIs.map((kpi) => (
            <KPIWidget
              key={kpi.id}
              data={kpi}
            />
          ))}
        </WidgetGrid>
      </WidgetSection>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search parts..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Category: {categoryFilter === 'all' ? 'All' : categoryFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setCategoryFilter('all')}>
              All Categories
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('Engine')}>
              Engine
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('Brakes')}>
              Brakes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('Electrical')}>
              Electrical
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('Suspension')}>
              Suspension
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('Exhaust')}>
              Exhaust
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Parts Table */}
      <WidgetBase
        title="Parts Inventory"
        description="Complete list of all parts in inventory"
      >
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('partNumber');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Part Number
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('currentStock');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Current Stock
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Min Stock</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('unitCost');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Unit Cost
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParts.map((part) => (
                <TableRow key={part.id}>
                  <TableCell className="font-mono font-medium">
                    {part.partNumber}
                  </TableCell>
                  <TableCell className="font-medium">
                    {part.description}
                  </TableCell>
                  <TableCell>{part.category}</TableCell>
                  <TableCell>{part.manufacturer}</TableCell>
                  <TableCell className={part.currentStock <= part.minStock ? 'text-red-600 font-medium' : ''}>
                    {part.currentStock}
                  </TableCell>
                  <TableCell>{part.minStock}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {part.location}
                  </TableCell>
                  <TableCell>${part.unitCost.toFixed(2)}</TableCell>
                  <TableCell>${part.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(getStockStatus(part.currentStock, part.minStock))}>
                      {getStockStatus(part.currentStock, part.minStock)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Part</DropdownMenuItem>
                        <DropdownMenuItem>Adjust Stock</DropdownMenuItem>
                        <DropdownMenuItem>Place Order</DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </WidgetBase>
    </div>
  );
}
