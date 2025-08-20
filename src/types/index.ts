// Export all types from a central location
export * from './api';
export * from './deals';
export * from './service';
export * from './dashboard';
export * from './orders';
export * from './breadcrumb';

// Additional utility types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors: string[];
  code?: string;
  timestamp: string;
}

// Common utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ID = string | number;

// Date utility types
export type DateString = string; // ISO 8601 format
export type TimeString = string; // HH:mm format
export type DateTimeString = string; // ISO 8601 datetime format

// Status types used across the application
export type Status = 'active' | 'inactive' | 'pending' | 'archived';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type ActionType = 'create' | 'read' | 'update' | 'delete';

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox' | 'radio';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: any) => string | null;
  };
}

export interface FormData {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error?: string;
  lastUpdated?: DateTimeString;
}

// Selection types
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

// Theme types
export interface ThemeConfig {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

// Permission types
export interface Permission {
  resource: string;
  actions: ActionType[];
}

export interface RolePermissions {
  role: string;
  permissions: Permission[];
}

// Audit types
export interface AuditLog {
  id: string;
  userId: string;
  action: ActionType;
  resource: string;
  resourceId?: string;
  timestamp: DateTimeString;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

