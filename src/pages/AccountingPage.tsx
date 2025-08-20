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
 * AccountingPage - Financial accounting and general ledger management page
 * 
 * A dedicated page for viewing, filtering, and managing financial accounting records.
 * Features general ledger, journal entries, and financial reporting.
 * 
 * @component
 * @example
 * ```tsx
 * <AccountingPage />
 * ```
 * 
 * @returns {JSX.Element} Rendered accounting page
 */
export function AccountingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [accountTypeFilter, setAccountTypeFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Generate accounting-specific KPIs
  const accountingKPIs = [
    {
      id: 'total-revenue',
      title: 'Total Revenue (MTD)',
      value: 1250000,
      previousValue: 1180000,
      change: 70000,
      changeType: 'increase' as const,
      format: 'currency' as const,
      icon: 'DollarSign',
      color: 'green'
    },
    {
      id: 'total-expenses',
      title: 'Total Expenses (MTD)',
      value: 850000,
      previousValue: 820000,
      change: 30000,
      changeType: 'increase' as const,
      format: 'currency' as const,
      icon: 'Calculator',
      color: 'red'
    },
    {
      id: 'net-income',
      title: 'Net Income (MTD)',
      value: 400000,
      previousValue: 360000,
      change: 40000,
      changeType: 'increase' as const,
      format: 'currency' as const,
      icon: 'TrendingUp',
      color: 'green'
    },
    {
      id: 'accounts-receivable',
      title: 'Accounts Receivable',
      value: 125000,
      previousValue: 118000,
      change: 7000,
      changeType: 'increase' as const,
      format: 'currency' as const,
      icon: 'DollarSign',
      color: 'blue'
    }
  ];

  // Mock journal entries data
  const mockJournalEntries = Array.from({ length: 20 }, (_, i) => ({
    id: `JE${String(i + 1).padStart(6, '0')}`,
    entryNumber: `JE-${String(i + 1).padStart(4, '0')}`,
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    description: [
      'Vehicle Sale - Cash',
      'Parts Sale - Credit',
      'Service Revenue',
      'Salary Expense',
      'Rent Expense',
      'Utility Expense',
      'Insurance Expense',
      'Advertising Expense',
      'Depreciation Expense',
      'Interest Expense',
      'Loan Payment',
      'Equipment Purchase',
      'Inventory Purchase',
      'Customer Payment',
      'Vendor Payment',
      'Tax Payment',
      'Commission Expense',
      'Maintenance Expense',
      'Office Supplies',
      'Professional Services'
    ][i % 20],
    accountType: ['Revenue', 'Expense', 'Asset', 'Liability', 'Equity'][Math.floor(Math.random() * 5)],
    accountName: [
      'Cash',
      'Accounts Receivable',
      'Inventory',
      'Equipment',
      'Accounts Payable',
      'Sales Revenue',
      'Service Revenue',
      'Salary Expense',
      'Rent Expense',
      'Utility Expense'
    ][Math.floor(Math.random() * 10)],
    debitAmount: Math.random() > 0.5 ? Math.floor(Math.random() * 50000) + 1000 : 0,
    creditAmount: Math.random() > 0.5 ? Math.floor(Math.random() * 50000) + 1000 : 0,
    reference: `REF-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
    status: ['Posted', 'Pending', 'Draft'][Math.floor(Math.random() * 3)],
    createdBy: `User ${Math.floor(Math.random() * 5) + 1}`
  }));

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'Revenue': return 'bg-green-100 text-green-800';
      case 'Expense': return 'bg-red-100 text-red-800';
      case 'Asset': return 'bg-blue-100 text-blue-800';
      case 'Liability': return 'bg-orange-100 text-orange-800';
      case 'Equity': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Posted': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredJournalEntries = mockJournalEntries
    .filter(entry => 
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.entryNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.reference.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(entry => accountTypeFilter === 'all' || entry.accountType === accountTypeFilter)
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
          <h1 className="text-3xl font-bold tracking-tight">Accounting</h1>
          <p className="text-muted-foreground">
            Financial accounting and general ledger management
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
            New Journal Entry
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <WidgetSection>
        <WidgetGrid columns={4}>
          {accountingKPIs.map((kpi) => (
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
            placeholder="Search journal entries..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Account Type: {accountTypeFilter === 'all' ? 'All' : accountTypeFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setAccountTypeFilter('all')}>
              All Types
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAccountTypeFilter('Revenue')}>
              Revenue
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAccountTypeFilter('Expense')}>
              Expense
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAccountTypeFilter('Asset')}>
              Asset
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAccountTypeFilter('Liability')}>
              Liability
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAccountTypeFilter('Equity')}>
              Equity
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Journal Entries Table */}
      <WidgetBase
        title="Journal Entries"
        description="Complete list of all journal entries"
      >
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('entryNumber');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Entry Number
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('date');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Date
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Debit</TableHead>
                <TableHead>Credit</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJournalEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-mono font-medium">
                    {entry.entryNumber}
                  </TableCell>
                  <TableCell>
                    {entry.date.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    {entry.description}
                  </TableCell>
                  <TableCell>
                    <Badge className={getAccountTypeColor(entry.accountType)}>
                      {entry.accountType}
                    </Badge>
                  </TableCell>
                  <TableCell>{entry.accountName}</TableCell>
                  <TableCell className={entry.debitAmount > 0 ? 'font-medium' : ''}>
                    {entry.debitAmount > 0 ? `$${entry.debitAmount.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell className={entry.creditAmount > 0 ? 'font-medium' : ''}>
                    {entry.creditAmount > 0 ? `$${entry.creditAmount.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {entry.reference}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(entry.status)}>
                      {entry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{entry.createdBy}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Entry</DropdownMenuItem>
                        <DropdownMenuItem>Post Entry</DropdownMenuItem>
                        <DropdownMenuItem>Reverse Entry</DropdownMenuItem>
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
