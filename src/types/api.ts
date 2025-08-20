// Core API Types for Pritchard Companies CDX API

export interface Currency {
  Amount: number;
  Currency: 'UsDollar' | string;
}

export interface PersonalName {
  FirstName: string;
  LastName: string;
  MiddleName?: string;
  SingularName?: string;
  Suffix?: string;
  Title?: 'None' | string;
}

export interface PhoneNumber {
  Digits: string;
  NumberType: 'Unknown' | 'Home' | 'Work' | 'Mobile' | 'Fax';
}

export interface StreetAddress {
  Line1: string;
  Line2?: string;
  City: string;
  State: string;
  Zip: string;
  Country?: string;
  County?: string;
}

export interface Identity {
  PersonalName: PersonalName;
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  Zip?: string;
  Country?: string;
  County?: string;
  CitySubDivisionName?: string;
  EmailAddress?: string;
  PhoneNumbers?: PhoneNumber[];
  BirthDate?: string;
  Sex?: 'Unknown' | 'Male' | 'Female';
  Ssn?: string;
  Title?: string;
  // Spouse information
  SpouseName?: PersonalName;
  SpouseAddress1?: string;
  SpouseAddress2?: string;
  SpouseCity?: string;
  SpouseState?: string;
  SpouseZip?: string;
  SpouseCountry?: string;
  SpouseCounty?: string;
  SpouseEmailAddress?: string;
  SpousePhoneNumbers?: PhoneNumber[];
  SpouseBirthDate?: string;
  SpouseSex?: 'Unknown' | 'Male' | 'Female';
  SpouseSsn?: string;
}

export interface License {
  Number: string;
  State: string;
}

export interface NumberedPersonInfo {
  Number: string;
  PersonalName: PersonalName;
  Username?: string;
  Ssn?: string;
  StreetAddress?: StreetAddress;
  FactoryID?: string;
  OtherId?: string;
  SpecialRemarksDescription?: string;
  EventID?: string;
  EventDescription?: string;
  EventOccurrenceDateTime?: string;
  IsActive?: boolean;
}

export interface Placement {
  GroupId: number;
  GroupName: string;
  EnvironmentId: number;
  EnvironmentType: string;
  DealerId: number;
  SourceId: number;
  CompanyId: number;
  CompanyName: string;
  StoreId: number;
  StoreName: string;
}

// Deal Search Criteria
export interface DealSearchCriteria {
  StoreIds: number[];
  MinimumUpdateStamp?: string;
  MaximumUpdateStamp?: string;
  MinDateSold?: string;
  MaxDateSold?: string;
  PartialVin?: string;
  ExactVin?: string;
  StockNumber?: string;
  IncludeUnstockedTrades?: boolean;
  MaxElapsedSinceUpdate?: string;
  SuppressErrors?: boolean;
}

// Customer Types
export interface Customer {
  CustomerKey: string;
  Identity: Identity;
  DMSCustomerID?: string;
  CustomerType?: 'Retail' | 'Wholesale' | 'Fleet';
  CustomerTypeDetail?: string;
  License?: License;
  IsMarried?: boolean;
  RelationshipType?: 'Other' | 'Spouse' | 'CoSigner';
  PhoneNumber?: string; // For display purposes
  // Index signature for dynamic property access (needed for sorting)
  [key: string]: any;
}

// Vehicle/Inventory Types
export interface Vehicle {
  InventoryKey: string;
  VIN: string;
  StockNumber: string;
  Year: number;
  Make: string;
  Model: string;
  Trim?: string;
  IsNew: boolean;
  Mileage?: number;
  Cost?: Currency;
  MSRP?: Currency;
  SellingPrice?: Currency;
  Color?: string;
  Engine?: string;
  Transmission?: string;
  FuelType?: string;
  BodyStyle?: string;
  DaysOnLot?: number;
}

// Employee Types
export interface Employee {
  EmployeeId: string;
  PersonalName: PersonalName;
  Role: 'Salesperson' | 'ServiceAdvisor' | 'Technician' | 'FinanceManager' | 'ServiceManager' | 'SalesManager' | 'GeneralManager';
  IsActive: boolean;
  FactoryID?: string;
  Username?: string;
}

