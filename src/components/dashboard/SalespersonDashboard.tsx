
import { WidgetGrid, WidgetRow, WidgetSection } from '@/components/widgets/WidgetGrid';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { WidgetBase } from '@/components/widgets/WidgetBase';
import { MockDataGenerator, mockDeals, mockCustomers, mockVehicles } from '@/data/mockData';
import { UserRole } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Phone, Mail, Calendar, Car, User, Target } from 'lucide-react';

/**
 * SalespersonDashboard - Personal sales dashboard for individual salespeople
 * 
 * A personalized dashboard that provides individual sales performance metrics,
 * prospect management, deal tracking, and inventory opportunities. Designed
 * for salespeople to manage their personal pipeline and track their performance.
 * 
 * @component
 * @example
 * ```tsx
 * <SalespersonDashboard />
 * ```
 * 
 * @returns {JSX.Element} Rendered salesperson dashboard
 */
export function SalespersonDashboard() {
  const kpiData = MockDataGenerator.generateKPIData(UserRole.SALESPERSON);
  const myDeals = mockDeals.slice(0, 6);
  const myProspects = mockCustomers.slice(0, 8);
  const hotInventory = mockVehicles.filter(v => v.IsNew).slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Closed': return 'bg-green-100 text-green-800';
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Hot': return 'bg-red-100 text-red-800';
      case 'Warm': return 'bg-yellow-100 text-yellow-800';
      case 'Cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">My Sales Dashboard</h1>
          <p className="text-muted-foreground">
            Track your personal performance, prospects, and opportunities
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Follow-up
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Prospect
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

      {/* Active Prospects and Deals */}
      <WidgetSection title="Active Opportunities">
        <WidgetRow>
          <WidgetGrid columns={2}>
            <WidgetBase 
              title="My Prospects" 
              description="Active leads requiring follow-up"
              className="col-span-1"
            >
              <div className="space-y-3">
                {myProspects.map((prospect) => {
                  const priority = MockDataGenerator.getRandomElement(['Hot', 'Warm', 'Cold']);
                  const lastContact = MockDataGenerator.getRandomNumber(1, 14);
                  const interest = MockDataGenerator.getRandomElement(['2024 Honda Civic', '2023 Toyota RAV4', '2024 Ford F-150', '2023 Nissan Altima']);
                  
                  return (
                    <div key={prospect.CustomerKey} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">{prospect.Identity.PersonalName.FirstName} {prospect.Identity.PersonalName.LastName}</p>
                          <Badge className={getPriorityColor(priority)}>
                            {priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Interested in: {interest}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Last contact: {lastContact} days ago
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </WidgetBase>

            <WidgetBase 
              title="My Deals" 
              description="Current deals in progress"
              className="col-span-1"
            >
              <div className="space-y-3">
                {myDeals.map((deal) => (
                  <div key={deal.dealKey} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">Deal #{deal.dealNumber}</p>
                        <Badge className={getStatusColor(deal.dealStatus)}>
                          {deal.dealStatus}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {deal.customerName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {deal.vehicleInfo}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${deal.frontendGross?.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Front Gross</p>
                    </div>
                  </div>
                ))}
              </div>
            </WidgetBase>
          </WidgetGrid>
        </WidgetRow>
      </WidgetSection>

      {/* Inventory and Tools */}
      <WidgetSection title="Sales Tools">
        <WidgetGrid columns={3}>
          <WidgetBase 
            title="Hot Inventory" 
            description="Popular vehicles to promote"
          >
            <div className="space-y-3">
              {hotInventory.map((vehicle) => {
                const inquiries = MockDataGenerator.getRandomNumber(2, 8);
                
                return (
                  <div key={vehicle.InventoryKey} className="p-3 border border-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-sm">{vehicle.Year} {vehicle.Make} {vehicle.Model}</p>
                      <Badge variant="outline">{inquiries} inquiries</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Stock #</p>
                        <p className="font-medium">{vehicle.StockNumber}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">MSRP</p>
                        <p className="font-medium">${vehicle.MSRP?.Amount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Follow-up Reminders" 
            description="Scheduled customer contacts"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-red-600" />
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Overdue by 2 days</p>
                  </div>
                </div>
                <Button size="sm" variant="destructive">Call Now</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-yellow-600" />
                  <div>
                    <p className="font-medium">Mike Davis</p>
                    <p className="text-sm text-muted-foreground">Due today</p>
                  </div>
                </div>
                <Button size="sm">Contact</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="font-medium">Lisa Chen</p>
                    <p className="text-sm text-muted-foreground">Due tomorrow</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Schedule</Button>
              </div>
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Quick Actions" 
            description="Common sales tasks"
          >
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Add New Prospect
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Car className="mr-2 h-4 w-4" />
                Search Inventory
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="mr-2 h-4 w-4" />
                Create Appraisal
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Test Drive
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="mr-2 h-4 w-4" />
                Log Customer Call
              </Button>
            </div>
          </WidgetBase>
        </WidgetGrid>
      </WidgetSection>

      {/* Goals and Progress */}
      <WidgetSection title="Monthly Goals">
        <WidgetGrid columns={2}>
          <WidgetBase 
            title="Sales Goals Progress" 
            description="Track your monthly targets"
            className="col-span-1"
          >
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Units Sold</span>
                  <span>12 / 20</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Gross Profit</span>
                  <span>$45,200 / $60,000</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Prospects Added</span>
                  <span>18 / 25</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
            </div>
          </WidgetBase>

          <WidgetBase 
            title="Commission Tracker" 
            description="Estimated monthly earnings"
            className="col-span-1"
          >
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-2xl font-bold text-green-600">$8,450</div>
                <div className="text-sm text-muted-foreground">Earned This Month</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground">Base Commission</p>
                  <p className="font-medium">$6,200</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Bonuses</p>
                  <p className="font-medium">$2,250</p>
                </div>
              </div>
              <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-muted-foreground">Projected Month-End</p>
                <p className="font-medium text-blue-600">$12,800</p>
              </div>
            </div>
          </WidgetBase>
        </WidgetGrid>
      </WidgetSection>
    </div>
  );
}

