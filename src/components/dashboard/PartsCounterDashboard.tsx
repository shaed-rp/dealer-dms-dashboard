
import { WidgetGrid, WidgetRow, WidgetSection } from '@/components/widgets/WidgetGrid';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { WidgetBase } from '@/components/widgets/WidgetBase';
import { MockDataGenerator } from '@/data/mockData';
import { UserRole } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Search, Truck, AlertTriangle, CheckCircle, Plus } from 'lucide-react';

/**
 * PartsCounterDashboard - Parts inventory and ordering dashboard for parts counter staff
 * 
 * A specialized dashboard that provides parts inventory management, order tracking,
 * technician parts requests, and supplier relationship tools. Designed for parts
 * counter staff to manage inventory levels, process orders, and fulfill technician
 * parts requests efficiently.
 * 
 * @component
 * @example
 * ```tsx
 * <PartsCounterDashboard />
 * ```
 * 
 * @returns {JSX.Element} Rendered parts counter dashboard
 */
export function PartsCounterDashboard() {
  const kpiData = MockDataGenerator.generateKPIData(UserRole.PARTS_COUNTER);

  const pendingOrders = [
    {
      id: 'PO-2024-001',
      supplier: 'Honda Parts Direct',
      items: 12,
      total: 1250.00,
      orderDate: '2024-01-15',
      expectedDate: '2024-01-18',
      status: 'Shipped'
    },
    {
      id: 'PO-2024-002',
      supplier: 'Toyota Genuine Parts',
      items: 8,
      total: 890.00,
      orderDate: '2024-01-16',
      expectedDate: '2024-01-19',
      status: 'Processing'
    },
    {
      id: 'PO-2024-003',
      supplier: 'Ford Motor Company',
      items: 15,
      total: 2100.00,
      orderDate: '2024-01-16',
      expectedDate: '2024-01-20',
      status: 'Confirmed'
    }
  ];

  const partsRequests = [
    {
      id: 'REQ-001',
      technician: 'Mike Johnson',
      roNumber: 'RO-12345',
      partNumber: 'BP-4521',
      description: 'Brake Pads - Front Set',
      quantity: 1,
      priority: 'High',
      requestTime: '2 hours ago'
    },
    {
      id: 'REQ-002',
      technician: 'Sarah Davis',
      roNumber: 'RO-12346',
      partNumber: 'OF-8834',
      description: 'Oil Filter',
      quantity: 2,
      priority: 'Normal',
      requestTime: '4 hours ago'
    },
    {
      id: 'REQ-003',
      technician: 'Tom Wilson',
      roNumber: 'RO-12347',
      partNumber: 'TF-9921',
      description: 'Transmission Fluid - 5Qt',
      quantity: 1,
      priority: 'Low',
      requestTime: '6 hours ago'
    }
  ];

  const lowStockItems = [
    { partNumber: 'OF-1234', description: 'Oil Filter - Honda Civic', currentStock: 2, minStock: 10, supplier: 'Honda' },
    { partNumber: 'BP-5678', description: 'Brake Pads - Toyota RAV4', currentStock: 1, minStock: 5, supplier: 'Toyota' },
    { partNumber: 'AF-9012', description: 'Air Filter - Ford F-150', currentStock: 3, minStock: 8, supplier: 'Ford' },
    { partNumber: 'SF-3456', description: 'Spark Plugs - Nissan Altima', currentStock: 4, minStock: 12, supplier: 'Nissan' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Delivered': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Normal': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Parts Counter Dashboard</h1>
          <p className="text-muted-foreground">
            Manage inventory, process orders, and fulfill parts requests
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Search Parts
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Order
          </Button>
        </div>
      </div>

      {/* Parts KPIs */}
      <WidgetSection title="Parts Metrics">
        <WidgetGrid columns={4}>
          {kpiData.map((kpi) => (
            <KPIWidget key={kpi.id} data={kpi} />
          ))}
        </WidgetGrid>
      </WidgetSection>

      {/* Active Orders and Requests */}
      <WidgetSection title="Active Operations">
        <WidgetRow>
          <WidgetGrid columns={2}>
            <WidgetBase 
              title="Pending Orders" 
              description="Purchase orders in progress"
              className="col-span-1"
            >
              <div className="space-y-3">
                {pendingOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium mt-1">{order.supplier}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items} items • Expected: {new Date(order.expectedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.total.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total</p>
                    </div>
                  </div>
                ))}
              </div>
            </WidgetBase>

            <WidgetBase 
              title="Parts Requests" 
              description="Technician requests for parts"
              className="col-span-1"
            >
              <div className="space-y-3">
                {partsRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{request.partNumber}</span>
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium mt-1">{request.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.technician} • {request.roNumber} • Qty: {request.quantity}
                      </p>
                      <p className="text-sm text-muted-foreground">{request.requestTime}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm">
                        Fulfill
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </WidgetBase>
          </WidgetGrid>
        </WidgetRow>
      </WidgetSection>

      {/* Inventory Management */}
      <WidgetSection title="Inventory Management">
        <WidgetGrid columns={3}>
          <WidgetBase 
            title="Low Stock Alerts" 
            description="Items requiring reorder"
            className="col-span-2"
          >
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.partNumber} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="font-medium">{item.partNumber}</span>
                      <Badge variant="outline">{item.supplier}</Badge>
                    </div>
                    <p className="text-sm font-medium mt-1">{item.description}</p>
                    <p className="text-sm text-muted-foreground">
                      Current: {item.currentStock} • Min: {item.minStock}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button size="sm">
                      Order
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Quick Actions" 
            description="Common parts tasks"
          >
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Search Inventory
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Create Purchase Order
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Truck className="mr-2 h-4 w-4" />
                Receive Shipment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                Issue Parts
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Stock Count
              </Button>
            </div>
          </WidgetBase>
        </WidgetGrid>
      </WidgetSection>

      {/* Daily Operations */}
      <WidgetSection title="Daily Operations">
        <WidgetGrid columns={2}>
          <WidgetBase 
            title="Today's Activity" 
            description="Parts counter metrics for today"
            className="col-span-1"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-muted-foreground">Parts Issued</div>
                </div>
                <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-xl font-bold text-green-600">3</div>
                  <div className="text-sm text-muted-foreground">Orders Received</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="text-xl font-bold text-purple-600">$2,450</div>
                  <div className="text-sm text-muted-foreground">Parts Revenue</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-xl font-bold text-yellow-600">8</div>
                  <div className="text-sm text-muted-foreground">Pending Requests</div>
                </div>
              </div>
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Supplier Performance" 
            description="Recent supplier metrics"
            className="col-span-1"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Honda Parts Direct</p>
                  <p className="text-sm text-muted-foreground">Last delivery: On time</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">98%</p>
                  <p className="text-sm text-muted-foreground">Fill rate</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Toyota Genuine Parts</p>
                  <p className="text-sm text-muted-foreground">Last delivery: 1 day late</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-yellow-600">85%</p>
                  <p className="text-sm text-muted-foreground">Fill rate</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Ford Motor Company</p>
                  <p className="text-sm text-muted-foreground">Last delivery: On time</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">92%</p>
                  <p className="text-sm text-muted-foreground">Fill rate</p>
                </div>
              </div>
            </div>
          </WidgetBase>
        </WidgetGrid>
      </WidgetSection>
    </div>
  );
}

