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
 * ServiceEstimatesPage - Service estimates management page
 * 
 * A dedicated page for viewing, filtering, and managing service estimates and quotes.
 * Features estimate creation, approval workflow, and customer communication.
 * 
 * @component
 * @example
 * ```tsx
 * <ServiceEstimatesPage />
 * ```
 * 
 * @returns {JSX.Element} Rendered service estimates page
 */
export function ServiceEstimatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('createdDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Generate estimate-specific KPIs
  const estimateKPIs = [
    {
      id: 'total-estimates',
      title: 'Total Estimates',
      value: 234,
      previousValue: 198,
      change: 36,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'FileText',
      color: 'green'
    },
    {
      id: 'avg-estimate-value',
      title: 'Avg Estimate Value',
      value: 850,
      previousValue: 780,
      change: 70,
      changeType: 'increase' as const,
      format: 'currency' as const,
      icon: 'DollarSign',
      color: 'blue'
    },
    {
      id: 'approval-rate',
      title: 'Approval Rate',
      value: 72.5,
      previousValue: 68.3,
      change: 4.2,
      changeType: 'increase' as const,
      format: 'percentage' as const,
      icon: 'TrendingUp',
      color: 'green'
    },
    {
      id: 'pending-approval',
      title: 'Pending Approval',
      value: 18,
      previousValue: 15,
      change: 3,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'Clock',
      color: 'orange'
    }
  ];

  // Mock estimates data
  const mockEstimates = Array.from({ length: 20 }, (_, i) => ({
    id: `EST${String(i + 1).padStart(6, '0')}`,
    customerName: `Customer ${i + 1}`,
    vehicleInfo: `2020 ${['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'][i % 5]} ${['Camry', 'Civic', 'F-150', 'Silverado', 'Altima'][i % 5]}`,
    vin: `1HGBH41JXMN${String(i + 1).padStart(6, '0')}`,
    serviceAdvisor: `Advisor ${Math.floor(Math.random() * 5) + 1}`,
    status: ['Draft', 'Pending Approval', 'Approved', 'Rejected', 'Expired'][Math.floor(Math.random() * 5)],
    createdDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    expiryDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
    laborAmount: Math.floor(Math.random() * 600) + 100,
    partsAmount: Math.floor(Math.random() * 400) + 50,
    taxAmount: 0, // Will be calculated
    totalAmount: 0, // Will be calculated
    services: ['Oil Change', 'Brake Service', 'Tire Rotation', 'AC Service', 'Engine Tune-up'][Math.floor(Math.random() * 5)],
    priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    notes: Math.random() > 0.5 ? 'Customer requested detailed breakdown' : 'Standard service estimate'
  })).map(estimate => {
    const subtotal = estimate.laborAmount + estimate.partsAmount;
    const taxAmount = subtotal * 0.08; // 8% tax
    return {
      ...estimate,
      taxAmount,
      totalAmount: subtotal + taxAmount
    };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Expired': return 'bg-orange-100 text-orange-800';
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

  const filteredEstimates = mockEstimates
    .filter(estimate => 
      estimate.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.vehicleInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.serviceAdvisor.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(estimate => statusFilter === 'all' || estimate.status === statusFilter)
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
          <h1 className="text-3xl font-bold tracking-tight">Service Estimates</h1>
          <p className="text-muted-foreground">
            Create and manage service estimates and quotes
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
            New Estimate
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <WidgetSection>
        <WidgetGrid columns={4}>
          {estimateKPIs.map((kpi) => (
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
            type="text"
            placeholder="Search estimates..."
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
            <DropdownMenuItem onClick={() => setStatusFilter('Draft')}>
              Draft
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Pending Approval')}>
              Pending Approval
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Approved')}>
              Approved
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Rejected')}>
              Rejected
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Expired')}>
              Expired
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Estimates Table */}
      <WidgetBase
        title="Service Estimates"
        description="Complete list of all service estimates"
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
                <TableHead>Services</TableHead>
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
                      setSortField('createdDate');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Created Date
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEstimates.map((estimate) => (
                <TableRow key={estimate.id}>
                  <TableCell className="font-medium">
                    {estimate.customerName}
                  </TableCell>
                  <TableCell>{estimate.vehicleInfo}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {estimate.vin}
                  </TableCell>
                  <TableCell>{estimate.serviceAdvisor}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {estimate.services}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(estimate.status)}>
                      {estimate.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(estimate.priority)}>
                      {estimate.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${estimate.totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {estimate.createdDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {estimate.expiryDate.toLocaleDateString()}
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
                        <DropdownMenuItem>Edit Estimate</DropdownMenuItem>
                        <DropdownMenuItem>Send to Customer</DropdownMenuItem>
                        <DropdownMenuItem>Approve/Reject</DropdownMenuItem>
                        <DropdownMenuItem>Generate PDF</DropdownMenuItem>
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
