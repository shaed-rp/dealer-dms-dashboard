import { useState } from 'react';
import { WidgetBase } from '@/components/widgets/WidgetBase';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { WidgetGrid, WidgetSection } from '@/components/widgets/WidgetGrid';
import { mockCustomers } from '@/data/mockData';
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
import { Plus, Download, Filter, Search, Phone, Mail, Calendar, MoreHorizontal, ArrowUpDown, Car } from 'lucide-react';

/**
 * CustomersPage - Customer management page
 * 
 * A dedicated page for viewing, filtering, and managing customer information.
 * Features customer history, communication tracking, and relationship management.
 * 
 * @component
 * @example
 * ```tsx
 * <CustomersPage />
 * ```
 * 
 * @returns {JSX.Element} Rendered customers page
 */
export function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('lastName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Generate customer-specific KPIs
  const customerKPIs = [
    {
      id: 'total-customers',
      title: 'Total Customers',
      value: mockCustomers.length,
      previousValue: mockCustomers.length - 15,
      change: 15,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'User',
      color: 'green'
    },
    {
      id: 'new-customers',
      title: 'New This Month',
      value: Math.floor(mockCustomers.length * 0.1),
      previousValue: Math.floor(mockCustomers.length * 0.1) - 3,
      change: 3,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'User',
      color: 'blue'
    },
    {
      id: 'repeat-customers',
      title: 'Repeat Customers',
      value: Math.floor(mockCustomers.length * 0.3),
      previousValue: Math.floor(mockCustomers.length * 0.3) - 5,
      change: 5,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'User',
      color: 'purple'
    },
    {
      id: 'avg-deals',
      title: 'Avg Deals per Customer',
      value: 2.3,
      previousValue: 2.1,
      change: 0.2,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'Car',
      color: 'orange'
    }
  ];

  const getCustomerType = () => {
    // Simulate customer type based on random data
    const dealCount = Math.floor(Math.random() * 5);
    if (dealCount === 0) return 'Prospect';
    if (dealCount === 1) return 'New Customer';
    if (dealCount <= 3) return 'Repeat Customer';
    return 'VIP Customer';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Prospect': return 'bg-gray-100 text-gray-800';
      case 'New Customer': return 'bg-blue-100 text-blue-800';
      case 'Repeat Customer': return 'bg-green-100 text-green-800';
      case 'VIP Customer': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedCustomers = mockCustomers
    .filter(customer => {
      const searchString = `${customer.Identity.PersonalName.FirstName} ${customer.Identity.PersonalName.LastName} ${customer.Identity.EmailAddress}`.toLowerCase();
      const matchesSearch = searchString.includes(searchTerm.toLowerCase());
      
      const customerType = getCustomerType();
      const matchesType = typeFilter === 'all' || customerType === typeFilter;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];
      
      if (sortField === 'lastName') {
        aValue = a.Identity.PersonalName.LastName;
        bValue = b.Identity.PersonalName.LastName;
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    })
    .slice(0, 20);

  const SortableHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <TableHead>
      <Button
        variant="ghost"
        onClick={() => handleSort(field)}
        className="h-auto p-0 font-medium hover:bg-transparent"
      >
        {children}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
          <p className="text-muted-foreground">
            View and manage customer information and relationships
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
            Add Customer
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <WidgetSection>
        <WidgetGrid columns={4}>
          {customerKPIs.map((kpi) => (
            <KPIWidget
              key={kpi.id}
              data={kpi}
            />
          ))}
        </WidgetGrid>
      </WidgetSection>

      {/* Customers Table */}
      <WidgetBase title="All Customers" description="Customer database and relationship management">
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Type: {typeFilter === 'all' ? 'All' : typeFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTypeFilter('all')}>
                All Types
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter('Prospect')}>
                Prospects
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter('New Customer')}>
                New Customers
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter('Repeat Customer')}>
                Repeat Customers
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter('VIP Customer')}>
                VIP Customers
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHeader field="lastName">Name</SortableHeader>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Deals</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedCustomers.map((customer) => {
                const customerType = getCustomerType();
                const dealCount = Math.floor(Math.random() * 5);
                const totalSpent = dealCount * (Math.random() * 50000 + 20000);
                const lastContact = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);

                return (
                  <TableRow key={customer.CustomerKey} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {customer.Identity.PersonalName.FirstName} {customer.Identity.PersonalName.LastName}
                    </TableCell>
                    <TableCell>{customer.Identity.EmailAddress}</TableCell>
                    <TableCell>{customer.PhoneNumber || customer.Identity.PhoneNumbers?.[0]?.Digits || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(customerType)}>
                        {customerType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {dealCount} deals
                      </span>
                    </TableCell>
                    <TableCell>
                      {lastContact.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      ${totalSpent.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Call
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule Meeting
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Car className="mr-2 h-4 w-4" />
                            View History
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {filteredAndSortedCustomers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No customers found matching your criteria.
          </div>
        )}
      </WidgetBase>
    </div>
  );
}
