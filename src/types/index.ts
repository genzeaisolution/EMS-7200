// Organization Types
export interface Organization {
  OrganizationID: string;
  Name: string;
  Slug: string;
  LegalName?: string;
  TaxID?: string;
  RegistrationNumber?: string;
  Industry?: string;
  LogoURL?: string;
  Website?: string;
  Email?: string;
  Phone?: string;
  Address?: string;
  City?: string;
  State?: string;
  Country?: string;
  PostalCode?: string;
  Timezone: string;
  Currency: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface Branch {
  BranchID: string;
  OrganizationID: string;
  ParentBranchID?: string;
  Name: string;
  Code?: string;
  BranchType?: string;
  ManagerID?: string;
  Email?: string;
  Phone?: string;
  Address?: string;
  City?: string;
  State?: string;
  Country?: string;
  PostalCode?: string;
  IsHeadOffice: boolean;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface Department {
  DepartmentID: string;
  OrganizationID: string;
  BranchID: string;
  ParentDepartmentID?: string;
  Name: string;
  Code?: string;
  Description?: string;
  ManagerID?: string;
  CostCenter?: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface Team {
  TeamID: string;
  OrganizationID: string;
  BranchID: string;
  DepartmentID: string;
  Name: string;
  Code?: string;
  Description?: string;
  LeaderID?: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

// User Types
export interface User {
  UserID: string;
  OrganizationID: string;
  BranchID?: string;
  Username: string;
  Email: string;
  PasswordHash?: string;
  PasswordSalt?: string;
  UserType: string;
  IsEmailVerified: boolean;
  IsMFAEnabled: boolean;
  MFASecret?: string;
  IsActive: boolean;
  IsLocked: boolean;
  LockReason?: string;
  LockedAt?: string;
  LockExpiresAt?: string;
  FailedLoginCount: number;
  LastLoginAt?: string;
  LastLoginIP?: string;
  PasswordChangedAt?: string;
  ForcePasswordChange: boolean;
  IsDeleted: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface UserProfile {
  ProfileID: string;
  UserID: string;
  OrganizationID: string;
  FirstName: string;
  LastName: string;
  MiddleName?: string;
  DisplayName?: string;
  AvatarURL?: string;
  DateOfBirth?: string;
  Gender?: string;
  Phone?: string;
  MobilePhone?: string;
  Address?: string;
  City?: string;
  State?: string;
  Country?: string;
  PostalCode?: string;
  Bio?: string;
  Timezone: string;
  Language: string;
  CreatedAt: string;
  UpdatedAt: string;
}

// Employee Types
export interface Employee {
  EmployeeID: string;
  UserID?: string;
  OrganizationID: string;
  BranchID: string;
  DepartmentID: string;
  TeamID?: string;
  DesignationID?: string;
  EmployeeCode: string;
  ManagerID?: string;
  EmploymentType: string;
  EmploymentStatus: string;
  JoinDate: string;
  ConfirmationDate?: string;
  ProbationEndDate?: string;
  ResignationDate?: string;
  TerminationDate?: string;
  TerminationReason?: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface EmployeeProfile {
  ProfileID: string;
  EmployeeID: string;
  OrganizationID: string;
  FirstName: string;
  LastName: string;
  MiddleName?: string;
  NationalID?: string;
  PassportNumber?: string;
  DateOfBirth?: string;
  Gender?: string;
  Nationality?: string;
  BloodGroup?: string;
  MaritalStatus?: string;
  PersonalEmail?: string;
  WorkEmail?: string;
  PersonalPhone?: string;
  WorkPhone?: string;
  AvatarURL?: string;
  CreatedAt: string;
  UpdatedAt: string;
}

// Agent Types
export interface Agent {
  AgentID: string;
  UserID?: string;
  EmployeeID?: string;
  OrganizationID: string;
  BranchID: string;
  AgentCode: string;
  AgentType: string;
  ManagerID?: string;
  Status: string;
  LicenseNumber?: string;
  LicenseExpiryDate?: string;
  JoinDate?: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface AgentPerformance {
  PerformanceID: string;
  AgentID: string;
  OrganizationID: string;
  PeriodType: string;
  PeriodYear: number;
  PeriodMonth?: number;
  PeriodQuarter?: number;
  TargetValue?: number;
  AchievedValue?: number;
  PerformanceScore?: number;
  Rating?: string;
  Notes?: string;
  ReviewedBy?: string;
  ReviewedAt?: string;
  CreatedAt: string;
  UpdatedAt: string;
}

// Task Types
export interface Task {
  TaskID: string;
  OrganizationID: string;
  BranchID?: string;
  ParentTaskID?: string;
  Title: string;
  Description?: string;
  StatusID?: string;
  PriorityID?: string;
  AssignedToUserID?: string;
  AssignedToTeamID?: string;
  DueDate?: string;
  StartDate?: string;
  CompletedAt?: string;
  EstimatedHours?: number;
  ActualHours?: number;
  Tags?: string;
  IsArchived: boolean;
  IsDeleted: boolean;
  CreatedBy?: string;
  CreatedAt: string;
  UpdatedBy?: string;
  UpdatedAt: string;
}

// Ticket Types
export interface Ticket {
  TicketID: string;
  OrganizationID: string;
  BranchID?: string;
  TicketNumber: string;
  Title: string;
  Description?: string;
  StatusID?: string;
  CategoryID?: string;
  Priority: string;
  RequesterID: string;
  AssignedToID?: string;
  DueDate?: string;
  ResolvedAt?: string;
  ClosedAt?: string;
  SLABreached: boolean;
  Tags?: string;
  IsDeleted: boolean;
  CreatedBy?: string;
  CreatedAt: string;
  UpdatedBy?: string;
  UpdatedAt: string;
}

// Document Types
export interface Document {
  DocumentID: string;
  OrganizationID: string;
  FolderID?: string;
  Title: string;
  Description?: string;
  DocumentType?: string;
  FileName: string;
  FileURL: string;
  FileSize?: number;
  MimeType?: string;
  Version: number;
  Status: string;
  Tags?: string;
  IsPublic: boolean;
  IsDeleted: boolean;
  CreatedBy?: string;
  CreatedAt: string;
  UpdatedBy?: string;
  UpdatedAt: string;
}

// Workflow Types
export interface Workflow {
  WorkflowID: string;
  OrganizationID: string;
  Name: string;
  Code: string;
  Description?: string;
  EntityType: string;
  TriggerType: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedBy?: string;
  CreatedAt: string;
  UpdatedBy?: string;
  UpdatedAt: string;
}

export interface WorkflowApproval {
  ApprovalID: string;
  WorkflowID: string;
  StageID: string;
  OrganizationID: string;
  EntityID: string;
  EntityType: string;
  RequestedBy: string;
  ApproverID?: string;
  Status: string;
  Decision?: string;
  DecisionNote?: string;
  DecidedAt?: string;
  DueAt?: string;
  IsEscalated: boolean;
  EscalatedAt?: string;
  CreatedBy?: string;
  CreatedAt: string;
  UpdatedBy?: string;
  UpdatedAt: string;
}

// Role Types
export interface Role {
  RoleID: string;
  OrganizationID?: string;
  Name: string;
  Code: string;
  Description?: string;
  IsSystemRole: boolean;
  IsSuperAdmin: boolean;
  Level: number;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface Permission {
  PermissionID: string;
  GroupID: string;
  Name: string;
  Code: string;
  Description?: string;
  Resource: string;
  Action: string;
  IsSystemPermission: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

// Common Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
