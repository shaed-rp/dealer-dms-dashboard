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
 * PaymentsPage - Customer payments and receivables management page
 * 
 * A dedicated page for viewing, filtering, and managing customer payments and receivables.
 * Features payment tracking, invoice management, and collection monitoring.
 * 
 * @component
 * @example
 * ```tsx
 * <PaymentsPage />
 * ```
 * 
 * @returns {JSX.Element} Rendered payments page
 */
export function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('paymentDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Generate payments-specific KPIs
  const paymentsKPIs = [
    {
      id: 'total-receivables',
      title: 'Total Receivables',
      value: 125000,
      previousValue: 118000,
      change: 7000,
      changeType: 'increase' as const,
      format: 'currency' as const,
      icon: 'DollarSign',
      color: 'blue'
    },
    {
      id: 'collected-today',
      title: 'Collected Today',
      value: 8500,
      previousValue: 7200,
      change: 1300,
      changeType: 'increase' as const,
      format: 'currency' as const,
      icon: 'CheckCircle',
      color: 'green'
    },
    {
      id: 'overdue-amount',
      title: 'Overdue Amount',
      value: 18500,
      previousValue: 22000,
      change: -3500,
      changeType: 'decrease' as const,
      format: 'currency' as const,
      icon: 'Clock',
      color: 'orange'
    },
    {
      id: 'collection-rate',
      title: 'Collection Rate',
      value: 94.2,
      previousValue: 92.8,
      change: 1.4,
      changeType: 'increase' as const,
      format: 'percentage' as const,
      icon: 'CreditCard',
      color: 'green'
    }
  ];

  // Mock payments data
  const mockPayments = Array.from({ length: 20 }, (_, i) => ({
    id: `PAY${String(i + 1).padStart(6, '0')}`,
    paymentNumber: `PAY-${String(i + 1).padStart(4, '0')}`,
    customerName: `Customer ${i + 1}`,
    invoiceNumber: `INV-${String(Math.floor(Math.random() * 1000) + 1).padStart(4, '0')}`,
    paymentMethod: ['Credit Card', 'Cash', 'Check', 'Bank Transfer', 'Financing'][Math.floor(Math.random() * 5)],
    amount: Math.floor(Math.random() * 50000) + 1000,
    paymentDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
    status: ['Paid', 'Pending', 'Overdue', 'Partial', 'Cancelled'][Math.floor(Math.random() * 5)],
    reference: `REF-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
    processedBy: `User ${Math.floor(Math.random() * 5) + 1}`,
    notes: Math.random() > 0.5 ? 'Standard payment' : 'Payment with discount applied'
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Partial': return 'bg-orange-100 text-orange-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'Credit Card': return 'bg-blue-100 text-blue-800';
      case 'Cash': return 'bg-green-100 text-green-800';
      case 'Check': return 'bg-purple-100 text-purple-800';
      case 'Bank Transfer': return 'bg-orange-100 text-orange-800';
      case 'Financing': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPayments = mockPayments
    .filter(payment => 
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.paymentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(payment => statusFilter === 'all' || payment.status === statusFilter)
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
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">
            Manage customer payments and receivables
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
            Record Payment
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <WidgetSection>
        <WidgetGrid columns={4}>
          {paymentsKPIs.map((kpi) => (
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
            placeholder="Search payments..."
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
            <DropdownMenuItem onClick={() => setStatusFilter('Paid')}>
              Paid
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Pending')}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Overdue')}>
              Overdue
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Partial')}>
              Partial
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Cancelled')}>
              Cancelled
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Payments Table */}
      <WidgetBase
        title="Payments"
        description="Complete list of all customer payments"
      >
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('paymentNumber');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Payment Number
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
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
                <TableHead>Invoice Number</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('amount');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Amount
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('paymentDate');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Payment Date
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Processed By</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono font-medium">
                    {payment.paymentNumber}
                  </TableCell>
                  <TableCell className="font-medium">
                    {payment.customerName}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {payment.invoiceNumber}
                  </TableCell>
                  <TableCell>
                    <Badge className={getPaymentMethodColor(payment.paymentMethod)}>
                      {payment.paymentMethod}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${payment.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {payment.paymentDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {payment.dueDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {payment.reference}
                  </TableCell>
                  <TableCell>{payment.processedBy}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Payment</DropdownMenuItem>
                        <DropdownMenuItem>Send Receipt</DropdownMenuItem>
                        <DropdownMenuItem>Process Refund</DropdownMenuItem>
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
