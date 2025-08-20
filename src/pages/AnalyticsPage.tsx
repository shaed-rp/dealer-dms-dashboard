import { useState } from 'react';
import { WidgetBase } from '@/components/widgets/WidgetBase';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { WidgetGrid, WidgetSection } from '@/components/widgets/WidgetGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Download, Filter, Search, MoreHorizontal, ArrowUpDown } from 'lucide-react';

/**
 * AnalyticsPage - Advanced analytics and business intelligence page
 * 
 * A dedicated page for viewing, filtering, and managing advanced analytics and business intelligence.
 * Features data analysis, performance metrics, and business insights.
 * 
 * @component
 * @example
 * ```tsx
 * <AnalyticsPage />
 * ```
 * 
 * @returns {JSX.Element} Rendered analytics page
 */
export function AnalyticsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [metricTypeFilter, setMetricTypeFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Generate analytics-specific KPIs
  const analyticsKPIs = [
    {
      id: 'total-sales',
      title: 'Total Sales (MTD)',
      value: 1250000,
      previousValue: 1180000,
      change: 70000,
      changeType: 'increase' as const,
      format: 'currency' as const,
      icon: 'TrendingUp',
      color: 'green'
    },
    {
      id: 'conversion-rate',
      title: 'Conversion Rate',
      value: 23.5,
      previousValue: 21.8,
      change: 1.7,
      changeType: 'increase' as const,
      format: 'percentage' as const,
      icon: 'Target',
      color: 'blue'
    },
    {
      id: 'avg-deal-size',
      title: 'Avg Deal Size',
      value: 28500,
      previousValue: 27200,
      change: 1300,
      changeType: 'increase' as const,
      format: 'currency' as const,
      icon: 'BarChart3',
      color: 'green'
    },
    {
      id: 'customer-satisfaction',
      title: 'Customer Satisfaction',
      value: 4.8,
      previousValue: 4.7,
      change: 0.1,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'Users',
      color: 'purple'
    }
  ];

  // Mock analytics data
  const mockAnalytics = Array.from({ length: 20 }, (_, i) => ({
    id: `ANAL${String(i + 1).padStart(6, '0')}`,
    metricName: [
      'Sales Performance',
      'Customer Acquisition Cost',
      'Customer Lifetime Value',
      'Inventory Turnover',
      'Service Efficiency',
      'Employee Productivity',
      'Market Share',
      'Revenue Growth',
      'Profit Margin',
      'Customer Retention Rate',
      'Lead Conversion Rate',
      'Average Repair Time',
      'Parts Usage Rate',
      'Customer Satisfaction Score',
      'Employee Satisfaction',
      'Website Traffic',
      'Social Media Engagement',
      'Email Campaign Performance',
      'Phone Call Volume',
      'Walk-in Traffic'
    ][i % 20],
    metricType: ['Sales', 'Customer', 'Operations', 'Financial', 'Marketing'][Math.floor(Math.random() * 5)],
    currentValue: Math.floor(Math.random() * 1000) + 100,
    previousValue: Math.floor(Math.random() * 900) + 100,
    change: 0, // Will be calculated
    changePercentage: 0, // Will be calculated
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    status: ['Improving', 'Declining', 'Stable', 'Critical'][Math.floor(Math.random() * 4)],
    trend: ['Up', 'Down', 'Stable'][Math.floor(Math.random() * 3)],
    department: ['Sales', 'Service', 'Parts', 'Finance', 'Marketing'][Math.floor(Math.random() * 5)],
    description: Math.random() > 0.5 ? 'Key performance indicator' : 'Business metric analysis'
  })).map(metric => {
    const change = metric.currentValue - metric.previousValue;
    const changePercentage = (change / metric.previousValue) * 100;
    return {
      ...metric,
      change,
      changePercentage
    };
  });

  const getMetricTypeColor = (type: string) => {
    switch (type) {
      case 'Sales': return 'bg-green-100 text-green-800';
      case 'Customer': return 'bg-blue-100 text-blue-800';
      case 'Operations': return 'bg-orange-100 text-orange-800';
      case 'Financial': return 'bg-purple-100 text-purple-800';
      case 'Marketing': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Improving': return 'bg-green-100 text-green-800';
      case 'Declining': return 'bg-red-100 text-red-800';
      case 'Stable': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'Up': return 'text-green-600';
      case 'Down': return 'text-red-600';
      case 'Stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const filteredAnalytics = mockAnalytics
    .filter(metric => 
      metric.metricName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      metric.metricType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      metric.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(metric => metricTypeFilter === 'all' || metric.metricType === metricTypeFilter)
    .sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Advanced analytics and business intelligence
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Dashboard
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <WidgetSection>
        <WidgetGrid columns={4}>
          {analyticsKPIs.map((kpi) => (
            <KPIWidget
              key={kpi.id}
              data={kpi}
            />
          ))}
        </WidgetGrid>
      </WidgetSection>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search metrics..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Metric Type: {metricTypeFilter === 'all' ? 'All' : metricTypeFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setMetricTypeFilter('all')}>
              All Types
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMetricTypeFilter('Sales')}>
              Sales
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMetricTypeFilter('Customer')}>
              Customer
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMetricTypeFilter('Operations')}>
              Operations
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMetricTypeFilter('Financial')}>
              Financial
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMetricTypeFilter('Marketing')}>
              Marketing
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Analytics Table */}
      <WidgetBase
        title="Performance Metrics"
        description="Complete list of all performance metrics and analytics"
      >
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('metricName');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Metric Name
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Metric Type</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('currentValue');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Current Value
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Previous Value</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Change %</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('date');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Date
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnalytics.map((metric) => (
                <TableRow key={metric.id}>
                  <TableCell className="font-medium">
                    {metric.metricName}
                  </TableCell>
                  <TableCell>
                    <Badge className={getMetricTypeColor(metric.metricType)}>
                      {metric.metricType}
                    </Badge>
                  </TableCell>
                  <TableCell>{metric.department}</TableCell>
                  <TableCell className="font-medium">
                    {metric.currentValue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {metric.previousValue.toLocaleString()}
                  </TableCell>
                  <TableCell className={metric.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {metric.change >= 0 ? '+' : ''}{metric.change.toLocaleString()}
                  </TableCell>
                  <TableCell className={metric.changePercentage >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {metric.changePercentage >= 0 ? '+' : ''}{metric.changePercentage.toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(metric.status)}>
                      {metric.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={getTrendColor(metric.trend)}>
                    {metric.trend === 'Up' ? '↗' : metric.trend === 'Down' ? '↘' : '→'}
                  </TableCell>
                  <TableCell>
                    {metric.date.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Create Chart</DropdownMenuItem>
                        <DropdownMenuItem>Set Alert</DropdownMenuItem>
                        <DropdownMenuItem>Export Data</DropdownMenuItem>
                        <DropdownMenuItem>Add to Dashboard</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </WidgetBase>
    </div>
  );
}
