// Dashboard and Widget Types

export interface DashboardConfig {
  userId: string;
  role: UserRole;
  layout: WidgetLayout[];
  preferences: DashboardPreferences;
}

export interface DashboardPreferences {
  theme: 'light' | 'dark';
  autoRefresh: boolean;
  refreshInterval: number; // in seconds
  defaultDateRange: DateRange;
  timezone: string;
}

export interface WidgetLayout {
  id: string;
  type: WidgetType;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  config: WidgetConfig;
  isVisible: boolean;
}

export interface WidgetConfig {
  title: string;
  dataSource: string;
  filters?: Record<string, any>;
  chartType?: ChartType;
  displayOptions?: DisplayOptions;
}

export interface DisplayOptions {
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltips?: boolean;
  colorScheme?: string[];
  numberFormat?: 'currency' | 'percentage' | 'number';
  dateFormat?: string;
}

export enum WidgetType {
  KPI = 'kpi',
  BAR_CHART = 'bar-chart',
  LINE_CHART = 'line-chart',
  PIE_CHART = 'pie-chart',
  FUNNEL_CHART = 'funnel-chart',
  DATA_TABLE = 'data-table',
  LIST = 'list',
  KANBAN = 'kanban',
  GAUGE = 'gauge',
  HEATMAP = 'heatmap',
  TREND = 'trend'
}

export enum ChartType {
  BAR = 'bar',
  HORIZONTAL_BAR = 'horizontal-bar',
  LINE = 'line',
  AREA = 'area',
  PIE = 'pie',
  DONUT = 'donut',
  FUNNEL = 'funnel',
  SCATTER = 'scatter',
  GAUGE = 'gauge',
  HEATMAP = 'heatmap'
}

export enum UserRole {
  GENERAL_MANAGER = 'general-manager',
  SALES_MANAGER = 'sales-manager',
  SERVICE_MANAGER = 'service-manager',
  FINANCE_MANAGER = 'finance-manager',
  SALESPERSON = 'salesperson',
  SERVICE_ADVISOR = 'service-advisor',
  TECHNICIAN = 'technician',
  PARTS_COUNTER = 'parts-counter',
  ACCOUNTANT = 'accountant'
}

export interface DateRange {
  start: string;
  end: string;
  preset?: 'today' | 'yesterday' | 'last-7-days' | 'last-30-days' | 'mtd' | 'ytd' | 'custom';
}

// KPI Widget Types
export interface KPIWidget {
  id: string;
  title: string;
  value: number | string;
  previousValue?: number | string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  format: 'currency' | 'number' | 'percentage';
  icon?: string;
  color?: string;
  target?: number;
  unit?: string;
}

// Chart Data Types
export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  fill?: boolean;
}

// Table Data Types
export interface TableColumn {
  key: string;
  title: string;
  dataType: 'string' | 'number' | 'currency' | 'date' | 'boolean';
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  align?: 'left' | 'center' | 'right';
  format?: string;
}

export interface TableData {
  columns: TableColumn[];
  rows: Record<string, any>[];
  totalCount?: number;
  pagination?: {
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

// List Widget Types
export interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  status?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  date?: string;
  amount?: number;
  icon?: string;
  color?: string;
  actions?: ListAction[];
}

export interface ListAction {
  id: string;
  label: string;
  icon?: string;
  type: 'primary' | 'secondary' | 'danger';
  onClick: (item: ListItem) => void;
}

// Kanban Board Types
export interface KanbanBoard {
  columns: KanbanColumn[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  items: KanbanItem[];
  color?: string;
  limit?: number;
}

export interface KanbanItem {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  dueDate?: string;
  tags?: string[];
  color?: string;
}

// Filter Types
export interface FilterOption {
  key: string;
  label: string;
  type: 'select' | 'multiselect' | 'date' | 'daterange' | 'number' | 'text';
  options?: { value: string; label: string }[];
  defaultValue?: any;
}

export interface ActiveFilter {
  key: string;
  value: any;
  operator?: 'equals' | 'contains' | 'greater' | 'less' | 'between';
}

// Dashboard State Types
export interface DashboardState {
  isLoading: boolean;
  error?: string;
  lastUpdated?: string;
  filters: ActiveFilter[];
  dateRange: DateRange;
  selectedStore?: number;
  selectedEmployee?: string;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  children?: NavigationItem[];
  roles?: UserRole[];
  badge?: string | number;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary';
  onClick: () => void;
}

// Search Types
export interface SearchResult {
  id: string;
  type: 'customer' | 'vehicle' | 'deal' | 'repair-order' | 'appointment';
  title: string;
  subtitle?: string;
  description?: string;
  url?: string;
  relevance?: number;
}

export interface SearchFilters {
  types?: string[];
  dateRange?: DateRange;
  stores?: number[];
}

// Export Types
export interface ExportOptions {
  format: 'csv' | 'excel' | 'pdf';
  includeHeaders: boolean;
  dateRange?: DateRange;
  filters?: ActiveFilter[];
  columns?: string[];
}

// Real-time Update Types
export interface RealtimeUpdate {
  type: 'data-update' | 'notification' | 'user-action';
  payload: any;
  timestamp: string;
  source: string;
}

