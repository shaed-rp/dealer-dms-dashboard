# Pritchard Companies Intelligence Dashboard - API Data Mapping Guide

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-username/dealership-dashboard)

## Executive Summary

**Current Version**: 1.0.0  
**Last Updated**: January 15, 2025

This document provides a comprehensive mapping of all Pritchard Companies API endpoints and data points to their corresponding locations within the dashboard interface. The mapping is organized by user role and functional area to ensure complete data accessibility and optimal user experience.

---

## Table of Contents

1. [API Endpoint Overview](#api-endpoint-overview)
2. [Role-Based Data Access Matrix](#role-based-data-access-matrix)
3. [Dashboard Component Mapping](#dashboard-component-mapping)
4. [Data Flow Architecture](#data-flow-architecture)
5. [Implementation Guidelines](#implementation-guidelines)

---

## API Endpoint Overview

### Accounting APIs

| API Endpoint | Data Structure | Primary Use Case |
|--------------|----------------|------------------|
| `GetDepartmentCodes` | Department hierarchy | Financial reporting, cost center analysis |
| `GetDivisions` | Division structure | Multi-location management |
| `GetChartOfAccounts` | Account codes | Financial categorization |
| `GetGLAccounts` | General ledger | Detailed financial tracking |
| `GetAccountingPeriods` | Fiscal periods | Period-based reporting |

### Sales APIs

| API Endpoint | Data Structure | Primary Use Case |
|--------------|----------------|------------------|
| `PullDeals` | Basic deal information | Deal listing, quick overview |
| `PullDealsFull` | Complete deal details | Detailed deal analysis |
| `PushDeals` | Deal creation/update | Deal management workflow |
| `PullProspects` | Customer prospects | Lead management |
| `PushProspects` | Prospect creation | Lead capture |
| `PullAppraisals` | Vehicle appraisals | Trade-in management |
| `PushAppraisals` | Appraisal creation | Valuation workflow |

### Service APIs

| API Endpoint | Data Structure | Primary Use Case |
|--------------|----------------|------------------|
| `PullAppointments` | Service appointments | Scheduling management |
| `PushAppointments` | Appointment creation | Customer booking |
| `PullRepairOrders` | Service work orders | Service tracking |
| `PushRepairOrders` | RO creation | Service workflow |
| `PullEstimates` | Service estimates | Pricing management |
| `PushEstimates` | Estimate creation | Quote generation |

### Inventory APIs

| API Endpoint | Data Structure | Primary Use Case |
|--------------|----------------|------------------|
| `PullVehicles` | Vehicle inventory | Stock management |
| `PushVehicles` | Vehicle updates | Inventory maintenance |
| `PullParts` | Parts inventory | Parts management |
| `PushParts` | Parts updates | Inventory control |

### Employee APIs

| API Endpoint | Data Structure | Primary Use Case |
|--------------|----------------|------------------|
| `PullEmployees` | Staff information | Personnel management |
| `PushEmployees` | Employee updates | HR management |

### Customer APIs

| API Endpoint | Data Structure | Primary Use Case |
|--------------|----------------|------------------|
| `PullCustomers` | Customer database | CRM functionality |
| `PushCustomers` | Customer updates | Customer management |

---

## Role-Based Data Access Matrix

### General Manager Dashboard

**Primary Data Sources:**
- `PullDealsFull` → Executive KPIs, revenue metrics
- `PullVehicles` → Inventory health overview
- `PullEmployees` → Performance metrics
- `GetDepartmentCodes` → Department performance analysis

**Dashboard Locations:**

#### Key Performance Indicators Section
- **Total Revenue (MTD)**: Aggregated from `PullDealsFull.TotalGross`
- **Gross Profit (MTD)**: Calculated from `PullDealsFull.GrossProfit`
- **Units Sold (MTD)**: Count from `PullDealsFull` where `DealStatus = "Closed"`
- **Customer Satisfaction**: Derived from service data and customer feedback

#### Performance Analytics Section
- **Revenue Trend Chart**: Monthly aggregation of `PullDealsFull.TotalGross` by `DateSold`
- **Department Performance Pie Chart**: Revenue breakdown by department using `GetDepartmentCodes`
- **Inventory Health Table**: `PullVehicles` data showing age analysis using `DaysOnLot`

#### Operational Overview Section
- **Recent Alerts**: System-generated alerts based on business rules
- **Daily Summary**: Real-time counts from various APIs
- **Quick Actions**: Management functions and report generation

### Sales Manager Dashboard

**Primary Data Sources:**
- `PullDealsFull` → Deal pipeline and performance
- `PullProspects` → Lead management
- `PullEmployees` → Sales team performance
- `PullVehicles` → Available inventory

**Dashboard Locations:**

#### Sales KPIs Section
- **Monthly Sales Revenue**: Sum of `PullDealsFull.TotalGross` for current month
- **Deals Closed**: Count of deals with `DealStatus = "Closed"`
- **Average Deal Size**: `TotalGross` average across closed deals
- **Conversion Rate**: Prospects to deals ratio

#### Performance Analytics Section
- **Sales Team Performance Chart**: Individual performance from `PullDealsFull.SalesPersonName`
- **Deal Pipeline Visualization**: Deals by status from `PullDealsFull.DealStatus`

#### Recent Deals Table
- **Deal Data**: Complete deal information from `PullDealsFull`
- **Sortable Columns**: Deal number, customer, vehicle, status, gross profit
- **Interactive Filters**: Status, date range, salesperson

#### Team Management Section
- **Salesperson Leaderboard**: Performance ranking from deal data
- **Active Prospects**: Current leads from `PullProspects`
- **Inventory Assignment**: Available vehicles from `PullVehicles`

### Service Manager Dashboard

**Primary Data Sources:**
- `PullRepairOrders` → Service operations
- `PullAppointments` → Scheduling data
- `PullEmployees` → Technician performance
- `PullParts` → Parts availability

**Dashboard Locations:**

#### Service KPIs Section
- **Service Revenue (MTD)**: Sum from `PullRepairOrders.TotalAmount`
- **ROs Completed**: Count of completed repair orders
- **Average RO Value**: Mean of `TotalAmount` across ROs
- **Customer Satisfaction**: Service-specific ratings

#### Service Lane Status Section
- **RO Status Distribution**: Count by `PullRepairOrders.Status`
- **Technician Efficiency Chart**: Performance metrics by technician
- **Bay Utilization**: Current service bay status

#### Today's Schedule Section
- **Appointments**: Today's data from `PullAppointments`
- **Technician Assignments**: Work distribution
- **Parts Availability**: Critical parts status from `PullParts`

### Finance Manager Dashboard

**Primary Data Sources:**
- `PullDealsFull` → Financial deal details
- `GetGLAccounts` → Financial categorization
- `GetAccountingPeriods` → Period management

**Dashboard Locations:**

#### Financial KPIs Section
- **F&I Revenue**: Finance and insurance income from deals
- **Deal Funding Status**: Pending approvals and funding
- **Average Finance Rate**: Loan rate analysis
- **Product Penetration**: F&I product attachment rates

#### Deal Analysis Section
- **Funding Pipeline**: Deals awaiting finance approval
- **Rate Analysis**: Interest rate trends and margins
- **Product Performance**: F&I product sales metrics

### Individual Contributor Dashboards

#### Salesperson Dashboard
**Data Focus**: Personal performance and customer management
- **Personal KPIs**: Individual metrics from `PullDealsFull`
- **My Prospects**: Assigned leads from `PullProspects`
- **My Deals**: Personal deal pipeline
- **Customer Follow-ups**: CRM activities

#### Service Advisor Dashboard
**Data Focus**: Customer service and RO management
- **My Appointments**: Assigned appointments from `PullAppointments`
- **Active ROs**: Current repair orders
- **Customer Communications**: Service history and notes
- **Upselling Opportunities**: Additional service recommendations

#### Technician Dashboard
**Data Focus**: Work assignments and productivity
- **My Work Orders**: Assigned ROs from `PullRepairOrders`
- **Productivity Metrics**: Efficiency and quality measures
- **Parts Requests**: Required parts from `PullParts`
- **Training Status**: Certification and skill tracking

#### Parts Counter Dashboard
**Data Focus**: Inventory and counter sales
- **Parts Inventory**: Current stock from `PullParts`
- **Counter Sales**: Direct parts sales
- **Special Orders**: Customer part requests
- **Vendor Management**: Supplier relationships

#### Accountant Dashboard
**Data Focus**: Financial transactions and reporting
- **Transaction Processing**: Deal funding and payments
- **Monthly Reports**: Financial statement preparation
- **Accounts Receivable**: Outstanding customer balances
- **Cash Flow Analysis**: Financial position tracking

---

## Dashboard Component Mapping

### Widget Components

#### KPI Widgets
**Data Sources**: Multiple APIs aggregated
**Location**: Top section of all dashboards
**Refresh Rate**: Real-time or configurable intervals

**Implementation**:
```typescript
interface KPIData {
  id: string;
  title: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  previousValue: number;
  icon: string;
  format: 'currency' | 'number' | 'percentage';
}
```

#### Chart Components
**Data Sources**: Aggregated API data
**Types**: Line, Bar, Pie, Area charts
**Interactivity**: Drill-down, filtering, date range selection

**Revenue Chart Implementation**:
```typescript
interface RevenueData {
  month: string;
  sales: number;
  service: number;
  parts: number;
  finance: number;
}
```

#### Data Tables
**Data Sources**: Direct API responses with client-side processing
**Features**: Sorting, filtering, pagination, search
**Export**: CSV, PDF, Excel formats

**Deals Table Implementation**:
```typescript
interface DealsTableData {
  dealKey: string;
  dealNumber: string;
  customerName: string;
  vehicleInfo: string;
  dealStatus: string;
  totalGross: number;
  dateSold: string;
  salesperson: string;
}
```

### Navigation Components

#### Sidebar Navigation
**Role-Based Visibility**: Menu items filtered by user role
**Badge Notifications**: Real-time counts from APIs
**Collapsible Design**: Mobile-responsive layout

#### Header Components
**Role Selector**: Switch between role views
**Search Functionality**: Global search across all data
**Notifications**: Alert system integration

---

## Data Flow Architecture

### API Integration Layer

#### Data Fetching Strategy
1. **Initial Load**: Critical data fetched on dashboard mount
2. **Periodic Refresh**: Configurable intervals for real-time updates
3. **On-Demand**: User-triggered data refresh
4. **Background Sync**: Non-critical data updated in background

#### Caching Strategy
1. **Browser Cache**: Short-term storage for frequently accessed data
2. **Session Storage**: User-specific data during session
3. **Local Storage**: User preferences and settings
4. **API Response Cache**: Reduce redundant API calls

#### Error Handling
1. **Graceful Degradation**: Show cached data when APIs unavailable
2. **Retry Logic**: Automatic retry for failed requests
3. **User Feedback**: Clear error messages and recovery options
4. **Fallback Data**: Mock data for development and testing

### State Management

#### Global State
- User authentication and role information
- Application-wide settings and preferences
- Shared data across multiple components

#### Component State
- Local component data and UI state
- Form inputs and validation
- Temporary data and calculations

#### API State
- Loading states for async operations
- Error states and messages
- Data freshness and cache status

---

## Implementation Guidelines

### API Integration Best Practices

#### Authentication
```typescript
interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  timeout: number;
  retryAttempts: number;
}
```

#### Request Handling
```typescript
class PritchardCompaniesApiService {
  async pullDeals(filters?: DealFilters): Promise<Deal[]> {
    // Implementation with error handling and caching
  }
  
  async pushDeal(deal: Deal): Promise<void> {
    // Implementation with validation and retry logic
  }
}
```

#### Data Transformation
```typescript
interface DataTransformer {
  transformDealsForChart(deals: Deal[]): ChartData[];
  transformVehiclesForTable(vehicles: Vehicle[]): TableData[];
  aggregateKPIData(data: any[]): KPIData[];
}
```

### Performance Optimization

#### Code Splitting
- Lazy load dashboard components by role
- Dynamic imports for chart libraries
- Route-based code splitting

#### Data Optimization
- Implement virtual scrolling for large datasets
- Use pagination for table components
- Optimize chart rendering with data sampling

#### Caching Strategy
- Implement service worker for offline capability
- Use React Query or SWR for API state management
- Cache computed data and expensive calculations

### Security Considerations

#### Data Protection
- Implement role-based data filtering
- Sanitize all user inputs
- Use HTTPS for all API communications

#### Access Control
- Validate user permissions on each API call
- Implement session timeout and renewal
- Log all data access for audit purposes

### Testing Strategy

#### Unit Testing
- Test individual components with mock data
- Validate data transformation functions
- Test error handling scenarios

#### Integration Testing
- Test API integration with real endpoints
- Validate data flow between components
- Test role-based access controls

#### End-to-End Testing
- Test complete user workflows
- Validate dashboard functionality across roles
- Test responsive design on multiple devices

---

## Conclusion

This comprehensive mapping ensures that all Pritchard Companies API data points are accessible through the dashboard interface, with appropriate role-based access controls and optimal user experience design. The implementation follows modern web development best practices and provides a scalable foundation for future enhancements.

For technical implementation details, refer to the project source code and TypeScript interfaces provided in the dashboard repository.

