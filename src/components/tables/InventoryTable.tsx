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
import { mockVehicles } from '@/data/mockData';

interface InventoryTableProps {
  title?: string;
  description?: string;
  className?: string;
  maxRows?: number;
}

type SortField = 'StockNumber' | 'Year' | 'Make' | 'Model' | 'MSRP' | 'DaysOnLot';
type SortDirection = 'asc' | 'desc';

/**
 * InventoryTable - Interactive table displaying vehicle inventory with filtering and sorting
 * 
 * A comprehensive table component that displays vehicle inventory with advanced
 * filtering, sorting, and search capabilities. Features age-based color coding,
 * type filtering (new/used), and action menus for each vehicle record.
 * 
 * @component
 * @example
 * ```tsx
 * <InventoryTable 
 *   title="Inventory Overview"
 *   description="Current vehicle inventory"
 *   maxRows={10}
 *   className="col-span-2"
 * />
 * ```
 * 
 * @param {InventoryTableProps} props - Component props
 * @param {string} [props.title="Inventory Overview"] - Table title
 * @param {string} [props.description="Current vehicle inventory"] - Table description
 * @param {string} [props.className] - Additional CSS classes
 * @param {number} [props.maxRows=10] - Maximum number of rows to display
 * 
 * @returns {JSX.Element} Rendered inventory table component
 */
export function InventoryTable({ 
  title = "Inventory Overview", 
  description = "Current vehicle inventory", 
  className,
  maxRows = 10
}: InventoryTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('StockNumber');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const getAgeColor = (days: number) => {
    if (days <= 30) return 'bg-green-100 text-green-800';
    if (days <= 60) return 'bg-yellow-100 text-yellow-800';
    if (days <= 90) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getAgeLabel = (days: number) => {
    if (days <= 30) return 'Fresh';
    if (days <= 60) return 'Good';
    if (days <= 90) return 'Aging';
    return 'Stale';
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedVehicles = mockVehicles
    .filter(vehicle => {
      const searchString = `${vehicle.Year} ${vehicle.Make} ${vehicle.Model} ${vehicle.StockNumber}`.toLowerCase();
      const matchesSearch = searchString.includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'all' || 
        (typeFilter === 'new' && vehicle.IsNew) ||
        (typeFilter === 'used' && !vehicle.IsNew);
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];
      
      if (sortField === 'MSRP') {
        aValue = a.MSRP?.Amount || 0;
        bValue = b.MSRP?.Amount || 0;
      }
      
      if (sortField === 'DaysOnLot') {
        aValue = a.DaysOnLot || 0;
        bValue = b.DaysOnLot || 0;
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
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Type: {typeFilter === 'all' ? 'All' : typeFilter === 'new' ? 'New' : 'Used'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTypeFilter('all')}>
              All Types
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter('new')}>
              New
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter('used')}>
              Used
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader field="StockNumber">Stock #</SortableHeader>
              <SortableHeader field="Year">Year</SortableHeader>
              <SortableHeader field="Make">Make</SortableHeader>
              <SortableHeader field="Model">Model</SortableHeader>
              <TableHead>Type</TableHead>
              <SortableHeader field="MSRP">MSRP</SortableHeader>
              <SortableHeader field="DaysOnLot">Age</SortableHeader>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedVehicles.map((vehicle) => (
              <TableRow key={vehicle.InventoryKey} className="hover:bg-muted/50">
                <TableCell className="font-medium">{vehicle.StockNumber}</TableCell>
                <TableCell>{vehicle.Year}</TableCell>
                <TableCell>{vehicle.Make}</TableCell>
                <TableCell>{vehicle.Model}</TableCell>
                <TableCell>
                  <Badge variant={vehicle.IsNew ? "default" : "secondary"}>
                    {vehicle.IsNew ? 'New' : 'Used'}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  ${vehicle.MSRP?.Amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Badge className={getAgeColor(vehicle.DaysOnLot || 0)}>
                      {getAgeLabel(vehicle.DaysOnLot || 0)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {vehicle.DaysOnLot || 0}d
                    </span>
                  </div>
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
                        Edit Listing
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredAndSortedVehicles.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No vehicles found matching your criteria.
        </div>
      )}
    </WidgetBase>
  );
}

