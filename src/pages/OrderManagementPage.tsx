import { useState, useMemo } from 'react';
import { WidgetBase } from '@/components/widgets/WidgetBase';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { WidgetGrid, WidgetSection } from '@/components/widgets/WidgetGrid';
import { mockOrders } from '@/data/mockData';
import { OrderStatus, OrderType, OrderPriority } from '@/types/orders';
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
import { 
  Plus, 
  Download, 
  Filter, 
  Search, 
  MoreHorizontal, 
  ArrowUpDown, 
  Package,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  Truck,
  Settings,
  FileText
} from 'lucide-react';

/**
 * OrderManagementPage - Order management and tracking page
 * 
 * A comprehensive page for viewing, filtering, and managing customer orders.
 * Features order status tracking across OEM, upfitter, logistics, payment, and administrative statuses.
 * 
 * @component
 * @example
 * ```tsx
 * <OrderManagementPage />
 * ```
 * 
 * @returns {JSX.Element} Rendered order management page
 */
export function OrderManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderTypeFilter, setOrderTypeFilter] = useState<OrderType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<OrderPriority | 'all'>('all');
  const [sortField, setSortField] = useState<string>('OrderDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Calculate order KPIs
  const orderKPIs = useMemo(() => {
    const totalOrders = mockOrders.length;
    const pendingOrders = mockOrders.filter(order => order.Status === OrderStatus.PENDING).length;
    const overdueOrders = mockOrders.filter(order => {
      const expectedDate = new Date(order.ExpectedDeliveryDate);
      const today = new Date();
      return expectedDate < today && order.Status !== OrderStatus.DELIVERED;
    }).length;
    
    const deliveredOrders = mockOrders.filter(order => order.Status === OrderStatus.DELIVERED);
    const averageDeliveryTime = deliveredOrders.length > 0 
      ? deliveredOrders.reduce((acc, order) => {
          const orderDate = new Date(order.OrderDate);
          const deliveryDate = new Date(order.ActualDeliveryDate!);
          return acc + (deliveryDate.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24);
        }, 0) / deliveredOrders.length
      : 0;

    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() + 7);
    const ordersDueThisWeek = mockOrders.filter(order => {
      const expectedDate = new Date(order.ExpectedDeliveryDate);
      return expectedDate <= thisWeek && order.Status !== OrderStatus.DELIVERED;
    }).length;

    return [
      {
        id: 'total-orders',
        title: 'Total Orders',
        value: totalOrders,
        previousValue: totalOrders - 15,
        change: 15,
        changeType: 'increase' as const,
        format: 'number' as const,
        icon: 'Package',
        color: 'blue'
      },
      {
        id: 'pending-orders',
        title: 'Pending Orders',
        value: pendingOrders,
        previousValue: pendingOrders + 5,
        change: -5,
        changeType: 'decrease' as const,
        format: 'number' as const,
        icon: 'Clock',
        color: 'yellow'
      },
      {
        id: 'overdue-orders',
        title: 'Overdue Orders',
        value: overdueOrders,
        previousValue: overdueOrders + 2,
        change: -2,
        changeType: 'decrease' as const,
        format: 'number' as const,
        icon: 'AlertTriangle',
        color: 'red'
      },
      {
        id: 'avg-delivery-time',
        title: 'Avg Delivery Time',
        value: Math.round(averageDeliveryTime),
        previousValue: Math.round(averageDeliveryTime) + 1,
        change: -1,
        changeType: 'decrease' as const,
        format: 'number' as const,
        icon: 'Calendar',
        color: 'green'
      },
      {
        id: 'orders-due-week',
        title: 'Due This Week',
        value: ordersDueThisWeek,
        previousValue: ordersDueThisWeek - 3,
        change: 3,
        changeType: 'increase' as const,
        format: 'number' as const,
        icon: 'Clock',
        color: 'orange'
      }
    ];
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-gray-100 text-gray-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      case 'IN_PRODUCTION':
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'SHIPPED': return 'bg-orange-100 text-orange-800';
      case 'DELIVERED':
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED':
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'OVERDUE': return 'bg-red-100 text-red-800';
      case 'PAID': return 'bg-green-100 text-green-800';
      case 'PARTIAL': return 'bg-yellow-100 text-yellow-800';
      case 'PICKED_UP': return 'bg-blue-100 text-blue-800';
      case 'IN_TRANSIT': return 'bg-purple-100 text-purple-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: OrderPriority) => {
    switch (priority) {
      case 'LOW': return 'bg-gray-100 text-gray-800';
      case 'MEDIUM': return 'bg-blue-100 text-blue-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'CRITICAL': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: OrderPriority) => {
    switch (priority) {
      case 'LOW': return null;
      case 'MEDIUM': return <Clock className="h-3 w-3" />;
      case 'HIGH': return <AlertTriangle className="h-3 w-3" />;
      case 'CRITICAL': return <XCircle className="h-3 w-3" />;
      default: return null;
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

  const filteredAndSortedOrders = useMemo(() => {
    return mockOrders
      .filter(order => {
        const searchString = `${order.OrderNumber} ${order.CustomerName}`.toLowerCase();
        const matchesSearch = searchString.includes(searchTerm.toLowerCase());
        const matchesType = orderTypeFilter === 'all' || order.OrderType === orderTypeFilter;
        const matchesStatus = statusFilter === 'all' || order.Status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || order.Priority === priorityFilter;
        
        return matchesSearch && matchesType && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        let aValue: any = a[sortField as keyof typeof a];
        let bValue: any = b[sortField as keyof typeof b];
        
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
      .slice(0, 50); // Limit to 50 orders for performance
  }, [searchTerm, orderTypeFilter, statusFilter, priorityFilter, sortField, sortDirection]);

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
          <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
          <p className="text-muted-foreground">
            Track and manage customer orders and delivery ETAs
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
            Add Order
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <WidgetSection>
        <WidgetGrid columns={5}>
          {orderKPIs.map((kpi) => (
            <KPIWidget
              key={kpi.id}
              data={kpi}
            />
          ))}
        </WidgetGrid>
      </WidgetSection>

      {/* Orders Table */}
      <WidgetBase title="All Orders" description="Comprehensive order tracking and management">
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders by number or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Package className="mr-2 h-4 w-4" />
                Type: {orderTypeFilter === 'all' ? 'All' : orderTypeFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setOrderTypeFilter('all')}>
                All Types
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOrderTypeFilter(OrderType.VEHICLE)}>
                Vehicles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOrderTypeFilter(OrderType.PARTS)}>
                Parts
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOrderTypeFilter(OrderType.SERVICE)}>
                Service
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOrderTypeFilter(OrderType.ACCESSORIES)}>
                Accessories
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <CheckCircle className="mr-2 h-4 w-4" />
                Status: {statusFilter === 'all' ? 'All' : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                All Statuses
              </DropdownMenuItem>
              {Object.values(OrderStatus).map(status => (
                <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Priority: {priorityFilter === 'all' ? 'All' : priorityFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setPriorityFilter('all')}>
                All Priorities
              </DropdownMenuItem>
                             {Object.values(OrderPriority).map(priority => (
                <DropdownMenuItem key={priority} onClick={() => setPriorityFilter(priority)}>
                  {priority}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHeader field="OrderNumber">Order #</SortableHeader>
                <SortableHeader field="CustomerName">Customer</SortableHeader>
                <SortableHeader field="OrderType">Type</SortableHeader>
                <SortableHeader field="OrderDate">Order Date</SortableHeader>
                <SortableHeader field="ExpectedDeliveryDate">ETA</SortableHeader>
                <SortableHeader field="TotalAmount">Amount</SortableHeader>
                <SortableHeader field="Priority">Priority</SortableHeader>
                <TableHead>Status</TableHead>
                <TableHead>OEM</TableHead>
                <TableHead>Upfitter</TableHead>
                <TableHead>Logistics</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedOrders.map((order) => {
                const isOverdue = new Date(order.ExpectedDeliveryDate) < new Date() && order.Status !== OrderStatus.DELIVERED;
                
                return (
                  <TableRow key={order.OrderKey} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {order.OrderNumber}
                    </TableCell>
                    <TableCell>{order.CustomerName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {order.OrderType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(order.OrderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span className={isOverdue ? "text-red-600 font-medium" : ""}>
                          {new Date(order.ExpectedDeliveryDate).toLocaleDateString()}
                        </span>
                        {isOverdue && <AlertTriangle className="h-3 w-3 text-red-600" />}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${order.TotalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(order.Priority)}>
                        <div className="flex items-center space-x-1">
                          {getPriorityIcon(order.Priority)}
                          <span>{order.Priority}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.Status)}>
                        {order.Status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.OEMStatus)}>
                        {order.OEMStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.UpfitterStatus)}>
                        {order.UpfitterStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.LogisticsStatus)}>
                        {order.LogisticsStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.PaymentStatus)}>
                        {order.PaymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.AdministrativeStatus)}>
                        {order.AdministrativeStatus}
                      </Badge>
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
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Update ETA
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <DollarSign className="mr-2 h-4 w-4" />
                            Payment Status
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Track Shipment
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

        {filteredAndSortedOrders.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No orders found matching your criteria.
          </div>
        )}
      </WidgetBase>
    </div>
  );
}
