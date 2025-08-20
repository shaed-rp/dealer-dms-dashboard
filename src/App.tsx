import React, { createContext, useContext, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { UserRole } from '@/types';
import { GeneralManagerDashboard } from '@/components/dashboard/GeneralManagerDashboard';
import { SalesManagerDashboard } from '@/components/dashboard/SalesManagerDashboard';
import { ServiceManagerDashboard } from '@/components/dashboard/ServiceManagerDashboard';
import { FinanceManagerDashboard } from '@/components/dashboard/FinanceManagerDashboard';
import { SalespersonDashboard } from '@/components/dashboard/SalespersonDashboard';
import { ServiceAdvisorDashboard } from '@/components/dashboard/ServiceAdvisorDashboard';
import { TechnicianDashboard } from '@/components/dashboard/TechnicianDashboard';
import { PartsCounterDashboard } from '@/components/dashboard/PartsCounterDashboard';
import { AccountantDashboard } from '@/components/dashboard/AccountantDashboard';
import { 
  DealsPage, 
  ProspectsPage, 
  InventoryPage, 
  AppointmentsPage, 
  CustomersPage, 
  VehicleAppraisalsPage,
  RepairOrdersPage,
  ServiceEstimatesPage,
  PartsManagementPage,
  AccountingPage,
  FinancialReportsPage,
  PaymentsPage,
  AnalyticsPage,
  OrderManagementPage
} from '@/pages';
import { BreadcrumbTest } from '@/components/layout/BreadcrumbTest';
import './App.css';

// Create context for role management
interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.GENERAL_MANAGER);
  const location = useLocation();

  // Update role based on current path
  React.useEffect(() => {
    const pathToRole: Record<string, UserRole> = {
      '/': UserRole.GENERAL_MANAGER,
      '/general-manager': UserRole.GENERAL_MANAGER,
      '/sales-manager': UserRole.SALES_MANAGER,
      '/service-manager': UserRole.SERVICE_MANAGER,
      '/finance-manager': UserRole.FINANCE_MANAGER,
      '/salesperson': UserRole.SALESPERSON,
      '/service-advisor': UserRole.SERVICE_ADVISOR,
      '/technician': UserRole.TECHNICIAN,
      '/parts-counter': UserRole.PARTS_COUNTER,
      '/accountant': UserRole.ACCOUNTANT,
    };

    const role = pathToRole[location.pathname];
    if (role && role !== currentRole) {
      setCurrentRole(role);
    }
  }, [location.pathname, currentRole]);

  return (
    <RoleContext.Provider value={{ currentRole, setCurrentRole }}>
      <DashboardLayout 
        currentRole={currentRole} 
        onRoleChange={setCurrentRole}
      >
        <Routes>
          {/* Dashboard Routes */}
          <Route path="/" element={<GeneralManagerDashboard />} />
          <Route path="/general-manager" element={<GeneralManagerDashboard />} />
          <Route path="/sales-manager" element={<SalesManagerDashboard />} />
          <Route path="/service-manager" element={<ServiceManagerDashboard />} />
          <Route path="/finance-manager" element={<FinanceManagerDashboard />} />
          <Route path="/salesperson" element={<SalespersonDashboard />} />
          <Route path="/service-advisor" element={<ServiceAdvisorDashboard />} />
          <Route path="/technician" element={<TechnicianDashboard />} />
          <Route path="/parts-counter" element={<PartsCounterDashboard />} />
          <Route path="/accountant" element={<AccountantDashboard />} />
          
          {/* Sales Routes */}
          <Route path="/sales/deals" element={<DealsPage />} />
          <Route path="/sales/prospects" element={<ProspectsPage />} />
          <Route path="/sales/inventory" element={<InventoryPage />} />
          <Route path="/sales/appraisals" element={<VehicleAppraisalsPage />} />
          
          {/* Service Routes */}
          <Route path="/service/appointments" element={<AppointmentsPage />} />
          <Route path="/service/repair-orders" element={<RepairOrdersPage />} />
          <Route path="/service/estimates" element={<ServiceEstimatesPage />} />
          <Route path="/service/parts" element={<PartsManagementPage />} />
          
          {/* Customer Routes */}
          <Route path="/customers" element={<CustomersPage />} />
          
          {/* Order Management Routes */}
          <Route path="/orders" element={<OrderManagementPage />} />
          
          {/* Finance Routes */}
          <Route path="/finance/accounting" element={<AccountingPage />} />
          <Route path="/finance/reports" element={<FinancialReportsPage />} />
          <Route path="/finance/payments" element={<PaymentsPage />} />
          
          {/* Analytics Routes */}
          <Route path="/analytics" element={<AnalyticsPage />} />
          
          {/* Test Routes */}
          <Route path="/breadcrumb-test" element={<BreadcrumbTest />} />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DashboardLayout>
    </RoleContext.Provider>
  );
}

export default App;

