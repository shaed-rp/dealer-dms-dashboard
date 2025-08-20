// Order Management Types

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PRODUCTION = 'IN_PRODUCTION',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum OrderType {
  VEHICLE = 'VEHICLE',
  PARTS = 'PARTS',
  SERVICE = 'SERVICE',
  ACCESSORIES = 'ACCESSORIES'
}

export type OEMStatus = 'PENDING' | 'CONFIRMED' | 'IN_PRODUCTION' | 'SHIPPED' | 'DELIVERED';
export type UpfitterStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'SHIPPED';
export type LogisticsStatus = 'PENDING' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED';
export type PaymentStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'OVERDUE';
export type AdministrativeStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
export enum OrderPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface Order {
  OrderKey: string;
  OrderNumber: string;
  CustomerKey: string;
  CustomerName: string;
  OrderType: OrderType;
  OrderDate: string;
  ExpectedDeliveryDate: string;
  ActualDeliveryDate?: string;
  TotalAmount: number;
  Status: OrderStatus;
  OEMStatus: OEMStatus;
  UpfitterStatus: UpfitterStatus;
  LogisticsStatus: LogisticsStatus;
  PaymentStatus: PaymentStatus;
  AdministrativeStatus: AdministrativeStatus;
  Notes?: string;
  Priority: OrderPriority;
}

// Order summary for dashboard widgets
export interface OrderSummary {
  totalOrders: number;
  pendingOrders: number;
  overdueOrders: number;
  averageDeliveryTime: number;
  ordersDueThisWeek: number;
}

// Order filter options
export interface OrderFilters {
  searchTerm: string;
  orderType: OrderType | 'all';
  status: OrderStatus | 'all';
  priority: OrderPriority | 'all';
  dateRange: {
    start: string;
    end: string;
  };
}

// Order action types
export type OrderAction = 'view' | 'edit' | 'update-status' | 'add-note' | 'export' | 'delete';
