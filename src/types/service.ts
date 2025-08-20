import { Currency, PersonalName, StreetAddress } from './api';

// Service Appointment Types
export interface ServiceAppointment {
  AppointmentKey: string;
  AppointmentNumber?: string;
  CustomerKey: string;
  VehicleKey: string;
  AppointmentDate: string;
  AppointmentTime?: string;
  Status: AppointmentStatus;
  ServiceAdvisorId?: string;
  EstimatedDuration?: number;
  Concerns?: string[];
  Notes?: string;
  CreatedDate: string;
  UpdatedDate?: string;
}

export enum AppointmentStatus {
  SCHEDULED = 'Scheduled',
  CONFIRMED = 'Confirmed',
  IN_PROGRESS = 'InProgress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  NO_SHOW = 'NoShow'
}

// Repair Order Types
export interface RepairOrder {
  RepairOrderKey: string;
  RepairOrderNumber: string;
  CustomerKey: string;
  VehicleKey: string;
  ServiceAdvisorId: string;
  TechnicianId?: string;
  Status: RepairOrderStatus;
  OpenDate: string;
  CloseDate?: string;
  PromisedDate?: string;
  TotalLabor?: Currency;
  TotalParts?: Currency;
  TotalSublet?: Currency;
  TotalTax?: Currency;
  TotalAmount?: Currency;
  CustomerConcerns?: string;
  TechnicianFindings?: string;
  WorkPerformed?: string;
  Mileage?: number;
  Jobs?: RepairOrderJob[];
  LaborItems?: RepairOrderLaborItem[];
  Parts?: RepairOrderPart[];
  Sublets?: RepairOrderSublet[];
}

export enum RepairOrderStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'InProgress',
  WAITING_PARTS = 'WaitingParts',
  WAITING_APPROVAL = 'WaitingApproval',
  COMPLETED = 'Completed',
  INVOICED = 'Invoiced',
  CLOSED = 'Closed',
  CANCELLED = 'Cancelled'
}

export interface RepairOrderJob {
  JobId: string;
  JobCode: string;
  Description: string;
  LaborHours: number;
  LaborRate: Currency;
  TotalLabor: Currency;
  Status: 'Pending' | 'InProgress' | 'Completed' | 'Declined';
}

export interface RepairOrderLaborItem {
  LaborItemId: string;
  Description: string;
  Hours: number;
  Rate: Currency;
  Total: Currency;
  TechnicianId?: string;
}

export interface RepairOrderPart {
  PartId: string;
  PartNumber: string;
  Description: string;
  Quantity: number;
  Cost: Currency;
  Price: Currency;
  Total: Currency;
  Status: 'Ordered' | 'Received' | 'Installed' | 'Backordered';
}

export interface RepairOrderSublet {
  SubletId: string;
  Description: string;
  Vendor: string;
  Cost: Currency;
  Price: Currency;
  Status: 'Pending' | 'Completed';
}

// Service Estimate Types
export interface ServiceEstimate {
  EstimateKey: string;
  EstimateNumber: string;
  CustomerKey: string;
  VehicleKey: string;
  ServiceAdvisorId: string;
  CreatedDate: string;
  ExpirationDate?: string;
  Status: EstimateStatus;
  TotalLabor?: Currency;
  TotalParts?: Currency;
  TotalSublet?: Currency;
  TotalTax?: Currency;
  TotalAmount?: Currency;
  Jobs?: EstimateJob[];
  LaborItems?: EstimateLaborItem[];
  Parts?: EstimatePart[];
  Sublets?: EstimateSublet[];
}

export enum EstimateStatus {
  DRAFT = 'Draft',
  SENT = 'Sent',
  APPROVED = 'Approved',
  DECLINED = 'Declined',
  EXPIRED = 'Expired',
  CONVERTED = 'Converted'
}

export interface EstimateJob {
  JobId: string;
  JobCode: string;
  Description: string;
  LaborHours: number;
  LaborRate: Currency;
  TotalLabor: Currency;
}

