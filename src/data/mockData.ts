import { 
  DealSummary, 
  DealStatus, 
  DealType, 
  CustomerType,
  ServiceAppointment,
  AppointmentStatus,
  RepairOrder,
  RepairOrderStatus,
  Vehicle,
  Customer,
  Employee,
  Store,
  KPIWidget,
  UserRole
} from '../types';
import { Order, OrderStatus, OrderType, OrderPriority } from '../types/orders';

// Mock data generators
export class MockDataGenerator {
  static getRandomDate(start: Date, end: Date): string {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString();
  }

  static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getRandomCurrency(min: number, max: number): number {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
  }

  // Generate mock stores
  static generateStores(count: number = 3): Store[] {
    const storeNames = ['Downtown Auto', 'Westside Motors', 'Northpoint Dealership', 'Southgate Auto', 'Central Motors'];
    
    return Array.from({ length: count }, (_, i) => ({
      StoreId: i + 1,
      StoreName: storeNames[i] || `Store ${i + 1}`,
      Address: {
        Line1: `${this.getRandomNumber(100, 9999)} Main St`,
        City: this.getRandomElement(['Springfield', 'Riverside', 'Franklin', 'Georgetown', 'Madison']),
        State: this.getRandomElement(['CA', 'TX', 'FL', 'NY', 'IL']),
        Zip: `${this.getRandomNumber(10000, 99999)}`,
        Country: 'USA'
      },
      LegalName: `${storeNames[i] || `Store ${i + 1}`} LLC`,
      DealerState: this.getRandomElement(['CA', 'TX', 'FL', 'NY', 'IL']),
      DealerZip: `${this.getRandomNumber(10000, 99999)}`
    }));
  }

  // Generate mock employees
  static generateEmployees(count: number = 20): Employee[] {
    const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Lisa', 'Chris', 'Amy', 'Robert', 'Emily'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const roles = ['Salesperson', 'ServiceAdvisor', 'Technician', 'FinanceManager', 'ServiceManager', 'SalesManager', 'GeneralManager'];

    return Array.from({ length: count }, (_, i) => ({
      EmployeeId: `EMP${String(i + 1).padStart(3, '0')}`,
      PersonalName: {
        FirstName: this.getRandomElement(firstNames),
        LastName: this.getRandomElement(lastNames)
      },
      Role: this.getRandomElement(roles) as any,
      IsActive: Math.random() > 0.1, // 90% active
      FactoryID: `F${this.getRandomNumber(1000, 9999)}`,
      Username: `user${i + 1}`
    }));
  }

  // Generate mock customers
  static generateCustomers(count: number = 100): Customer[] {
    const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Lisa', 'Chris', 'Amy', 'Robert', 'Emily', 'James', 'Mary', 'William', 'Patricia', 'Richard', 'Jennifer'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas'];
    const cities = ['Springfield', 'Riverside', 'Franklin', 'Georgetown', 'Madison', 'Fairview', 'Clinton', 'Salem', 'Bristol', 'Greenville'];
    const states = ['CA', 'TX', 'FL', 'NY', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];

