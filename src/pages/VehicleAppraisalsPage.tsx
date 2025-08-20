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
 * VehicleAppraisalsPage - Vehicle appraisal management page
 * 
 * A dedicated page for viewing, filtering, and managing vehicle trade-in appraisals.
 * Features appraisal tracking, valuation tools, and customer communication.
 * 
 * @component
 * @example
 * ```tsx
 * <VehicleAppraisalsPage />
 * ```
 * 
 * @returns {JSX.Element} Rendered vehicle appraisals page
 */
export function VehicleAppraisalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('appraisalDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Generate appraisal-specific KPIs
  const appraisalKPIs = [
    {
      id: 'total-appraisals',
      title: 'Total Appraisals',
      value: 156,
      previousValue: 142,
      change: 14,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'Car',
      color: 'green'
    },
    {
      id: 'avg-value',
      title: 'Avg Appraisal Value',
      value: 18500,
      previousValue: 17200,
      change: 1300,
      changeType: 'increase' as const,
      format: 'currency' as const,
      icon: 'DollarSign',
      color: 'blue'
    },
    {
      id: 'conversion-rate',
      title: 'Conversion Rate',
      value: 68.5,
      previousValue: 65.2,
      change: 3.3,
      changeType: 'increase' as const,
      format: 'percentage' as const,
      icon: 'TrendingUp',
      color: 'green'
    },
    {
      id: 'pending-appraisals',
      title: 'Pending Review',
      value: 23,
      previousValue: 18,
      change: 5,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'Clock',
      color: 'orange'
    }
  ];

  // Mock appraisals data
  const mockAppraisals = Array.from({ length: 20 }, (_, i) => ({
    id: `APP${String(i + 1).padStart(6, '0')}`,
    customerName: `Customer ${i + 1}`,
    vehicleInfo: `2020 ${['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'][i % 5]} ${['Camry', 'Civic', 'F-150', 'Silverado', 'Altima'][i % 5]}`,
    vin: `1HGBH41JXMN${String(i + 1).padStart(6, '0')}`,
    mileage: Math.floor(Math.random() * 100000) + 10000,
    condition: ['Excellent', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)],
    appraisalValue: Math.floor(Math.random() * 30000) + 5000,
    customerOffer: Math.floor(Math.random() * 25000) + 4000,
    status: ['Pending', 'Approved', 'Rejected', 'Completed'][Math.floor(Math.random() * 4)],
    appraisalDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    appraiser: `Appraiser ${Math.floor(Math.random() * 5) + 1}`,
    notes: Math.random() > 0.5 ? 'Vehicle in good condition, minor wear' : 'Needs some repairs'
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Fair': return 'bg-yellow-100 text-yellow-800';
      case 'Poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAppraisals = mockAppraisals
    .filter(appraisal => 
      appraisal.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appraisal.vehicleInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appraisal.vin.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(appraisal => statusFilter === 'all' || appraisal.status === statusFilter)
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
          <h1 className="text-3xl font-bold tracking-tight">Vehicle Appraisals</h1>
          <p className="text-muted-foreground">
            Manage vehicle trade-in appraisals and valuations
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
            New Appraisal
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <WidgetSection>
        <WidgetGrid columns={4}>
          {appraisalKPIs.map((kpi) => (
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
            placeholder="Search appraisals..."
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
            <DropdownMenuItem onClick={() => setStatusFilter('Pending')}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Approved')}>
              Approved
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Rejected')}>
              Rejected
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Completed')}>
              Completed
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Appraisals Table */}
      <WidgetBase
        title="Vehicle Appraisals"
        description="Complete list of all vehicle appraisals"
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
                <TableHead>Mileage</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('appraisalValue');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Appraisal Value
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('appraisalDate');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Date
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Appraiser</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppraisals.map((appraisal) => (
                <TableRow key={appraisal.id}>
                  <TableCell className="font-medium">
                    {appraisal.customerName}
                  </TableCell>
                  <TableCell>{appraisal.vehicleInfo}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {appraisal.vin}
                  </TableCell>
                  <TableCell>{appraisal.mileage.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getConditionColor(appraisal.condition)}>
                      {appraisal.condition}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${appraisal.appraisalValue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(appraisal.status)}>
                      {appraisal.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {appraisal.appraisalDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell>{appraisal.appraiser}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Appraisal</DropdownMenuItem>
                        <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                        <DropdownMenuItem>Generate Report</DropdownMenuItem>
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