export interface EstimateLaborItem {
  LaborItemId: string;
  Description: string;
  Hours: number;
  Rate: Currency;
  Total: Currency;
}

export interface EstimatePart {
  PartId: string;
  PartNumber: string;
  Description: string;
  Quantity: number;
  Cost: Currency;
  Price: Currency;
  Total: Currency;
}

export interface EstimateSublet {
  SubletId: string;
  Description: string;
  Vendor: string;
  Cost: Currency;
  Price: Currency;
}

// Parts Invoice (Counter Ticket) Types
export interface PartsInvoice {
  PartsInvoiceKey: string;
  InvoiceNumber: string;
  CustomerKey?: string;
  EmployeeId: string;
  InvoiceDate: string;
  Status: PartsInvoiceStatus;
  TotalParts: Currency;
  TotalTax: Currency;
  TotalAmount: Currency;
  Parts: PartsInvoicePart[];
  IsDeliverable?: boolean;
  IsDelivered?: boolean;
}

export enum PartsInvoiceStatus {
  OPEN = 'Open',
  CLOSED = 'Closed',
  VOIDED = 'Voided'
}

export interface PartsInvoicePart {
  PartId: string;
  PartNumber: string;
  Description: string;
  Quantity: number;
  Cost: Currency;
  Price: Currency;
  Total: Currency;
}

// Parts Inventory Types
export interface Part {
  PartKey: string;
  PartNumber: string;
  Description: string;
  Category?: string;
  Manufacturer?: string;
  Cost: Currency;
  Price: Currency;
  QuantityOnHand: number;
  QuantityOnOrder?: number;
  MinimumStock?: number;
  MaximumStock?: number;
  Location?: string;
  Superseded?: boolean;
  SupersededBy?: string;
}

// Service Employee Types
export interface ServiceEmployee {
  EmployeeId: string;
  PersonalName: PersonalName;
  EmployeeType: ServiceEmployeeType;
  IsActive: boolean;
  HourlyRate?: Currency;
  EfficiencyRating?: number;
  CertificationLevel?: string;
}

export enum ServiceEmployeeType {
  SERVICE_ADVISOR = 'ServiceWriter',
  SERVICE_MANAGER = 'ServiceManager',
  TECHNICIAN = 'Technician',
  QUICK_LUBE_TECH = 'QuickLubeTechnician',
  PARTS_COUNTER = 'PartsCounter',
  PARTS_MANAGER = 'PartsManager'
}

// Payment Types
export interface ServicePayment {
  PaymentKey: string;
  PaymentMethodKey: string;
  Amount: Currency;
  PaymentDate: string;
  RepairOrderKey?: string;
  PartsInvoiceKey?: string;
  Reference?: string;
}

export interface PaymentMethod {
  PaymentMethodKey: string;
  Name: string;
  Type: 'Cash' | 'Check' | 'CreditCard' | 'DebitCard' | 'ACH' | 'Other';
  IsActive: boolean;
}

// Deferred Jobs (Customer Declined Services)
export interface DeferredJob {
  DeferredJobId: string;
  RepairOrderKey?: string;
  VehicleKey: string;
  JobCode: string;
  Description: string;
  EstimatedCost: Currency;
  DeferredDate: string;
  Reason?: string;
  Priority: 'Low' | 'Medium' | 'High' | 'Critical';
  FollowUpDate?: string;
}

// Fleet Driver Types
export interface FleetDriver {
  FleetDriverId: string;
  PersonalName: PersonalName;
  DriverLicense?: string;
  EmployeeId?: string;
  CompanyName?: string;
  ContactInfo?: {
    Email?: string;
    Phone?: string;
    Address?: StreetAddress;
  };
  IsActive: boolean;
}

// Service Dashboard Summary Types
export interface ServiceDashboardSummary {
  todayAppointments: number;
  openRepairOrders: number;
  completedRepairOrders: number;
  waitingForParts: number;
  waitingForApproval: number;
  totalRevenue: number;
  averageRepairOrderValue: number;
  technicianEfficiency: number;
  customerSatisfactionScore?: number;
}

