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
import { Plus, Download, Filter, Search, Phone, Mail, Calendar, MoreHorizontal, ArrowUpDown } from 'lucide-react';

/**
 * ProspectsPage - Customer prospects and leads management page
 * 
 * A dedicated page for viewing, filtering, and managing customer prospects and leads.
 * Features lead scoring, follow-up tracking, and conversion pipeline management.
 * 
 * @component
 * @example
 * ```tsx
 * <ProspectsPage />
 * ```
 * 
 * @returns {JSX.Element} Rendered prospects page
 */
export function ProspectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('lastName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Generate prospect-specific KPIs
  const prospectKPIs = [
    {
      id: 'total-prospects',
      title: 'Total Prospects',
      value: mockCustomers.length,
      previousValue: mockCustomers.length - 12,
      change: 12,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'Users',
      color: 'green'
    },
    {
      id: 'hot-leads',
      title: 'Hot Leads',
      value: mockCustomers.filter(_c => Math.random() > 0.7).length,
      previousValue: mockCustomers.filter(_c => Math.random() > 0.7).length - 5,
      change: 5,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'Target',
      color: 'red'
    },
    {
      id: 'conversion-rate',
      title: 'Conversion Rate',
      value: 23.5,
      previousValue: 21.4,
      change: 2.1,
      changeType: 'increase' as const,
      format: 'percentage' as const,
      icon: 'TrendingUp',
      color: 'blue'
    },
    {
      id: 'avg-follow-up',
      title: 'Avg Follow-up',
      value: 2.3,
      previousValue: 2.8,
      change: -0.5,
      changeType: 'decrease' as const,
      format: 'number' as const,
      icon: 'Clock',
      color: 'orange'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Hot': return 'bg-red-100 text-red-800';
      case 'Warm': return 'bg-yellow-100 text-yellow-800';
      case 'Cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-green-100 text-green-800';
      case 'Contacted': return 'bg-blue-100 text-blue-800';
      case 'Qualified': return 'bg-purple-100 text-purple-800';
      case 'Lost': return 'bg-gray-100 text-gray-800';
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

  const filteredAndSortedProspects = mockCustomers
    .filter(prospect => {
      const searchString = `${prospect.Identity.PersonalName.FirstName} ${prospect.Identity.PersonalName.LastName} ${prospect.Identity.EmailAddress}`.toLowerCase();
      const matchesSearch = searchString.includes(searchTerm.toLowerCase());
      
      // Simulate prospect status and priority
      const status = Math.random() > 0.8 ? 'New' : Math.random() > 0.6 ? 'Contacted' : Math.random() > 0.4 ? 'Qualified' : 'Lost';
      
      const matchesStatus = statusFilter === 'all' || status === statusFilter;
      
      return matchesSearch && matchesStatus;
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
          <h1 className="text-3xl font-bold tracking-tight">Prospects Management</h1>
          <p className="text-muted-foreground">
            Manage customer prospects and track lead conversion pipeline
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
            Add Prospect
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <WidgetSection>
        <WidgetGrid columns={4}>
          {prospectKPIs.map((kpi) => (
            <KPIWidget
              key={kpi.id}
              data={kpi}
            />
          ))}
        </WidgetGrid>
      </WidgetSection>

      {/* Prospects Table */}
      <WidgetBase title="All Prospects" description="Customer prospects and leads">
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search prospects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Status: {statusFilter === 'all' ? 'All' : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('New')}>
                New
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Contacted')}>
                Contacted
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Qualified')}>
                Qualified
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Lost')}>
                Lost
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
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Follow-ups</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedProspects.map((prospect) => {
                const status = Math.random() > 0.8 ? 'New' : Math.random() > 0.6 ? 'Contacted' : Math.random() > 0.4 ? 'Qualified' : 'Lost';
                const priority = Math.random() > 0.7 ? 'Hot' : Math.random() > 0.4 ? 'Warm' : 'Cold';
                const followUps = Math.floor(Math.random() * 5);
                const lastContact = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);

                return (
                  <TableRow key={prospect.CustomerKey} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {prospect.Identity.PersonalName.FirstName} {prospect.Identity.PersonalName.LastName}
                    </TableCell>
                    <TableCell>{prospect.Identity.EmailAddress}</TableCell>
                    <TableCell>{prospect.PhoneNumber || prospect.Identity.PhoneNumbers?.[0]?.Digits || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(priority)}>
                        {priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(status)}>
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {lastContact.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {followUps} calls
                      </span>
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
                            Schedule Follow-up
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

        {filteredAndSortedProspects.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No prospects found matching your criteria.
          </div>
        )}
      </WidgetBase>
    </div>
  );
}
