
import { WidgetGrid, WidgetRow, WidgetSection } from '@/components/widgets/WidgetGrid';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { WidgetBase } from '@/components/widgets/WidgetBase';
import { MockDataGenerator, mockAppointments, mockRepairOrders } from '@/data/mockData';
import { UserRole } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Wrench, Clock, Phone, User, AlertTriangle } from 'lucide-react';

/**
 * ServiceAdvisorDashboard - Service advisor dashboard for individual service advisors
 * 
 * A personalized dashboard that provides service advisor performance metrics,
 * appointment scheduling, repair order management, and customer communication
 * tools. Designed for service advisors to manage their daily operations and
 * customer relationships.
 * 
 * @component
 * @example
 * ```tsx
 * <ServiceAdvisorDashboard />
 * ```
 * 
 * @returns {JSX.Element} Rendered service advisor dashboard
 */
export function ServiceAdvisorDashboard() {
  const kpiData = MockDataGenerator.generateKPIData(UserRole.SERVICE_ADVISOR);
  const myAppointments = mockAppointments.slice(0, 8);
  const myRepairOrders = mockRepairOrders.slice(0, 6);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'InProgress': return 'bg-blue-100 text-blue-800';
      case 'WaitingParts': return 'bg-yellow-100 text-yellow-800';
      case 'Open': return 'bg-gray-100 text-gray-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Confirmed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'InProgress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">My Service Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your appointments, repair orders, and customer relationships
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create RO
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

      {/* Today's Schedule */}
      <WidgetSection title="Today's Schedule">
        <WidgetRow>
          <WidgetGrid columns={2}>
            <WidgetBase 
              title="My Appointments" 
              description="Today's scheduled appointments"
              className="col-span-1"
            >
              <div className="space-y-3">
                {myAppointments.map((appointment) => {
                  const customerName = MockDataGenerator.getRandomElement(['John Smith', 'Sarah Johnson', 'Mike Davis', 'Lisa Chen', 'David Wilson']);
                  
                  return (
                    <div key={appointment.AppointmentKey} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{appointment.AppointmentTime}</span>
                          <Badge className={getAppointmentStatusColor(appointment.Status)}>
                            {appointment.Status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium mt-1">{customerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.EstimatedDuration} min • {appointment.Concerns?.[0] || 'Routine service'}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <User className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </WidgetBase>

            <WidgetBase 
              title="My Open ROs" 
              description="Active repair orders"
              className="col-span-1"
            >
              <div className="space-y-3">
                {myRepairOrders.map((ro) => {
                  const customerName = MockDataGenerator.getRandomElement(['John Smith', 'Sarah Johnson', 'Mike Davis', 'Lisa Chen', 'David Wilson']);
                  const daysOpen = Math.floor((new Date().getTime() - new Date(ro.OpenDate).getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={ro.RepairOrderKey} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Wrench className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">RO #{ro.RepairOrderNumber}</span>
                          <Badge className={getStatusColor(ro.Status)}>
                            {ro.Status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium mt-1">{customerName}</p>
                        <p className="text-sm text-muted-foreground">
                          ${ro.TotalAmount?.Amount.toLocaleString()} • {daysOpen} days open
                        </p>
                      </div>
                      <div className="text-right">
                        {ro.Status === 'WaitingParts' && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                        {daysOpen > 3 && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </WidgetBase>
          </WidgetGrid>
        </WidgetRow>
      </WidgetSection>

      {/* Customer Communication */}
      <WidgetSection title="Customer Communication">
        <WidgetGrid columns={3}>
          <WidgetBase 
            title="Follow-up Required" 
            description="Customers needing contact"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-red-600" />
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">RO completion - 2 days overdue</p>
                  </div>
                </div>
                <Button size="sm" variant="destructive">Call</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-yellow-600" />
                  <div>
                    <p className="font-medium">Mike Davis</p>
                    <p className="text-sm text-muted-foreground">Parts arrival update</p>
                  </div>
                </div>
                <Button size="sm">Contact</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="font-medium">Lisa Chen</p>
                    <p className="text-sm text-muted-foreground">Estimate approval needed</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Call</Button>
              </div>
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Waiting for Approval" 
            description="Estimates pending customer decision"
          >
            <div className="space-y-3">
              <div className="p-3 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium">Brake Service</p>
                  <Badge variant="outline">$850</Badge>
                </div>
                <p className="text-sm text-muted-foreground">John Smith • Sent 2 hours ago</p>
                <div className="flex space-x-2 mt-2">
                  <Button size="sm" variant="outline">Call</Button>
                  <Button size="sm" variant="outline">Resend</Button>
                </div>
              </div>
              <div className="p-3 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium">Transmission Service</p>
                  <Badge variant="outline">$1,200</Badge>
                </div>
                <p className="text-sm text-muted-foreground">David Wilson • Sent 1 day ago</p>
                <div className="flex space-x-2 mt-2">
                  <Button size="sm" variant="outline">Call</Button>
                  <Button size="sm" variant="outline">Follow-up</Button>
                </div>
              </div>
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Quick Actions" 
            description="Common service tasks"
          >
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Create New RO
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Wrench className="mr-2 h-4 w-4" />
                Update RO Status
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="mr-2 h-4 w-4" />
                Customer Check-in
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Generate Estimate
              </Button>
            </div>
          </WidgetBase>
        </WidgetGrid>
      </WidgetSection>

      {/* Performance and Goals */}
      <WidgetSection title="Performance Tracking">
        <WidgetGrid columns={2}>
          <WidgetBase 
            title="Monthly Goals" 
            description="Track your service targets"
            className="col-span-1"
          >
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>ROs Written</span>
                  <span>28 / 40</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Revenue Generated</span>
                  <span>$18,500 / $25,000</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '74%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Customer Satisfaction</span>
                  <span>4.8 / 5.0</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Recent Customer Feedback" 
            description="Latest service reviews"
            className="col-span-1"
          >
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-sm font-medium">Sarah Johnson</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Excellent service! Very thorough explanation of the work needed."
                </p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(4)}{'☆'}
                  </div>
                  <span className="text-sm font-medium">Mike Davis</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Quick turnaround time and fair pricing. Will return for future service."
                </p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-sm font-medium">Lisa Chen</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Great communication throughout the repair process. Highly recommend!"
                </p>
              </div>
            </div>
          </WidgetBase>
        </WidgetGrid>
      </WidgetSection>
    </div>
  );
}

