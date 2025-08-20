
import { WidgetGrid, WidgetRow, WidgetSection } from '@/components/widgets/WidgetGrid';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { WidgetBase } from '@/components/widgets/WidgetBase';
import { MockDataGenerator } from '@/data/mockData';
import { UserRole } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calculator, FileText, TrendingUp, AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';

/**
 * AccountantDashboard - Financial reporting and transaction management dashboard for accountants
 * 
 * A comprehensive financial dashboard that provides accounting metrics, transaction
 * monitoring, report generation, and accounts receivable tracking. Designed for
 * accountants to manage financial operations, monitor cash flow, and ensure
 * compliance with reporting requirements.
 * 
 * @component
 * @example
 * ```tsx
 * <AccountantDashboard />
 * ```
 * 
 * @returns {JSX.Element} Rendered accountant dashboard
 */
export function AccountantDashboard() {
  const kpiData = MockDataGenerator.generateKPIData(UserRole.ACCOUNTANT);

  const pendingTransactions = [
    {
      id: 'TXN-001',
      type: 'Deal Funding',
      dealNumber: 'D-12345',
      amount: 45000,
      customer: 'John Smith',
      daysOld: 2,
      priority: 'High'
    },
    {
      id: 'TXN-002',
      type: 'Service Payment',
      roNumber: 'RO-12346',
      amount: 850,
      customer: 'Sarah Johnson',
      daysOld: 1,
      priority: 'Normal'
    },
    {
      id: 'TXN-003',
      type: 'Parts Invoice',
      poNumber: 'PO-2024-001',
      amount: 1250,
      supplier: 'Honda Parts Direct',
      daysOld: 5,
      priority: 'High'
    }
  ];

  const monthlyReports = [
    {
      name: 'Sales Revenue Report',
      period: 'January 2024',
      status: 'Ready',
      dueDate: '2024-02-05',
      type: 'Monthly'
    },
    {
      name: 'Service Department P&L',
      period: 'January 2024',
      status: 'In Progress',
      dueDate: '2024-02-05',
      type: 'Monthly'
    },
    {
      name: 'Parts Inventory Valuation',
      period: 'January 2024',
      status: 'Pending',
      dueDate: '2024-02-05',
      type: 'Monthly'
    },
    {
      name: 'Cash Flow Statement',
      period: 'Q4 2023',
      status: 'Overdue',
      dueDate: '2024-01-31',
      type: 'Quarterly'
    }
  ];

  const accountsReceivable = [
    { customer: 'ABC Leasing Corp', amount: 125000, daysOld: 15, type: 'Lease Funding' },
    { customer: 'XYZ Insurance', amount: 8500, daysOld: 45, type: 'Insurance Claim' },
    { customer: 'Fleet Solutions Inc', amount: 35000, daysOld: 30, type: 'Fleet Purchase' },
    { customer: 'City Municipal', amount: 12000, daysOld: 60, type: 'Government Contract' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
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

  const getAgeColor = (days: number) => {
    if (days <= 30) return 'text-green-600';
    if (days <= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Accounting Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor financial transactions, reports, and accounting operations
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button>
            <Calculator className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </div>
      </div>

      {/* Financial KPIs */}
      <WidgetSection title="Financial Metrics">
        <WidgetGrid columns={4}>
          {kpiData.map((kpi) => (
            <KPIWidget key={kpi.id} data={kpi} />
          ))}
        </WidgetGrid>
      </WidgetSection>

      {/* Pending Transactions and Reports */}
      <WidgetSection title="Pending Items">
        <WidgetRow>
          <WidgetGrid columns={2}>
            <WidgetBase 
              title="Pending Transactions" 
              description="Items requiring accounting attention"
              className="col-span-1"
            >
              <div className="space-y-3">
                {pendingTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{transaction.type}</span>
                        <Badge className={getPriorityColor(transaction.priority)}>
                          {transaction.priority}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium mt-1">
                        {transaction.dealNumber || transaction.roNumber || transaction.poNumber}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.customer || transaction.supplier} • {transaction.daysOld} days old
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${transaction.amount.toLocaleString()}</p>
                      <Button size="sm" variant="outline">
                        Process
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </WidgetBase>

            <WidgetBase 
              title="Monthly Reports" 
              description="Financial reporting status"
              className="col-span-1"
            >
              <div className="space-y-3">
                {monthlyReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{report.name}</span>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {report.period} • Due: {new Date(report.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {report.status === 'Ready' && (
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      {report.status === 'Overdue' && (
                        <Button size="sm" variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                      )}
                      {report.status === 'In Progress' && (
                        <Button size="sm" variant="outline">
                          <Clock className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </WidgetBase>
          </WidgetGrid>
        </WidgetRow>
      </WidgetSection>

      {/* Financial Analysis */}
      <WidgetSection title="Financial Analysis">
        <WidgetGrid columns={3}>
          <WidgetBase 
            title="Accounts Receivable" 
            description="Outstanding customer balances"
            className="col-span-2"
          >
            <div className="space-y-3">
              {accountsReceivable.map((account, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{account.customer}</span>
                      <Badge variant="outline">{account.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className={getAgeColor(account.daysOld)}>
                        {account.daysOld} days old
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${account.amount.toLocaleString()}</p>
                    <Button size="sm" variant="outline">
                      Follow Up
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Quick Actions" 
            description="Common accounting tasks"
          >
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Calculator className="mr-2 h-4 w-4" />
                Journal Entry
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="mr-2 h-4 w-4" />
                Process Payment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                Reconcile Account
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="mr-2 h-4 w-4" />
                Review Transactions
              </Button>
            </div>
          </WidgetBase>
        </WidgetGrid>
      </WidgetSection>

      {/* Monthly Summary */}
      <WidgetSection title="Monthly Summary">
        <WidgetGrid columns={2}>
          <WidgetBase 
            title="Department Performance" 
            description="Revenue by department this month"
            className="col-span-1"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <p className="font-medium">Sales Department</p>
                  <p className="text-sm text-muted-foreground">45 deals closed</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">$1,250,000</p>
                  <p className="text-sm text-muted-foreground">+12% vs last month</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="font-medium">Service Department</p>
                  <p className="text-sm text-muted-foreground">285 ROs completed</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">$185,000</p>
                  <p className="text-sm text-muted-foreground">+8% vs last month</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div>
                  <p className="font-medium">Parts Department</p>
                  <p className="text-sm text-muted-foreground">1,250 parts sold</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-purple-600">$95,000</p>
                  <p className="text-sm text-muted-foreground">+5% vs last month</p>
                </div>
              </div>
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Cash Flow Summary" 
            description="Current month cash position"
            className="col-span-1"
          >
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-2xl font-bold text-green-600">$485,000</div>
                <div className="text-sm text-muted-foreground">Net Cash Flow (MTD)</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground">Cash In</p>
                  <p className="font-medium text-green-600">$1,530,000</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Cash Out</p>
                  <p className="font-medium text-red-600">$1,045,000</p>
                </div>
              </div>
              <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-muted-foreground">Current Bank Balance</p>
                <p className="font-medium text-blue-600">$2,150,000</p>
              </div>
            </div>
          </WidgetBase>
        </WidgetGrid>
      </WidgetSection>
    </div>
  );
}