// Store Types
export interface Store {
  StoreId: number;
  StoreName: string;
  Address?: StreetAddress;
  LegalName?: string;
  DealerState?: string;
  DealerZip?: string;
}

export interface DealerFee {
  FeeAmount: Currency;
  FeeDescription: string;
  FeeHandlingType: 'Undefined' | string;
  FeeType: 'StateDmvCountyFees' | string;
}

export interface DealerTax {
  Amount: Currency;
  Description: string;
  Rate: number;
  TaxType: 'StateSalesTax' | string;
  IsAddedToMonthlyUseTax?: boolean;
  IsCapitalized?: boolean;
  IsPaidUpFront?: boolean;
}

export interface DeferredDownPayment {
  Amount: Currency;
  PaymentDate: string;
}

export interface BuyDetails {
  AmountFinanced?: Currency;
  BalloonRate?: number;
  BeaconScore?: number;
  DeferredDownPayments?: DeferredDownPayment[];
  DeliveredPrice?: Currency;
  Deposit?: Currency;
  Fees?: {
    Bank?: { Fee: Currency };
    DealerFees?: DealerFee[];
    Licensing?: { Fee: Currency };
    LoanOrigination?: { Fee: Currency };
    LoanProcessing?: { Fee: Currency };
    ProratedLicensing?: { Fee: Currency };
    TradeLicensing?: { Fee: Currency };
  };
  FinalPayment?: Currency;
  FinanceCharge?: Currency;
  LsiVsi?: Currency;
  PaymentDescription?: string;
  PaymentType?: string;
  RetailContractDisclosureVerbiage?: string;
  Taxes?: {
    DealerTaxes?: DealerTax[];
  };
  TotalAmountFinanced?: Currency;
  TradeTaxCredit?: Currency;
}

export interface LeaseDetails {
  BaseResidualAmount?: Currency;
  CapCostReduction?: Currency;
  CashCapReductionAmount?: Currency;
  CashDown?: Currency;
  CashRequired?: Currency;
  CashShort?: Currency;
  EstimatedOfficialFeeTax?: Currency;
  FactorInterestType?: string;
  FeeAmount?: Currency;
  Fees?: {
    Acquisition?: { Fee: Currency; FeeType: string };
    DealerFees?: DealerFee[];
    Disposition?: { Fee: Currency };
    Licensing?: { Fee: Currency; FeeType: string };
    ProratedLicensing?: { Fee: Currency; FeeType: string };
    TradeLicensing?: { Fee: Currency; FeeType: string };
  };
  GrossCapCost?: Currency;
  HardAddsResidualAmount?: Currency;
  HardAddsResidualPercentage?: number;
  IsOnePayLease?: boolean;
  LeaseBuyRate?: number;
  LeaseContractDisclosureVerbiage?: string;
  MileageActual?: number;
  MileageAllowance?: number;
  MileageDollarsPerMileLeaseEnd?: Currency;
}

export interface ItemizationBase {
  ItemizationId: number;
  Name: string;
  Cost?: Currency;
  Price?: Currency;
  DeleteFlag?: boolean;
  Department?: 'Other' | string;
  ItemCode?: string;
  Residual?: Currency;
}

export interface CostAdd extends ItemizationBase {}
export interface HardAdd extends ItemizationBase {}

export interface Incentive extends ItemizationBase {
  IncentiveAmount: Currency;
  Note?: string;
}

export interface InsuranceProduct extends ItemizationBase {
  Agent?: Identity;
  CompanyName?: string;
  CompanyCode?: string;
  CompanyAddress?: string;
  CompanyCSZ?: string;
  ContractNumber?: string;
  DisabilityCost?: Currency;
  DisabilityPremium?: Currency;
  EffectiveDate?: string;
  ExpirationDate?: string;
  InsuranceType?: 'Unknown' | string;
  IsTaxed?: boolean;
  TermMonths?: number;
}

export interface TradeIn {
  Vehicle: Vehicle;
  Attributes: {
    Allowance?: Currency;
    Payoff?: Currency;
    Acv?: Currency; // Actual Cash Value
  };
}

export interface Cobuyer {
  Identity: Identity;
  IsMarried?: boolean;
  License?: License;
  RelationshipType?: 'Other' | 'Spouse' | 'CoSigner';
}