    return Array.from({ length: count }, (_, i) => ({
      CustomerKey: `CUST${String(i + 1).padStart(6, '0')}`,
      Identity: {
        PersonalName: {
          FirstName: this.getRandomElement(firstNames),
          LastName: this.getRandomElement(lastNames)
        },
        Address1: `${this.getRandomNumber(100, 9999)} ${this.getRandomElement(['Main', 'Oak', 'Pine', 'Elm', 'Cedar'])} St`,
        City: this.getRandomElement(cities),
        State: this.getRandomElement(states),
        Zip: `${this.getRandomNumber(10000, 99999)}`,
        EmailAddress: `customer${i + 1}@email.com`,
        PhoneNumbers: [{
          Digits: `${this.getRandomNumber(200, 999)}-${this.getRandomNumber(200, 999)}-${this.getRandomNumber(1000, 9999)}`,
          NumberType: 'Mobile' as any
        }]
      },
      DMSCustomerID: `DMS${i + 1}`,
      CustomerType: this.getRandomElement([CustomerType.RETAIL, CustomerType.WHOLESALE, CustomerType.FLEET]),
      License: {
        Number: `DL${this.getRandomNumber(10000000, 99999999)}`,
        State: this.getRandomElement(states)
      }
    }));
  }

  // Generate mock vehicles
  static generateVehicles(count: number = 50): Vehicle[] {
    const makes = ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Hyundai'];
    const models = {
      'Ford': ['F-150', 'Mustang', 'Explorer', 'Escape', 'Focus'],
      'Chevrolet': ['Silverado', 'Camaro', 'Equinox', 'Malibu', 'Cruze'],
      'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius'],
      'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit'],
      'Nissan': ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Maxima'],
      'BMW': ['3 Series', '5 Series', 'X3', 'X5', 'i3'],
      'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'A-Class'],
      'Audi': ['A4', 'A6', 'Q5', 'Q7', 'A3'],
      'Volkswagen': ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf'],
      'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Accent']
    };
    const colors = ['White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Brown', 'Gold', 'Orange'];

    return Array.from({ length: count }, (_, i) => {
      const make = this.getRandomElement(makes);
      const model = this.getRandomElement(models[make as keyof typeof models]);
      const year = this.getRandomNumber(2018, 2025);
      const isNew = year >= 2024 && Math.random() > 0.3;
      const mileage = isNew ? this.getRandomNumber(0, 50) : this.getRandomNumber(1000, 150000);
      const msrp = this.getRandomCurrency(20000, 80000);
      const cost = msrp * (0.7 + Math.random() * 0.2); // 70-90% of MSRP

      return {
        InventoryKey: `INV${String(i + 1).padStart(6, '0')}`,
        VIN: `1${this.getRandomElement(['F', 'G', 'H'])}${Array.from({length: 14}, () => this.getRandomElement('ABCDEFGHJKLMNPRSTUVWXYZ0123456789'.split(''))).join('')}`,
        StockNumber: `STK${String(i + 1).padStart(4, '0')}`,
        Year: year,
        Make: make,
        Model: model,
        IsNew: isNew,
        Mileage: mileage,
        Cost: { Amount: cost, Currency: 'UsDollar' },
        MSRP: { Amount: msrp, Currency: 'UsDollar' },
        SellingPrice: { Amount: msrp * (0.95 + Math.random() * 0.1), Currency: 'UsDollar' },
        Color: this.getRandomElement(colors),
        Engine: this.getRandomElement(['2.0L I4', '3.5L V6', '5.0L V8', '1.5L Turbo', '2.5L Hybrid']),
        Transmission: this.getRandomElement(['Automatic', 'Manual', 'CVT']),
        FuelType: this.getRandomElement(['Gasoline', 'Hybrid', 'Electric', 'Diesel']),
        BodyStyle: this.getRandomElement(['Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback', 'Wagon'])
      };
    });
  }

  // Generate mock deals
  static generateDeals(count: number = 100, customers: Customer[], vehicles: Vehicle[], employees: Employee[], stores: Store[]): DealSummary[] {
    return Array.from({ length: count }, (_, i) => {
      const customer = this.getRandomElement(customers);
      const vehicle = this.getRandomElement(vehicles);
      const salesperson = this.getRandomElement(employees.filter(e => e.Role === 'Salesperson'));
      const financeManager = this.getRandomElement(employees.filter(e => e.Role === 'FinanceManager'));
      const store = this.getRandomElement(stores);
      const dealType = this.getRandomElement([DealType.CASH, DealType.FINANCE, DealType.LEASE]);
      const dealStatus = this.getRandomElement([DealStatus.OPEN, DealStatus.CLOSED, DealStatus.DELIVERED]);
      
      const frontendGross = this.getRandomCurrency(500, 5000);
      const backendGross = dealType !== DealType.CASH ? this.getRandomCurrency(200, 2000) : 0;
      const totalGross = frontendGross + backendGross;

      return {
        dealKey: `DEAL${String(i + 1).padStart(6, '0')}`,
        dealNumber: i + 1,
        customerName: `${customer.Identity.PersonalName.FirstName} ${customer.Identity.PersonalName.LastName}`,
        vehicleInfo: `${vehicle.Year} ${vehicle.Make} ${vehicle.Model}`,
        dealType,
        dealStatus,
        dateSold: dealStatus !== DealStatus.OPEN ? this.getRandomDate(new Date(2024, 0, 1), new Date()) : undefined,
        totalGross,
        frontendGross,
        backendGross,
        salesperson: `${salesperson.PersonalName.FirstName} ${salesperson.PersonalName.LastName}`,
        financeManager: financeManager ? `${financeManager.PersonalName.FirstName} ${financeManager.PersonalName.LastName}` : undefined,
        storeId: store.StoreId,
        storeName: store.StoreName
      };
    });
  }

  // Generate mock service appointments
  static generateServiceAppointments(count: number = 50, customers: Customer[], vehicles: Vehicle[], employees: Employee[]): ServiceAppointment[] {
    const serviceAdvisors = employees.filter(e => e.Role === 'ServiceAdvisor');
    const concerns = [
      'Oil change needed',
      'Strange noise from engine',
      'Brake inspection',
      'Tire rotation',
      'Check engine light',
      'Air conditioning not working',
      'Battery replacement',
      'Transmission service',
      'Wheel alignment',
      'Routine maintenance'
    ];

    return Array.from({ length: count }, (_, i) => {
      const appointmentDate = this.getRandomDate(new Date(), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)); // Next 30 days
      
      return {
        AppointmentKey: `APPT${String(i + 1).padStart(6, '0')}`,
        AppointmentNumber: `A${String(i + 1).padStart(5, '0')}`,
        CustomerKey: this.getRandomElement(customers).CustomerKey,
        VehicleKey: this.getRandomElement(vehicles).InventoryKey,
        AppointmentDate: appointmentDate,
        AppointmentTime: `${this.getRandomNumber(8, 17)}:${this.getRandomElement(['00', '30'])}`,
        Status: this.getRandomElement([
          AppointmentStatus.SCHEDULED,
          AppointmentStatus.CONFIRMED,
          AppointmentStatus.IN_PROGRESS,
          AppointmentStatus.COMPLETED
        ]),
        ServiceAdvisorId: this.getRandomElement(serviceAdvisors).EmployeeId,
        EstimatedDuration: this.getRandomNumber(30, 240), // 30 minutes to 4 hours
        Concerns: [this.getRandomElement(concerns)],
        Notes: Math.random() > 0.5 ? 'Customer prefers morning appointment' : undefined,
        CreatedDate: this.getRandomDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()),
        UpdatedDate: Math.random() > 0.5 ? this.getRandomDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), new Date()) : undefined
      };
    });
  }

  // Generate mock repair orders
  static generateRepairOrders(count: number = 75, customers: Customer[], vehicles: Vehicle[], employees: Employee[]): RepairOrder[] {
    const serviceAdvisors = employees.filter(e => e.Role === 'ServiceAdvisor');
    const technicians = employees.filter(e => e.Role === 'Technician');

    return Array.from({ length: count }, (_, i) => {
      const laborAmount = this.getRandomCurrency(100, 800);
      const partsAmount = this.getRandomCurrency(50, 500);
      const subletAmount = Math.random() > 0.7 ? this.getRandomCurrency(0, 200) : 0;
      const taxAmount = (laborAmount + partsAmount + subletAmount) * 0.08; // 8% tax
      const totalAmount = laborAmount + partsAmount + subletAmount + taxAmount;

      return {
        RepairOrderKey: `RO${String(i + 1).padStart(6, '0')}`,
        RepairOrderNumber: `RO${String(i + 1).padStart(5, '0')}`,
        CustomerKey: this.getRandomElement(customers).CustomerKey,
        VehicleKey: this.getRandomElement(vehicles).InventoryKey,
        ServiceAdvisorId: this.getRandomElement(serviceAdvisors).EmployeeId,
        TechnicianId: this.getRandomElement(technicians).EmployeeId,
        Status: this.getRandomElement([
          RepairOrderStatus.OPEN,
          RepairOrderStatus.IN_PROGRESS,
          RepairOrderStatus.WAITING_PARTS,
          RepairOrderStatus.COMPLETED,
          RepairOrderStatus.INVOICED
        ]),
        OpenDate: this.getRandomDate(new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), new Date()),
        CloseDate: Math.random() > 0.4 ? this.getRandomDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()) : undefined,
        PromisedDate: this.getRandomDate(new Date(), new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)),
        TotalLabor: { Amount: laborAmount, Currency: 'UsDollar' },
        TotalParts: { Amount: partsAmount, Currency: 'UsDollar' },
        TotalSublet: { Amount: subletAmount, Currency: 'UsDollar' },
        TotalTax: { Amount: taxAmount, Currency: 'UsDollar' },
        TotalAmount: { Amount: totalAmount, Currency: 'UsDollar' },
        CustomerConcerns: this.getRandomElement([
          'Vehicle making strange noise',
          'Check engine light on',
          'Brakes feel spongy',
          'Air conditioning not cold',
          'Routine maintenance due'
        ]),
        TechnicianFindings: Math.random() > 0.3 ? 'Diagnosed and repaired as requested' : undefined,
        WorkPerformed: Math.random() > 0.3 ? 'Completed all requested services' : undefined,
        Mileage: this.getRandomNumber(10000, 150000),
        Jobs: [],
        LaborItems: [],
        Parts: [],
        Sublets: []
      };
    });
  }

  // Generate KPI data for different roles
  static generateKPIData(role: UserRole): KPIWidget[] {
    const baseKPIs: Record<UserRole, KPIWidget[]> = {
      [UserRole.GENERAL_MANAGER]: [
        {
          id: 'total-revenue',
          title: 'Total Revenue (MTD)',
          value: this.getRandomCurrency(500000, 2000000),
          previousValue: this.getRandomCurrency(450000, 1800000),
          change: this.getRandomNumber(-10, 15),
          changeType: 'increase',
          format: 'currency',
          icon: 'DollarSign',
          color: 'green'
        },
        {
          id: 'gross-profit',
          title: 'Gross Profit (MTD)',
          value: this.getRandomCurrency(100000, 400000),
          previousValue: this.getRandomCurrency(90000, 350000),
          change: this.getRandomNumber(-5, 20),
          changeType: 'increase',
          format: 'currency',
          icon: 'TrendingUp',
          color: 'blue'
        },
        {
          id: 'units-sold',
          title: 'Units Sold (MTD)',
          value: this.getRandomNumber(80, 300),
          previousValue: this.getRandomNumber(75, 280),
          change: this.getRandomNumber(-10, 25),
          changeType: 'increase',
          format: 'number',
          icon: 'Car',
          color: 'purple'
        },
        {
          id: 'customer-satisfaction',
          title: 'Customer Satisfaction',
          value: this.getRandomNumber(85, 98),
          previousValue: this.getRandomNumber(80, 95),
          change: this.getRandomNumber(-2, 5),
          changeType: 'increase',
          format: 'percentage',
          icon: 'Star',
          color: 'yellow'
        }
      ],
      [UserRole.SALES_MANAGER]: [
        {
          id: 'deals-closed',
          title: 'Deals Closed (Today)',
          value: this.getRandomNumber(5, 25),
          previousValue: this.getRandomNumber(3, 20),
          change: this.getRandomNumber(-20, 30),
          changeType: 'increase',
          format: 'number',
          icon: 'Handshake',
          color: 'green'
        },
        {
          id: 'sales-gross',
          title: 'Sales Gross (MTD)',
          value: this.getRandomCurrency(150000, 600000),
          previousValue: this.getRandomCurrency(140000, 550000),
          change: this.getRandomNumber(-5, 15),
          changeType: 'increase',
          format: 'currency',
          icon: 'DollarSign',
          color: 'blue'
        },
        {
          id: 'closing-ratio',
          title: 'Closing Ratio',
          value: this.getRandomNumber(15, 35),
          previousValue: this.getRandomNumber(12, 30),
          change: this.getRandomNumber(-5, 10),
          changeType: 'increase',
          format: 'percentage',
          icon: 'Target',
          color: 'purple'
        },
        {
          id: 'inventory-turn',
          title: 'Inventory Turn (Days)',
          value: this.getRandomNumber(25, 60),
          previousValue: this.getRandomNumber(30, 65),
          change: this.getRandomNumber(-15, 5),
          changeType: 'decrease',
          format: 'number',
          icon: 'RotateCcw',
          color: 'orange'
        }
      ],
      [UserRole.SERVICE_MANAGER]: [
        {
          id: 'service-revenue',
          title: 'Service Revenue (MTD)',
          value: this.getRandomCurrency(80000, 300000),
          previousValue: this.getRandomCurrency(75000, 280000),
          change: this.getRandomNumber(-5, 20),
          changeType: 'increase',
          format: 'currency',
          icon: 'Wrench',
          color: 'blue'
        },
        {
          id: 'ros-written',
          title: 'ROs Written (Today)',
          value: this.getRandomNumber(15, 50),
          previousValue: this.getRandomNumber(12, 45),
          change: this.getRandomNumber(-10, 25),
          changeType: 'increase',
          format: 'number',
          icon: 'FileText',
          color: 'green'
        },
        {
          id: 'tech-efficiency',
          title: 'Tech Efficiency',
          value: this.getRandomNumber(85, 120),
          previousValue: this.getRandomNumber(80, 115),
          change: this.getRandomNumber(-5, 15),
          changeType: 'increase',
          format: 'percentage',
          icon: 'Gauge',
          color: 'purple'
        },
        {
          id: 'avg-ro-value',
          title: 'Avg RO Value',
          value: this.getRandomCurrency(250, 800),
          previousValue: this.getRandomCurrency(230, 750),
          change: this.getRandomNumber(-10, 20),
          changeType: 'increase',
          format: 'currency',
          icon: 'Calculator',
          color: 'orange'
        }
      ],
      [UserRole.FINANCE_MANAGER]: [
        {
          id: 'backend-gross',
          title: 'Backend Gross (MTD)',
          value: this.getRandomCurrency(50000, 200000),
          previousValue: this.getRandomCurrency(45000, 180000),
          change: this.getRandomNumber(-5, 25),
          changeType: 'increase',
          format: 'currency',
          icon: 'CreditCard',
          color: 'green'
        },
        {
          id: 'penetration-rate',
          title: 'Product Penetration',
          value: this.getRandomNumber(65, 85),
          previousValue: this.getRandomNumber(60, 80),
          change: this.getRandomNumber(-5, 15),
          changeType: 'increase',
          format: 'percentage',
          icon: 'Shield',
          color: 'blue'
        },
        {
          id: 'approval-rate',
          title: 'Approval Rate',
          value: this.getRandomNumber(75, 95),
          previousValue: this.getRandomNumber(70, 90),
          change: this.getRandomNumber(-5, 10),
          changeType: 'increase',
          format: 'percentage',
          icon: 'CheckCircle',
          color: 'purple'
        },
        {
          id: 'avg-backend',
          title: 'Avg Backend per Deal',
          value: this.getRandomCurrency(800, 2500),
          previousValue: this.getRandomCurrency(750, 2300),
          change: this.getRandomNumber(-10, 20),
          changeType: 'increase',
          format: 'currency',
          icon: 'TrendingUp',
          color: 'orange'
        }
      ],
      [UserRole.SALESPERSON]: [
        {
          id: 'my-deals',
          title: 'My Deals (MTD)',
          value: this.getRandomNumber(8, 25),
          previousValue: this.getRandomNumber(6, 20),
          change: this.getRandomNumber(-20, 40),
          changeType: 'increase',
          format: 'number',
          icon: 'User',
          color: 'green'
        },
        {
          id: 'my-gross',
          title: 'My Gross (MTD)',
          value: this.getRandomCurrency(15000, 60000),
          previousValue: this.getRandomCurrency(12000, 50000),
          change: this.getRandomNumber(-15, 30),
          changeType: 'increase',
          format: 'currency',
          icon: 'DollarSign',
          color: 'blue'
        },
        {
          id: 'my-prospects',
          title: 'Active Prospects',
          value: this.getRandomNumber(5, 20),
          previousValue: this.getRandomNumber(3, 18),
          change: this.getRandomNumber(-25, 50),
          changeType: 'increase',
          format: 'number',
          icon: 'Users',
          color: 'purple'
        },
        {
          id: 'my-closing',
          title: 'My Closing Ratio',
          value: this.getRandomNumber(12, 30),
          previousValue: this.getRandomNumber(10, 25),
          change: this.getRandomNumber(-10, 20),
          changeType: 'increase',
          format: 'percentage',
          icon: 'Target',
          color: 'orange'
        }
      ],
      [UserRole.SERVICE_ADVISOR]: [
        {
          id: 'my-appointments',
          title: 'My Appointments (Today)',
          value: this.getRandomNumber(8, 20),
          previousValue: this.getRandomNumber(6, 18),
          change: this.getRandomNumber(-20, 30),
          changeType: 'increase',
          format: 'number',
          icon: 'Calendar',
          color: 'green'
        },
        {
          id: 'my-ros',
          title: 'My ROs (Open)',
          value: this.getRandomNumber(12, 35),
          previousValue: this.getRandomNumber(10, 30),
          change: this.getRandomNumber(-15, 25),
          changeType: 'increase',
          format: 'number',
          icon: 'FileText',
          color: 'blue'
        },
        {
          id: 'my-revenue',
          title: 'My Revenue (MTD)',
          value: this.getRandomCurrency(8000, 25000),
          previousValue: this.getRandomCurrency(7000, 22000),
          change: this.getRandomNumber(-10, 25),
          changeType: 'increase',
          format: 'currency',
          icon: 'DollarSign',
          color: 'purple'
        },
        {
          id: 'my-csi',
          title: 'My CSI Score',
          value: this.getRandomNumber(85, 98),
          previousValue: this.getRandomNumber(80, 95),
          change: this.getRandomNumber(-3, 8),
          changeType: 'increase',
          format: 'percentage',
          icon: 'Star',
          color: 'yellow'
        }
      ],
      [UserRole.TECHNICIAN]: [
        {
          id: 'my-efficiency',
          title: 'My Efficiency',
          value: this.getRandomNumber(85, 125),
          previousValue: this.getRandomNumber(80, 120),
          change: this.getRandomNumber(-10, 15),
          changeType: 'increase',
          format: 'percentage',
          icon: 'Gauge',
          color: 'green'
        },
        {
          id: 'hours-billed',
          title: 'Hours Billed (Today)',
          value: this.getRandomNumber(6, 10),
          previousValue: this.getRandomNumber(5, 9),
          change: this.getRandomNumber(-20, 30),
          changeType: 'increase',
          format: 'number',
          icon: 'Clock',
          color: 'blue',
          unit: 'hrs'
        },
        {
          id: 'jobs-completed',
          title: 'Jobs Completed (Today)',
          value: this.getRandomNumber(4, 12),
          previousValue: this.getRandomNumber(3, 10),
          change: this.getRandomNumber(-25, 40),
          changeType: 'increase',
          format: 'number',
          icon: 'CheckCircle',
          color: 'purple'
        },
        {
          id: 'comeback-rate',
          title: 'Comeback Rate',
          value: this.getRandomNumber(1, 5),
          previousValue: this.getRandomNumber(2, 6),
          change: this.getRandomNumber(-50, 20),
          changeType: 'decrease',
          format: 'percentage',
          icon: 'RotateCcw',
          color: 'orange'
        }
      ],
      [UserRole.PARTS_COUNTER]: [
        {
          id: 'parts-sales',
          title: 'Parts Sales (Today)',
          value: this.getRandomCurrency(2000, 8000),
          previousValue: this.getRandomCurrency(1800, 7500),
          change: this.getRandomNumber(-15, 25),
          changeType: 'increase',
          format: 'currency',
          icon: 'Package',
          color: 'green'
        },
        {
          id: 'invoices-processed',
          title: 'Invoices Processed',
          value: this.getRandomNumber(15, 40),
          previousValue: this.getRandomNumber(12, 35),
          change: this.getRandomNumber(-20, 30),
          changeType: 'increase',
          format: 'number',
          icon: 'Receipt',
          color: 'blue'
        },
        {
          id: 'fill-rate',
          title: 'Fill Rate',
          value: this.getRandomNumber(85, 98),
          previousValue: this.getRandomNumber(80, 95),
          change: this.getRandomNumber(-5, 10),
          changeType: 'increase',
          format: 'percentage',
          icon: 'CheckSquare',
          color: 'purple'
        },
        {
          id: 'avg-ticket',
          title: 'Avg Ticket Value',
          value: this.getRandomCurrency(150, 500),
          previousValue: this.getRandomCurrency(140, 450),
          change: this.getRandomNumber(-10, 20),
          changeType: 'increase',
          format: 'currency',
          icon: 'Calculator',
          color: 'orange'
        }
      ],
      [UserRole.ACCOUNTANT]: [
        {
          id: 'daily-cash',
          title: 'Daily Cash Flow',
          value: this.getRandomCurrency(25000, 100000),
          previousValue: this.getRandomCurrency(20000, 95000),
          change: this.getRandomNumber(-15, 25),
          changeType: 'increase',
          format: 'currency',
          icon: 'Banknote',
          color: 'green'
        },
        {
          id: 'ar-balance',
          title: 'A/R Balance',
          value: this.getRandomCurrency(50000, 200000),
          previousValue: this.getRandomCurrency(55000, 210000),
          change: this.getRandomNumber(-20, 10),
          changeType: 'decrease',
          format: 'currency',
          icon: 'CreditCard',
          color: 'blue'
        },
        {
          id: 'ap-balance',
          title: 'A/P Balance',
          value: this.getRandomCurrency(30000, 150000),
          previousValue: this.getRandomCurrency(35000, 160000),
          change: this.getRandomNumber(-25, 15),
          changeType: 'decrease',
          format: 'currency',
          icon: 'Receipt',
          color: 'purple'
        },
        {
          id: 'profit-margin',
          title: 'Profit Margin',
          value: this.getRandomNumber(12, 25),
          previousValue: this.getRandomNumber(10, 22),
          change: this.getRandomNumber(-10, 20),
          changeType: 'increase',
          format: 'percentage',
          icon: 'TrendingUp',
          color: 'orange'
        }
      ]
    };

    return baseKPIs[role] || [];
  }

  // Generate mock orders
  static generateOrders(count: number = 100, customers: Customer[]): Order[] {
    const orderTypes = Object.values(OrderType);
    const orderStatuses = Object.values(OrderStatus);
    const priorities = Object.values(OrderPriority);
    
    const oemStatuses: Array<'PENDING' | 'CONFIRMED' | 'IN_PRODUCTION' | 'SHIPPED' | 'DELIVERED'> = [
      'PENDING', 'CONFIRMED', 'IN_PRODUCTION', 'SHIPPED', 'DELIVERED'
    ];
    
    const upfitterStatuses: Array<'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'SHIPPED'> = [
      'PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'SHIPPED'
    ];
    
    const logisticsStatuses: Array<'PENDING' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED'> = [
      'PENDING', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED'
    ];
    
    const paymentStatuses: Array<'PENDING' | 'PARTIAL' | 'PAID' | 'OVERDUE'> = [
      'PENDING', 'PARTIAL', 'PAID', 'OVERDUE'
    ];
    
    const administrativeStatuses: Array<'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED'> = [
      'PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'
    ];

    return Array.from({ length: count }, (_, i) => {
      const customer = this.getRandomElement(customers);
      const orderDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
      const expectedDelivery = new Date(orderDate.getTime() + (Math.random() * 30 + 7) * 24 * 60 * 60 * 1000);
      const isDelivered = Math.random() > 0.3; // 70% chance of being delivered
      const actualDelivery = isDelivered ? new Date(expectedDelivery.getTime() + (Math.random() - 0.5) * 7 * 24 * 60 * 60 * 1000) : undefined;
      
      const orderType = this.getRandomElement(orderTypes);
      const baseAmount = orderType === OrderType.VEHICLE ? 25000 : 
                        orderType === OrderType.PARTS ? 500 : 
                        orderType === OrderType.SERVICE ? 1500 : 200;
      
      return {
        OrderKey: `ORD${String(i + 1).padStart(6, '0')}`,
        OrderNumber: `ORD-${String(i + 1).padStart(5, '0')}`,
        CustomerKey: customer.CustomerKey,
        CustomerName: `${customer.Identity.PersonalName.FirstName} ${customer.Identity.PersonalName.LastName}`,
        OrderType: orderType,
        OrderDate: orderDate.toISOString(),
        ExpectedDeliveryDate: expectedDelivery.toISOString(),
        ActualDeliveryDate: actualDelivery?.toISOString(),
        TotalAmount: this.getRandomCurrency(baseAmount * 0.8, baseAmount * 1.2),
        Status: this.getRandomElement(orderStatuses),
        OEMStatus: this.getRandomElement(oemStatuses),
        UpfitterStatus: this.getRandomElement(upfitterStatuses),
        LogisticsStatus: this.getRandomElement(logisticsStatuses),
        PaymentStatus: this.getRandomElement(paymentStatuses),
        AdministrativeStatus: this.getRandomElement(administrativeStatuses),
        Notes: Math.random() > 0.7 ? `Order note ${i + 1}: ${this.getRandomElement(['Special instructions', 'Customer preference', 'Rush order', 'Custom configuration'])}` : undefined,
        Priority: this.getRandomElement(priorities)
      };
    });
  }
}

// Export pre-generated data sets
export const mockStores = MockDataGenerator.generateStores(3);
export const mockEmployees = MockDataGenerator.generateEmployees(25);
export const mockCustomers = MockDataGenerator.generateCustomers(150);
export const mockVehicles = MockDataGenerator.generateVehicles(75);
export const mockDeals = MockDataGenerator.generateDeals(120, mockCustomers, mockVehicles, mockEmployees, mockStores);
export const mockAppointments = MockDataGenerator.generateServiceAppointments(60, mockCustomers, mockVehicles, mockEmployees);
export const mockRepairOrders = MockDataGenerator.generateRepairOrders(80, mockCustomers, mockVehicles, mockEmployees);
export const mockOrders = MockDataGenerator.generateOrders(120, mockCustomers);

