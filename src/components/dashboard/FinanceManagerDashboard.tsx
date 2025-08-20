
import { WidgetGrid, WidgetRow, WidgetSection } from '@/components/widgets/WidgetGrid';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { WidgetBase } from '@/components/widgets/WidgetBase';
import { MockDataGenerator, mockDeals } from '@/data/mockData';
import { UserRole } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, CreditCard, Shield, CheckCircle, Clock, AlertCircle } from 'lucide-react';

/**
 * FinanceManagerDashboard - Finance and insurance dashboard for finance managers
 * 
 * A comprehensive F&I dashboard that provides financial performance metrics,
 * lender relationship tracking, product penetration analysis, and deal approval
 * workflows. Designed for finance operations oversight and revenue optimization.
 * 
 * @component
 * @example
 * ```tsx
 * <FinanceManagerDashboard />
 * ```
 * 
 * @returns {JSX.Element} Rendered finance manager dashboard
 */
export function FinanceManagerDashboard() {
  const kpiData = MockDataGenerator.generateKPIData(UserRole.FINANCE_MANAGER);
  const financeDeals = mockDeals.filter(deal => deal.dealType === 'Finance' || deal.dealType === 'Lease').slice(0, 8);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Declined': return 'bg-red-100 text-red-800';
      case 'Submitted': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const lenders = [
    { name: 'Chase Auto Finance', approvalRate: 85, avgRate: 4.2, volume: 45 },
    { name: 'Wells Fargo Dealer Services', approvalRate: 78, avgRate: 4.8, volume: 38 },
    { name: 'Ally Financial', approvalRate: 82, avgRate: 4.5, volume: 42 },
    { name: 'Capital One Auto Finance', approvalRate: 75, avgRate: 5.1, volume: 28 },
    { name: 'Santander Consumer', approvalRate: 68, avgRate: 6.2, volume: 22 }
  ];

  const fiProducts = [
    { name: 'Extended Warranty', penetration: 72, revenue: 45200, avgPrice: 1850 },
    { name: 'GAP Insurance', penetration: 65, revenue: 28400, avgPrice: 895 },
    { name: 'Credit Life', penetration: 45, revenue: 18900, avgPrice: 650 },
    { name: 'Paint Protection', penetration: 38, revenue: 15600, avgPrice: 1200 },
    { name: 'Tire & Wheel', penetration: 28, revenue: 12800, avgPrice: 1450 }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Finance Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor F&I performance, lender relationships, and product penetration
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <CreditCard className="mr-2 h-4 w-4" />
            Submit Application
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Deal
          </Button>
        </div>
      </div>

      {/* KPI Section */}
      <WidgetSection title="F&I Metrics">
        <WidgetGrid columns={4}>
          {kpiData.map((kpi) => (
            <KPIWidget key={kpi.id} data={kpi} />
          ))}
        </WidgetGrid>
      </WidgetSection>

      {/* Finance Performance */}
      <WidgetSection title="Finance Performance">
        <WidgetRow>
          <WidgetGrid columns={2}>
            <WidgetBase 
              title="Lender Performance" 
              description="Approval rates and terms by lender"
              className="col-span-1"
            >
              <div className="space-y-3">
                {lenders.map((lender, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-sm">{lender.name}</p>
                      <Badge variant="outline">{lender.volume} deals</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Approval Rate</p>
                        <p className={`font-medium ${lender.approvalRate >= 80 ? 'text-green-600' : lender.approvalRate >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {lender.approvalRate}%
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Rate</p>
                        <p className="font-medium">{lender.avgRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </WidgetBase>

            <WidgetBase 
              title="Product Penetration" 
              description="F&I product performance"
              className="col-span-1"
            >
              <div className="space-y-3">
                {fiProducts.map((product, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-sm">{product.name}</p>
                      <Badge variant="outline">{product.penetration}%</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-medium">${product.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Price</p>
                        <p className="font-medium">${product.avgPrice}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </WidgetBase>
          </WidgetGrid>
        </WidgetRow>
      </WidgetSection>

      {/* Recent Finance Deals */}
      <WidgetSection title="Recent Finance Activity">
        <WidgetBase 
          title="Finance Deals" 
          description="Latest financing transactions"
        >
          <div className="space-y-3">
            {financeDeals.map((deal) => {
              const status = MockDataGenerator.getRandomElement(['Approved', 'Pending', 'Submitted', 'Declined']);
              const lender = MockDataGenerator.getRandomElement(['Chase Auto', 'Wells Fargo', 'Ally Financial', 'Capital One']);
              const rate = MockDataGenerator.getRandomCurrency(3.5, 7.2);
              
              return (
                <div key={deal.dealKey} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium">Deal #{deal.dealNumber}</p>
                        <p className="text-sm text-muted-foreground">{deal.customerName}</p>
                      </div>
                      <Badge className={getStatusColor(status)}>
                        {status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{deal.vehicleInfo}</p>
                  </div>
                  
                  <div className="text-right mr-4">
                    <p className="font-medium">${deal.backendGross?.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Backend Gross</p>
                  </div>
                  
                  <div className="text-right mr-4">
                    <p className="text-sm font-medium">{lender}</p>
                    <p className="text-sm text-muted-foreground">{rate}% APR</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    {status === 'Pending' && (
                      <Button variant="ghost" size="sm">
                        <Clock className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </WidgetBase>
      </WidgetSection>

      {/* Finance Tools and Actions */}
      <WidgetSection title="Tools & Actions">
        <WidgetGrid columns={3}>
          <WidgetBase 
            title="Pending Approvals" 
            description="Applications awaiting decision"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <div>
                    <p className="font-medium">Deal #12345</p>
                    <p className="text-sm text-muted-foreground">Chase Auto - 2 hours</p>
                  </div>
                </div>
                <Button size="sm">Review</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <div>
                    <p className="font-medium">Deal #12346</p>
                    <p className="text-sm text-muted-foreground">Wells Fargo - 4 hours</p>
                  </div>
                </div>
                <Button size="sm">Review</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <div>
                    <p className="font-medium">Deal #12347</p>
                    <p className="text-sm text-muted-foreground">Ally - Needs docs</p>
                  </div>
                </div>
                <Button size="sm" variant="destructive">Urgent</Button>
              </div>
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Product Opportunities" 
            description="Upsell recommendations"
          >
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <p className="font-medium">Extended Warranty</p>
                </div>
                <p className="text-sm text-muted-foreground">3 deals missing warranty</p>
                <p className="text-sm font-medium text-green-600">+$5,550 potential</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                  <p className="font-medium">GAP Insurance</p>
                </div>
                <p className="text-sm text-muted-foreground">5 financed deals without GAP</p>
                <p className="text-sm font-medium text-blue-600">+$4,475 potential</p>
              </div>
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Quick Actions" 
            description="Common F&I tasks"
          >
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Submit Credit App
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Add F&I Product
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="mr-2 h-4 w-4" />
                Review Contracts
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                Check Funding Status
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Generate F&I Report
              </Button>
            </div>
          </WidgetBase>
        </WidgetGrid>
      </WidgetSection>
    </div>
  );
}

