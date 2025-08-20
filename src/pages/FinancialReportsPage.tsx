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
 * FinancialReportsPage - Financial reports and statements management page
 * 
 * A dedicated page for viewing, filtering, and managing financial reports and statements.
 * Features report generation, analysis, and financial insights.
 * 
 * @component
 * @example
 * ```tsx
 * <FinancialReportsPage />
 * ```
 * 
 * @returns {JSX.Element} Rendered financial reports page
 */
export function FinancialReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('generatedDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Generate financial reports-specific KPIs
  const financialReportsKPIs = [
    {
      id: 'total-reports',
      title: 'Total Reports',
      value: 156,
      previousValue: 142,
      change: 14,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'FileText',
      color: 'green'
    },
    {
      id: 'monthly-revenue',
      title: 'Monthly Revenue',
      value: 1250000,
      previousValue: 1180000,
      change: 70000,
      changeType: 'increase' as const,
      format: 'currency' as const,
      icon: 'DollarSign',
      color: 'blue'
    },
    {
      id: 'profit-margin',
      title: 'Profit Margin',
      value: 32.5,
      previousValue: 30.8,
      change: 1.7,
      changeType: 'increase' as const,
      format: 'percentage' as const,
      icon: 'TrendingUp',
      color: 'green'
    },
    {
      id: 'pending-reports',
      title: 'Pending Reports',
      value: 8,
      previousValue: 12,
      change: -4,
      changeType: 'decrease' as const,
      format: 'number' as const,
      icon: 'BarChart3',
      color: 'orange'
    }
  ];

  // Mock financial reports data
  const mockFinancialReports = Array.from({ length: 20 }, (_, i) => ({
    id: `REP${String(i + 1).padStart(6, '0')}`,
    reportNumber: `FR-${String(i + 1).padStart(4, '0')}`,
    reportName: [
      'Monthly Income Statement',
      'Balance Sheet',
      'Cash Flow Statement',
      'Profit & Loss Report',
      'Sales Analysis Report',
      'Expense Analysis Report',
      'Department Performance Report',
      'Inventory Valuation Report',
      'Accounts Receivable Report',
      'Accounts Payable Report',
      'Tax Summary Report',
      'Budget vs Actual Report',
      'Cash Position Report',
      'Revenue Analysis Report',
      'Cost of Goods Sold Report',
      'Operating Expenses Report',
      'Financial Ratios Report',
      'Trend Analysis Report',
      'Forecast Report',
      'Audit Trail Report'
    ][i % 20],
    reportType: ['Income Statement', 'Balance Sheet', 'Cash Flow', 'Analysis', 'Summary'][Math.floor(Math.random() * 5)],
    period: ['Monthly', 'Quarterly', 'Yearly'][Math.floor(Math.random() * 3)],
    generatedDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
    periodStart: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
    periodEnd: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    status: ['Generated', 'Pending', 'Processing', 'Error'][Math.floor(Math.random() * 4)],
    fileSize: Math.floor(Math.random() * 5000) + 100,
    generatedBy: `User ${Math.floor(Math.random() * 5) + 1}`,
    format: ['PDF', 'Excel', 'CSV'][Math.floor(Math.random() * 3)],
    description: Math.random() > 0.5 ? 'Standard financial report' : 'Custom analysis report'
  }));

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'Income Statement': return 'bg-green-100 text-green-800';
      case 'Balance Sheet': return 'bg-blue-100 text-blue-800';
      case 'Cash Flow': return 'bg-purple-100 text-purple-800';
      case 'Analysis': return 'bg-orange-100 text-orange-800';
      case 'Summary': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Generated': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'PDF': return 'bg-red-100 text-red-800';
      case 'Excel': return 'bg-green-100 text-green-800';
      case 'CSV': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = mockFinancialReports
    .filter(report => 
      report.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(report => reportTypeFilter === 'all' || report.reportType === reportTypeFilter)
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
          <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
          <p className="text-muted-foreground">
            Generate and view financial reports and statements
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
            Generate Report
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <WidgetSection>
        <WidgetGrid columns={4}>
          {financialReportsKPIs.map((kpi) => (
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
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Report Type: {reportTypeFilter === 'all' ? 'All' : reportTypeFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setReportTypeFilter('all')}>
              All Types
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setReportTypeFilter('Income Statement')}>
              Income Statement
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setReportTypeFilter('Balance Sheet')}>
              Balance Sheet
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setReportTypeFilter('Cash Flow')}>
              Cash Flow
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setReportTypeFilter('Analysis')}>
              Analysis
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setReportTypeFilter('Summary')}>
              Summary
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Financial Reports Table */}
      <WidgetBase
        title="Financial Reports"
        description="Complete list of all financial reports"
      >
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('reportNumber');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Report Number
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Report Name</TableHead>
                <TableHead>Report Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSortField('generatedDate');
                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    className="h-8 flex items-center gap-1"
                  >
                    Generated Date
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Period Range</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>File Size</TableHead>
                <TableHead>Generated By</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-mono font-medium">
                    {report.reportNumber}
                  </TableCell>
                  <TableCell className="font-medium">
                    {report.reportName}
                  </TableCell>
                  <TableCell>
                    <Badge className={getReportTypeColor(report.reportType)}>
                      {report.reportType}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.period}</TableCell>
                  <TableCell>
                    {report.generatedDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {report.periodStart.toLocaleDateString()} - {report.periodEnd.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getFormatColor(report.format)}>
                      {report.format}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {(report.fileSize / 1024).toFixed(1)} KB
                  </TableCell>
                  <TableCell>{report.generatedBy}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Report</DropdownMenuItem>
                        <DropdownMenuItem>Download Report</DropdownMenuItem>
                        <DropdownMenuItem>Regenerate Report</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Report</DropdownMenuItem>
                        <DropdownMenuItem>Share Report</DropdownMenuItem>
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
