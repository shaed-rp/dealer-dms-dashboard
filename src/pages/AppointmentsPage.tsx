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
import { Plus, Download, Filter, Search, Calendar, User, Car, MoreHorizontal, ArrowUpDown } from 'lucide-react';

/**
 * AppointmentsPage - Service appointments management page
 * 
 * A dedicated page for viewing, filtering, and managing service appointments.
 * Features scheduling, technician assignment, and appointment status tracking.
 * 
 * @component
 * @example
 * ```tsx
 * <AppointmentsPage />
 * ```
 * 
 * @returns {JSX.Element} Rendered appointments page
 */
export function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('appointmentTime');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Generate appointment-specific KPIs
  const appointmentKPIs = [
    {
      id: 'today-appointments',
      title: 'Today\'s Appointments',
      value: 24,
      previousValue: 21,
      change: 3,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'Calendar',
      color: 'green'
    },
    {
      id: 'completed-today',
      title: 'Completed Today',
      value: 18,
      previousValue: 16,
      change: 2,
      changeType: 'increase' as const,
      format: 'number' as const,
      icon: 'Clock',
      color: 'blue'
    },
    {
      id: 'avg-duration',
      title: 'Avg Duration',
      value: 2.5,
      previousValue: 2.8,
      change: -0.3,
      changeType: 'decrease' as const,
      format: 'number' as const,
      icon: 'Clock',
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
      icon: 'User',
      color: 'purple'
    }
  ];

  // Mock appointments data
  const mockAppointments = Array.from({ length: 20 }, (_, i) => ({
    id: `APT${String(i + 1).padStart(6, '0')}`,
    customerName: `Customer ${i + 1}`,
    vehicleInfo: `2022 ${['Toyota', 'Honda', 'Ford', 'Chevrolet'][i % 4]} ${['Camry', 'Civic', 'F-150', 'Silverado'][i % 4]}`,
    appointmentTime: new Date(Date.now() + (i * 60 * 60 * 1000)),
    estimatedDuration: Math.floor(Math.random() * 3) + 1,
    status: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'][i % 4],
    technician: `Tech ${i % 5 + 1}`,
    serviceType: ['Oil Change', 'Brake Service', 'Tire Rotation', 'Inspection'][i % 4]
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedAppointments = mockAppointments
    .filter(appointment => {
      const searchString = `${appointment.customerName} ${appointment.vehicleInfo} ${appointment.serviceType}`.toLowerCase();
      const matchesSearch = searchString.includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: any = a[sortField as keyof typeof a];
      let bValue: any = b[sortField as keyof typeof b];
      
      if (sortField === 'appointmentTime') {
        aValue = a.appointmentTime.getTime();
        bValue = b.appointmentTime.getTime();
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const SortableHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <TableHead>
      <Button
        variant="ghost"
        onClick={() => handleSort(field)}
        className="h-auto p-0 font-medium hover:bg-transparent"
      >
        {children}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Appointments</h1>
          <p className="text-muted-foreground">
            Manage service appointments and scheduling
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
            New Appointment
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <WidgetSection>
        <WidgetGrid columns={4}>
          {appointmentKPIs.map((kpi) => (
            <KPIWidget
              key={kpi.id}
              data={kpi}
            />
          ))}
        </WidgetGrid>
      </WidgetSection>

      {/* Appointments Table */}
      <WidgetBase title="Service Appointments" description="All scheduled service appointments">
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Status: {statusFilter === 'all' ? 'All' : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Scheduled')}>
                Scheduled
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('In Progress')}>
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Completed')}>
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Cancelled')}>
                Cancelled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHeader field="appointmentTime">Time</SortableHeader>
                <TableHead>Customer</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedAppointments.map((appointment) => (
                <TableRow key={appointment.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {appointment.appointmentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </TableCell>
                  <TableCell>{appointment.customerName}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{appointment.vehicleInfo}</TableCell>
                  <TableCell>{appointment.serviceType}</TableCell>
                  <TableCell>{appointment.technician}</TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {appointment.estimatedDuration}h
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          Reschedule
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          Assign Technician
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Car className="mr-2 h-4 w-4" />
                          View Vehicle
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredAndSortedAppointments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No appointments found matching your criteria.
          </div>
        )}
      </WidgetBase>
    </div>
  );
}
