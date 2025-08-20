
import { WidgetGrid, WidgetRow, WidgetSection } from '@/components/widgets/WidgetGrid';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { WidgetBase } from '@/components/widgets/WidgetBase';
import { MockDataGenerator } from '@/data/mockData';
import { UserRole } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wrench, Clock, CheckCircle, AlertTriangle, Play, Pause, Square } from 'lucide-react';

/**
 * TechnicianDashboard - Work order management dashboard for technicians
 * 
 * A specialized dashboard that provides technician performance metrics,
 * work order management, time tracking, and efficiency monitoring tools.
 * Designed for technicians to manage their daily work assignments and
 * track their productivity and efficiency.
 * 
 * @component
 * @example
 * ```tsx
 * <TechnicianDashboard />
 * ```
 * 
 * @returns {JSX.Element} Rendered technician dashboard
 */
export function TechnicianDashboard() {
  const kpiData = MockDataGenerator.generateKPIData(UserRole.TECHNICIAN);

  const myJobs = [
    {
      id: 'RO-12345',
      customer: 'John Smith',
      vehicle: '2023 Honda Civic',
      jobDescription: 'Oil change and tire rotation',
      estimatedTime: 1.5,
      timeSpent: 0.8,
      status: 'InProgress',
      priority: 'Normal'
    },
    {
      id: 'RO-12346',
      customer: 'Sarah Johnson',
      vehicle: '2022 Toyota RAV4',
      jobDescription: 'Brake pad replacement',
      estimatedTime: 2.0,
      timeSpent: 0,
      status: 'Assigned',
      priority: 'High'
    },
    {
      id: 'RO-12347',
      customer: 'Mike Davis',
      vehicle: '2024 Ford F-150',
      jobDescription: 'Engine diagnostic',
      estimatedTime: 1.0,
      timeSpent: 0,
      status: 'Waiting',
      priority: 'Normal'
    },
    {
      id: 'RO-12348',
      customer: 'Lisa Chen',
      vehicle: '2023 Nissan Altima',
      jobDescription: 'Transmission service',
      estimatedTime: 3.0,
      timeSpent: 0,
      status: 'Assigned',
      priority: 'Low'
    }
  ];

  const completedJobs = [
    {
      id: 'RO-12340',
      customer: 'David Wilson',
      vehicle: '2022 BMW X3',
      jobDescription: 'Air filter replacement',
      timeSpent: 0.5,
      completedAt: '10:30 AM'
    },
    {
      id: 'RO-12341',
      customer: 'Emily Brown',
      vehicle: '2023 Mercedes C-Class',
      jobDescription: 'Battery replacement',
      timeSpent: 1.2,
      completedAt: '9:15 AM'
    },
    {
      id: 'RO-12342',
      customer: 'Robert Garcia',
      vehicle: '2024 Audi A4',
      jobDescription: 'Coolant flush',
      timeSpent: 1.8,
      completedAt: '8:45 AM'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'InProgress': return 'bg-blue-100 text-blue-800';
      case 'Assigned': return 'bg-green-100 text-green-800';
      case 'Waiting': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-purple-100 text-purple-800';
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

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">My Technician Dashboard</h1>
          <p className="text-muted-foreground">
            Track your work queue, efficiency, and completed jobs
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Clock In/Out
          </Button>
          <Button>
            <Wrench className="mr-2 h-4 w-4" />
            Request Parts
          </Button>
        </div>
      </div>

      {/* Personal KPIs */}
      <WidgetSection title="My Performance">
        <WidgetGrid columns={4}>
          {kpiData.map((kpi) => (
            <KPIWidget key={kpi.id} data={kpi} />
          ))}
        </WidgetGrid>
      </WidgetSection>

      {/* Work Queue */}
      <WidgetSection title="My Work Queue">
        <WidgetRow>
          <WidgetGrid columns={2}>
            <WidgetBase 
              title="Assigned Jobs" 
              description="Current work assignments"
              className="col-span-1"
            >
              <div className="space-y-3">
                {myJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Wrench className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{job.id}</span>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                        <Badge className={getPriorityColor(job.priority)}>
                          {job.priority}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium mt-1">{job.customer}</p>
                      <p className="text-sm text-muted-foreground">{job.vehicle}</p>
                      <p className="text-sm text-muted-foreground">{job.jobDescription}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span className="text-muted-foreground">
                          Est: {job.estimatedTime}h
                        </span>
                        <span className="text-muted-foreground">
                          Spent: {job.timeSpent}h
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {job.status === 'InProgress' ? (
                        <>
                          <Button size="sm" variant="outline">
                            <Pause className="h-4 w-4" />
                          </Button>
                          <Button size="sm">
                            <Square className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </WidgetBase>

            <WidgetBase 
              title="Completed Today" 
              description="Jobs finished today"
              className="col-span-1"
            >
              <div className="space-y-3">
                {completedJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium">{job.id}</span>
                        <Badge className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      </div>
                      <p className="text-sm font-medium mt-1">{job.customer}</p>
                      <p className="text-sm text-muted-foreground">{job.vehicle}</p>
                      <p className="text-sm text-muted-foreground">{job.jobDescription}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span className="text-muted-foreground">
                          Time: {job.timeSpent}h
                        </span>
                        <span className="text-muted-foreground">
                          Completed: {job.completedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </WidgetBase>
          </WidgetGrid>
        </WidgetRow>
      </WidgetSection>

      {/* Tools and Resources */}
      <WidgetSection title="Tools & Resources">
        <WidgetGrid columns={3}>
          <WidgetBase 
            title="Parts Requests" 
            description="Pending parts orders"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <div>
                    <p className="font-medium">Brake Pads</p>
                    <p className="text-sm text-muted-foreground">RO-12346 • Ordered 2 hours ago</p>
                  </div>
                </div>
                <Badge variant="outline">Pending</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="font-medium">Oil Filter</p>
                    <p className="text-sm text-muted-foreground">RO-12345 • Ready for pickup</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ready</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="font-medium">Transmission Fluid</p>
                    <p className="text-sm text-muted-foreground">RO-12348 • ETA: Tomorrow</p>
                  </div>
                </div>
                <Badge variant="outline">Ordered</Badge>
              </div>
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Time Tracking" 
            description="Today's work summary"
          >
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">7.2h</div>
                <div className="text-sm text-muted-foreground">Hours Worked Today</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground">Billable Hours</p>
                  <p className="font-medium text-green-600">8.5h</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Efficiency</p>
                  <p className="font-medium text-blue-600">118%</p>
                </div>
              </div>
              <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-muted-foreground">Jobs Completed</p>
                <p className="font-medium text-green-600">3 of 4</p>
              </div>
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Quick Actions" 
            description="Common technician tasks"
          >
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Play className="mr-2 h-4 w-4" />
                Start Next Job
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Wrench className="mr-2 h-4 w-4" />
                Request Parts
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                Log Time
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Report Issue
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="mr-2 h-4 w-4" />
                Complete Job
              </Button>
            </div>
          </WidgetBase>
        </WidgetGrid>
      </WidgetSection>

      {/* Weekly Performance */}
      <WidgetSection title="Weekly Performance">
        <WidgetGrid columns={2}>
          <WidgetBase 
            title="Efficiency Trend" 
            description="Daily efficiency over the past week"
            className="col-span-1"
          >
            <div className="space-y-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => {
                const efficiency = MockDataGenerator.getRandomNumber(85, 125);
                return (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{day}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${efficiency >= 100 ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: `${Math.min(efficiency, 100)}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${efficiency >= 100 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {efficiency}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Skill Development" 
            description="Training and certifications"
            className="col-span-1"
          >
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <p className="font-medium">ASE Brake Certification</p>
                </div>
                <p className="text-sm text-muted-foreground">Completed • Valid until 2026</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <p className="font-medium">Hybrid Vehicle Training</p>
                </div>
                <p className="text-sm text-muted-foreground">In Progress • 75% complete</p>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <p className="font-medium">Diagnostic Equipment Update</p>
                </div>
                <p className="text-sm text-muted-foreground">Due next month</p>
              </div>
            </div>
          </WidgetBase>
        </WidgetGrid>
      </WidgetSection>
    </div>
  );
}

