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
 * RepairOrdersPage - Service repair orders management page
 * 
 * A dedicated page for viewing, filtering, and managing service repair orders.
 * Features work tracking, technician assignment, and repair order status management.
 * 
 * @component
 * @example
 * ```tsx
 * <RepairOrdersPage />
 * ```
 * 
 * @returns {JSX.Element} Rendered repair orders page
 */
export function RepairOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('openDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Generate repair order-specific KPIs
  const repairOrderKPIs = [
    {
      id: 'total-orders',
      title: 'Total Repair Orders',
      value: 89,
      previousValue: 76,
      change: 13,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'Wrench',
      color: 'green'
    },
    {
      id: 'avg-repair-time',
      title: 'Avg Repair Time',
      value: 2.4,
      previousValue: 2.8,
      change: -0.4,
      changeType: 'decrease' as const,
      format: 'number' as const,
      icon: 'Clock',
      color: 'green'
    },
    {
      id: 'total-revenue',
      title: 'Total Revenue',
      value: 125000,
      previousValue: 112000,
      change: 13000,
      changeType: 'increase' as const,
      format: 'currency' as const,
      icon: 'DollarSign',
      color: 'blue'
    },
    {
      id: 'pending-orders',
      title: 'Pending Orders',
      value: 15,
      previousValue: 12,
      change: 3,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'AlertTriangle',
      color: 'orange'
    }
  ];

  // Mock repair orders data
  const mockRepairOrders = Array.from({ length: 20 }, (_, i) => ({
    id: `RO${String(i + 1).padStart(6, '0')}`,
    customerName: `Customer ${i + 1}`,
    vehicleInfo: `2021 ${['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'][i % 5]} ${['Camry', 'Civic', 'F-150', 'Silverado', 'Altima'][i % 5]}`,
    vin: `1HGBH41JXMN${String(i + 1).padStart(6, '0')}`,
    serviceAdvisor: `Advisor ${Math.floor(Math.random() * 5) + 1}`,
    technician: `Tech ${Math.floor(Math.random() * 5) + 1}`,
    status: ['Open', 'In Progress', 'Waiting Parts', 'Completed', 'Invoiced'][Math.floor(Math.random() * 5)],
    openDate: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000),
    promisedDate: new Date(Date.now() + Math.random() * 3 * 24 * 60 * 60 * 1000),
    laborAmount: Math.floor(Math.random() * 800) + 100,
    partsAmount: Math.floor(Math.random() * 500) + 50,
    totalAmount: 0, // Will be calculated
    concerns: ['Engine noise', 'Brake inspection', 'Oil change', 'AC repair', 'Transmission service'][Math.floor(Math.random() * 5)],
    priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)]
  })).map(order => ({
    ...order,
    totalAmount: order.laborAmount + order.partsAmount
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Open': return 'bg-yellow-100 text-yellow-800';
      case 'Waiting Parts': return 'bg-orange-100 text-orange-800';
      case 'Invoiced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRepairOrders = mockRepairOrders
    .filter(order => 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vehicleInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.serviceAdvisor.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(order => statusFilter === 'all' || order.status === statusFilter)
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
          <h1 className="text-3xl font-bold tracking-tight">Repair Orders</h1>
          <p className="text-muted-foreground">
            Manage service repair orders and work tracking
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
            New Repair Order
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <WidgetSection>
        <WidgetGrid columns={4}>
          {repairOrderKPIs.map((kpi) => (
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
            placeholder="Search repair orders..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Status: {statusFilter === 'all' ? 'All' : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter('all')}>
              All Statuses
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Open')}>
              Open
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('In Progress')}>
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Waiting Parts')}>
              Waiting Parts
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Completed')}>
              Completed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Invoiced')}>
              Invoiced
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Repair Orders Table */}
      <WidgetBase
        title="Repair Orders"
        description="Complete list of all repair orders"
      >
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('customerName');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Customer
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>VIN</TableHead>
                <TableHead>Service Advisor</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('totalAmount');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Total Amount
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('openDate');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Open Date
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Promised Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRepairOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.customerName}
                  </TableCell>
                  <TableCell>{order.vehicleInfo}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {order.vin}
                  </TableCell>
                  <TableCell>{order.serviceAdvisor}</TableCell>
                  <TableCell>{order.technician}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(order.priority)}>
                      {order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${order.totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {order.openDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {order.promisedDate.toLocaleDateString()}
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
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem>Assign Technician</DropdownMenuItem>
                        <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
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
