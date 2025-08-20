
import { WidgetGrid, WidgetRow, WidgetSection } from '@/components/widgets/WidgetGrid';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { WidgetBase } from '@/components/widgets/WidgetBase';
import { ServiceEfficiencyChart } from '@/components/charts/ServiceEfficiencyChart';
import { MockDataGenerator, mockRepairOrders, mockAppointments, mockEmployees } from '@/data/mockData';
import { UserRole } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Wrench, Clock, AlertTriangle } from 'lucide-react';

/**
 * ServiceManagerDashboard - Service operations dashboard for service managers
 * 
 * A comprehensive service management dashboard that provides service department
 * KPIs, technician efficiency tracking, repair order management, appointment
 * scheduling, and customer satisfaction metrics. Designed for service operations
 * oversight and efficiency optimization.
 * 
 * @component
 * @example
 * ```tsx
 * <ServiceManagerDashboard />
 * ```
 * 
 * @returns {JSX.Element} Rendered service manager dashboard
 */
export function ServiceManagerDashboard() {
  const kpiData = MockDataGenerator.generateKPIData(UserRole.SERVICE_MANAGER);

  const serviceAdvisors = mockEmployees.filter(emp => emp.Role === 'ServiceAdvisor');
  const todayAppointments = mockAppointments.slice(0, 6);
  const openROs = mockRepairOrders.filter(ro => ro.Status === 'Open' || ro.Status === 'InProgress').slice(0, 8);

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
          <h1 className="text-3xl font-bold tracking-tight">Service Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor service operations, technician productivity, and customer satisfaction
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New RO
          </Button>
        </div>
      </div>

      {/* KPI Section */}
      <WidgetSection title="Service Metrics">
        <WidgetGrid columns={4}>
          {kpiData.map((kpi) => (
            <KPIWidget key={kpi.id} data={kpi} />
          ))}
        </WidgetGrid>
      </WidgetSection>

      {/* Service Lane Overview */}
      <WidgetSection title="Service Lane Status">
        <WidgetRow>
          <WidgetGrid columns={2}>
            <WidgetBase 
              title="Repair Order Status" 
              description="Current RO distribution by status"
              className="col-span-1"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">8</div>
                  <div className="text-sm text-muted-foreground">Waiting Parts</div>
                </div>
                <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">15</div>
                  <div className="text-sm text-muted-foreground">Ready for Pickup</div>
                </div>
                <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <div className="text-sm text-muted-foreground">Overdue</div>
                </div>
              </div>
            </WidgetBase>

            <ServiceEfficiencyChart className="col-span-1" />
          </WidgetGrid>
        </WidgetRow>
      </WidgetSection>

      {/* Today's Schedule */}
      <WidgetSection title="Today's Schedule">
        <WidgetGrid columns={2}>
          <WidgetBase 
            title="Appointments" 
            description="Today's scheduled appointments"
            className="col-span-1"
          >
            <div className="space-y-3">
              {todayAppointments.map((appointment) => (
                <div key={appointment.AppointmentKey} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{appointment.AppointmentTime}</span>
                      <Badge className={getAppointmentStatusColor(appointment.Status)}>
                        {appointment.Status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Customer: {appointment.CustomerKey} • {appointment.EstimatedDuration} min
                    </p>
                    {appointment.Concerns && (
                      <p className="text-sm text-muted-foreground">
                        {appointment.Concerns[0]}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Open Repair Orders" 
            description="Active ROs requiring attention"
            className="col-span-1"
          >
            <div className="space-y-3">
              {openROs.map((ro) => (
                <div key={ro.RepairOrderKey} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Wrench className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">RO #{ro.RepairOrderNumber}</span>
                      <Badge className={getStatusColor(ro.Status)}>
                        {ro.Status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Customer: {ro.CustomerKey}
                    </p>
                    <p className="text-sm font-medium">
                      ${ro.TotalAmount?.Amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {new Date(ro.OpenDate).toLocaleDateString()}
                    </p>
                    {ro.Status === 'WaitingParts' && (
                      <AlertTriangle className="h-4 w-4 text-yellow-500 ml-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </WidgetBase>
        </WidgetGrid>
      </WidgetSection>

      {/* Service Advisor Performance */}
      <WidgetSection title="Service Advisor Performance">
        <WidgetGrid columns={3}>
          <WidgetBase 
            title="Advisor Metrics" 
            description="Monthly performance by advisor"
            className="col-span-2"
          >
            <div className="space-y-3">
              {serviceAdvisors.slice(0, 4).map((advisor) => {
                const rosWritten = MockDataGenerator.getRandomNumber(25, 60);
                const avgRoValue = MockDataGenerator.getRandomCurrency(300, 800);
                const revenue = rosWritten * avgRoValue;
                
                return (
                  <div key={advisor.EmployeeId} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{advisor.PersonalName.FirstName} {advisor.PersonalName.LastName}</p>
                      <p className="text-sm text-muted-foreground">{rosWritten} ROs written this month</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${revenue.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">${avgRoValue} avg RO</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Quick Actions" 
            description="Common service tasks"
          >
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Create RO
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Wrench className="mr-2 h-4 w-4" />
                Assign Technician
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Review Overdue ROs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Generate Service Report
              </Button>
            </div>
          </WidgetBase>
        </WidgetGrid>
      </WidgetSection>
    </div>
  );
}

