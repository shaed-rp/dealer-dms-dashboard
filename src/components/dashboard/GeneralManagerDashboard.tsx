
import { WidgetGrid, WidgetRow, WidgetSection } from '@/components/widgets/WidgetGrid';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { WidgetBase } from '@/components/widgets/WidgetBase';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { DepartmentPerformanceChart } from '@/components/charts/DepartmentPerformanceChart';
import { InventoryTable } from '@/components/tables/InventoryTable';
import { MockDataGenerator } from '@/data/mockData';
import { UserRole } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * GeneralManagerDashboard - Executive dashboard for general managers
 * 
 * A comprehensive executive dashboard that provides high-level overview of
 * dealership performance, including KPIs, revenue trends, department performance,
 * inventory health, and operational alerts. Designed for strategic decision-making
 * and executive oversight of all dealership operations.
 * 
 * @component
 * @example
 * ```tsx
 * <GeneralManagerDashboard />
 * ```
 * 
 * @returns {JSX.Element} Rendered general manager dashboard
 */
export function GeneralManagerDashboard() {
  const kpiData = MockDataGenerator.generateKPIData(UserRole.GENERAL_MANAGER);

  const topPerformers = [
    {
      id: 1,
      name: 'Mike Johnson',
      role: 'Sales Manager',
      avatar: 'MJ',
      performance: 125,
      change: 12,
      changeType: 'increase' as const,
      metric: 'Revenue Target',
      value: '$785,000'
    },
    {
      id: 2,
      name: 'Sarah Davis',
      role: 'Service Advisor',
      avatar: 'SD',
      performance: 118,
      change: 8,
      changeType: 'increase' as const,
      metric: 'CSI Score',
      value: '4.8/5.0'
    },
    {
      id: 3,
      name: 'Tom Wilson',
      role: 'Technician',
      avatar: 'TW',
      performance: 112,
      change: -3,
      changeType: 'decrease' as const,
      metric: 'Efficiency',
      value: '112%'
    },
    {
      id: 4,
      name: 'Lisa Chen',
      role: 'Finance Manager',
      avatar: 'LC',
      performance: 95,
      change: 15,
      changeType: 'increase' as const,
      metric: 'Penetration Rate',
      value: '78%'
    },
    {
      id: 5,
      name: 'David Brown',
      role: 'Parts Counter',
      avatar: 'DB',
      performance: 108,
      change: 5,
      changeType: 'increase' as const,
      metric: 'Fill Rate',
      value: '96%'
    }
  ];

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'decrease':
        return <TrendingDown className="h-3 w-3 text-red-600" />;
      default:
        return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
        <p className="text-muted-foreground">
          High-level overview of dealership performance and key metrics
        </p>
      </div>

      {/* KPI Section */}
      <WidgetSection title="Key Performance Indicators">
        <WidgetGrid columns={4}>
          {kpiData.map((kpi) => (
            <KPIWidget key={kpi.id} data={kpi} />
          ))}
        </WidgetGrid>
      </WidgetSection>

      {/* Charts and Analytics */}
      <WidgetSection title="Performance Analytics">
        <WidgetRow>
          <WidgetGrid columns={2}>
            <RevenueChart className="col-span-1" />
            <DepartmentPerformanceChart className="col-span-1" />
          </WidgetGrid>

          <WidgetGrid columns={3}>
            <InventoryTable 
              title="Inventory Health" 
              description="Current inventory status by age"
              className="col-span-2"
              maxRows={6}
            />

            <WidgetBase 
              title="Top Performers" 
              description="Leading employees this month"
              className="col-span-1"
            >
              <div className="space-y-4">
                {topPerformers.map((performer) => (
                  <div key={performer.id} className="flex items-center space-x-3 p-3 rounded-lg border bg-card">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {performer.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium truncate">{performer.name}</p>
                          <p className="text-xs text-muted-foreground">{performer.role}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {performer.performance}%
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-muted-foreground">{performer.metric}</p>
                        <p className="text-xs font-medium">{performer.value}</p>
                      </div>
                      
                      <div className={`flex items-center space-x-1 mt-1 text-xs ${getChangeColor(performer.changeType)}`}>
                        {getChangeIcon(performer.changeType)}
                        <span>{Math.abs(performer.change)}% from last month</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </WidgetBase>
          </WidgetGrid>
        </WidgetRow>
      </WidgetSection>

      {/* Operational Overview */}
      <WidgetSection title="Operational Overview">
        <WidgetGrid columns={3}>
          <WidgetBase 
            title="Recent Alerts" 
            description="Important notifications requiring attention"
          >
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Inventory Alert</p>
                  <p className="text-xs text-muted-foreground">15 vehicles over 90 days old</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Service Backlog</p>
                  <p className="text-xs text-muted-foreground">8 ROs waiting over 3 days</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Finance Approval</p>
                  <p className="text-xs text-muted-foreground">3 deals pending approval</p>
                </div>
              </div>
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Daily Summary" 
            description="Today's key activities"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Deals Closed</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Service ROs</span>
                <span className="font-medium">28</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Parts Sales</span>
                <span className="font-medium">$4,250</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Customer Visits</span>
                <span className="font-medium">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Appointments</span>
                <span className="font-medium">32</span>
              </div>
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Quick Actions" 
            description="Common management tasks"
          >
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-muted rounded-md transition-colors">
                <p className="text-sm font-medium">View Monthly Report</p>
                <p className="text-xs text-muted-foreground">Generate comprehensive report</p>
              </button>
              <button className="w-full text-left p-2 hover:bg-muted rounded-md transition-colors">
                <p className="text-sm font-medium">Review Pending Approvals</p>
                <p className="text-xs text-muted-foreground">3 items need attention</p>
              </button>
              <button className="w-full text-left p-2 hover:bg-muted rounded-md transition-colors">
                <p className="text-sm font-medium">Schedule Team Meeting</p>
                <p className="text-xs text-muted-foreground">Plan department sync</p>
              </button>
              <button className="w-full text-left p-2 hover:bg-muted rounded-md transition-colors">
                <p className="text-sm font-medium">Export Data</p>
                <p className="text-xs text-muted-foreground">Download reports</p>
              </button>
            </div>
          </WidgetBase>
        </WidgetGrid>
      </WidgetSection>
    </div>
  );
}

