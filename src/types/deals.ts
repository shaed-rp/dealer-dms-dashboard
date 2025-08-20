import { 
  Currency, 
  Placement, 
  NumberedPersonInfo, 
  Cobuyer, 
  License,
  CostAdd,
  HardAdd,
  Incentive,
  InsuranceProduct,
  TradeIn,
  BuyDetails,
  LeaseDetails
} from './api';

export interface DealAttributes {
  // Basic Deal Information
  DealNumber: number;
  DateSold?: string;
  DealStatus: 'Open' | 'Closed' | 'Delivered' | 'Cancelled';
  DealStatusList?: string[];
  DealType: 'Cash' | 'Finance' | 'Lease';
  CustomerType?: 'Retail' | 'Wholesale' | 'Fleet';
  CustomerTypeDetail?: string;
  
  // Financial Information
  TotalGrossProfit?: Currency;
  FrontendGrossProfit?: Currency;
  BackendGrossProfit?: Currency;
  BaseVehicleGross?: Currency;
  FinanceDeptGross?: Currency;
  FinanceDeptGrossWithHoldback?: Currency;
  GrossSellingPrice?: Currency;
  SellingPrice?: Currency;
  FinancePurchasePriceAmount?: Currency;
  
  // Payment Information
  DownPayment?: Currency;
  DownPaymentAmount?: Currency;
  CashDownPayment?: Currency;
  TotalDownPayment?: Currency;
  AmountFinanced?: Currency;
  FinanceCharge?: Currency;
  FinanceChargeAmount?: Currency;
  FinaceChargeAmount?: Currency; // Note: API has typo
  AnnualPercentageRate?: Currency;
  
  // Dates
  ContractDate?: string;
  FirstPaymentDate?: string;
  DateApproved?: string;
  DateProcessed?: string;
  DateCheckedOut?: string;
  DateSentToAccounting?: string;
  DateAccountingReceived?: string;
  EventOccurrenceDateTime?: string;
  
  // Status Flags
  IsSold?: boolean;
  IsApproved?: boolean;
  IsProcessed?: boolean;
  IsCheckedOut?: boolean;
  IsSentToAccounting?: boolean;
  IsAccountingReceived?: boolean;
  Approveindicator?: boolean;
  
  // Customer Information
  CustomerDriverLicense?: License;
  Cobuyer?: Cobuyer;
  
  // Location Information
  City?: string;
  DealerState?: string;
  DealerZip?: string;
  FIPSStateCode?: string;
  FIPSCountyCode?: string;
  
  // Finance Information
  LenderName?: string;
  BuyRate?: number;
  FinanceReserve?: Currency;
  DaysToFirstPayment?: number;
  ContractTermDistanceMeasure?: number;
  InterestDays?: number;
  
  // Insurance and Protection Products
  CreditLifeCost?: Currency;
  CreditLifeCoverage?: Currency;
  CreditLifePremium?: Currency;
  CreditLifeReserve?: Currency;
  CreditLifeTerm?: number;
  CreditLifeExpirationDate?: string;
  CreditDisabilityTermMeasure?: number;
  DecrLifePremium?: Currency;
  DisabilityCost?: Currency;
  DisabilityPrice?: Currency;
  
  // GAP Insurance
  GapCost?: Currency;
  GapCoverage?: Currency;
  GapPremiumAmount?: Currency;
  GapReserveAmount?: Currency;
  GapRate?: Currency;
  GapTermMonth?: number;
  GapExpirationDate?: string;
  GapProvider?: string;
  
  // Extended Warranty
  InsuranceTotalExtendedWarrantyAmount?: Currency;
  InsuranceCompanyName?: string;
  InsuranceDeductible?: Currency;
  CoverageExpirationDate?: string;
  
  // Fees and Costs
  FeeAmount?: Currency;
  CommissionsPack?: Currency;
  DealerRebateAmount?: Currency;
  DiscountOtherTotal?: Currency;
  HardAddsTotal?: Currency;
  IncentivesTotal?: Currency;
  
  // Trade Information
  NetTradeAllowance?: Currency;
  
  // Lease Specific
  CostPerDistance?: Currency;
  AnnualAllowance?: number;
  BalanceAmount?: Currency;
  BaloonPayment?: Currency;
  BasePaymentAmount?: Currency;
  FinalAmount?: Currency;
  
  // Other
  AdvertisingSource?: string;
  AdvertisingSourceCode?: string;
  FleetAccountString?: string;
  DealPurchaseProgram?: 'None' | string;
  DealerTransferParty?: string;
  IcobuyerPrimaryDriver?: number;
  
  // Collections
  FinanceManagers?: NumberedPersonInfo[];
  SalesPeople?: NumberedPersonInfo[];
  CostAdds?: CostAdd[];
  HardAdds?: HardAdd[];
  Incentives?: Incentive[];
  InsuranceProducts?: InsuranceProduct[];
  
  // Transaction Details
  Buy?: BuyDetails;
  Lease?: LeaseDetails;
}

export interface DealReferences {
  CustomerKey: string;
  InventoryKey: string;
  TradeIns?: TradeIn[];
}

export interface Deal {
  DealKey: string;
  DealNumber: number;
  Placement: Placement;
  Attributes: DealAttributes;
  References: DealReferences;
}

export interface DealSearchResponse {
  Deals: Deal[];
  TotalCount?: number;
  HasMore?: boolean;
}

// Simplified Deal for Dashboard Display
export interface DealSummary {
  dealKey: string;
  dealNumber: number;
  customerName: string;
  vehicleInfo: string;
  dealType: string;
  dealStatus: string;
  dateSold?: string;
  totalGross?: number;
  frontendGross?: number;
  backendGross?: number;
  salesperson?: string;
  financeManager?: string;
  storeId: number;
  storeName: string;
}

// Deal Status Enums
export enum DealStatus {
  OPEN = 'Open',
  CLOSED = 'Closed',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled'
}

export enum DealType {
  CASH = 'Cash',
  FINANCE = 'Finance',
  LEASE = 'Lease'
}

export enum CustomerType {
  RETAIL = 'Retail',
  WHOLESALE = 'Wholesale',
  FLEET = 'Fleet'
}

