import React, { useState } from 'react';
import { WidgetBase } from '@/components/widgets/WidgetBase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { Search, Filter, Eye, Edit, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { mockDeals } from '@/data/mockData';

interface DealsTableProps {
  title?: string;
  description?: string;
  className?: string;
  maxRows?: number;
}

type SortField = 'dealNumber' | 'customerName' | 'vehicleInfo' | 'dealStatus' | 'totalGross' | 'dateSold';
type SortDirection = 'asc' | 'desc';

/**
 * DealsTable - Interactive table displaying deal transactions with filtering and sorting
 * 
 * A comprehensive table component that displays deal transactions with advanced
 * filtering, sorting, and search capabilities. Features status-based color coding,
 * date sorting, and action menus for each deal record.
 * 
 * @component
 * @example
 * ```tsx
 * <DealsTable 
 *   title="Recent Deals"
 *   description="Latest deal transactions"
 *   maxRows={8}
 *   className="col-span-2"
 * />
 * ```
 * 
 * @param {DealsTableProps} props - Component props
 * @param {string} [props.title="Recent Deals"] - Table title
 * @param {string} [props.description="Latest deal transactions"] - Table description
 * @param {string} [props.className] - Additional CSS classes
 * @param {number} [props.maxRows=10] - Maximum number of rows to display
 * 
 * @returns {JSX.Element} Rendered deals table component
 */
export function DealsTable({ 
  title = "Recent Deals", 
  description = "Latest deal transactions", 
  className,
  maxRows = 10
}: DealsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('dealNumber');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Closed': return 'bg-green-100 text-green-800';
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedDeals = mockDeals
    .filter(deal => {
      const matchesSearch = 
        deal.dealNumber.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.vehicleInfo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || deal.dealStatus === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];
      
      if (sortField === 'dateSold') {
        aValue = a.dateSold ? new Date(a.dateSold).getTime() : 0;
        bValue = b.dateSold ? new Date(b.dateSold).getTime() : 0;
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
    .slice(0, maxRows);

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
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
    <WidgetBase title={title} description={description} className={className}>
      {/* Filters */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search deals..."
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
            <DropdownMenuItem onClick={() => setStatusFilter('Open')}>
              Open
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Closed')}>
              Closed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('Delivered')}>
              Delivered
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader field="dealNumber">Deal #</SortableHeader>
              <SortableHeader field="customerName">Customer</SortableHeader>
              <SortableHeader field="vehicleInfo">Vehicle</SortableHeader>
              <SortableHeader field="dealStatus">Status</SortableHeader>
              <SortableHeader field="totalGross">Total Gross</SortableHeader>
              <SortableHeader field="dateSold">Date Sold</SortableHeader>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedDeals.map((deal) => (
              <TableRow key={deal.dealKey} className="hover:bg-muted/50">
                <TableCell className="font-medium">{deal.dealNumber}</TableCell>
                <TableCell>{deal.customerName}</TableCell>
                <TableCell className="max-w-[200px] truncate">{deal.vehicleInfo}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(deal.dealStatus)}>
                    {deal.dealStatus}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  ${deal.totalGross?.toLocaleString()}
                </TableCell>
                <TableCell>
                  {deal.dateSold ? new Date(deal.dateSold).toLocaleDateString() : 'In Progress'}
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
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Deal
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredAndSortedDeals.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No deals found matching your criteria.
        </div>
      )}
    </WidgetBase>
  );
}

