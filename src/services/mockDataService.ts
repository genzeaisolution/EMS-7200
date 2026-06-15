import {
  Organization,
  Employee,
  Agent,
  Task,
  Ticket,
  Document,
  Workflow,
  PaginatedResponse,
} from '../types';

// Helper function to generate IDs
const generateId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};

// Helper function to simulate network delay
const delay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Helper function to get or initialize data from localStorage
const getStoredData = <T>(key: string, defaultData: T[]): T[] => {
  const stored = localStorage.getItem(key);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(key, JSON.stringify(defaultData));
  return defaultData;
};

// Helper function to save data to localStorage
const saveStoredData = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Mock Organizations Data
const mockOrganizations: Organization[] = [
  {
    OrganizationID: 'org-001',
    Name: 'TechCorp Inc.',
    Slug: 'techcorp',
    LegalName: 'TechCorp Incorporated',
    TaxID: '123456789',
    Industry: 'Technology',
    Website: 'https://techcorp.com',
    Email: 'info@techcorp.com',
    Phone: '+1234567890',
    Address: '123 Tech Street',
    City: 'San Francisco',
    State: 'CA',
    Country: 'USA',
    PostalCode: '94105',
    Timezone: 'America/Los_Angeles',
    Currency: 'USD',
    IsActive: true,
    IsDeleted: false,
    CreatedAt: '2024-01-01T00:00:00Z',
    UpdatedAt: '2024-01-01T00:00:00Z',
  },
  {
    OrganizationID: 'org-002',
    Name: 'Global Solutions LLC',
    Slug: 'global-solutions',
    LegalName: 'Global Solutions Limited Liability Company',
    Industry: 'Consulting',
    Website: 'https://globalsolutions.com',
    Email: 'contact@globalsolutions.com',
    Phone: '+1987654321',
    Address: '456 Business Ave',
    City: 'New York',
    State: 'NY',
    Country: 'USA',
    PostalCode: '10001',
    Timezone: 'America/New_York',
    Currency: 'USD',
    IsActive: true,
    IsDeleted: false,
    CreatedAt: '2024-01-15T00:00:00Z',
    UpdatedAt: '2024-01-15T00:00:00Z',
  },
];

// Mock Employees Data
const mockEmployees: Employee[] = [
  {
    EmployeeID: 'emp-001',
    UserID: 'user-001',
    OrganizationID: 'org-001',
    BranchID: 'branch-001',
    DepartmentID: 'dept-001',
    EmployeeCode: 'EMP001',
    EmploymentType: 'full-time',
    EmploymentStatus: 'active',
    JoinDate: '2023-01-01',
    IsActive: true,
    IsDeleted: false,
    CreatedAt: '2023-01-01T00:00:00Z',
    UpdatedAt: '2023-01-01T00:00:00Z',
  },
  {
    EmployeeID: 'emp-002',
    UserID: 'user-002',
    OrganizationID: 'org-001',
    BranchID: 'branch-001',
    DepartmentID: 'dept-002',
    EmployeeCode: 'EMP002',
    EmploymentType: 'full-time',
    EmploymentStatus: 'active',
    JoinDate: '2023-02-15',
    IsActive: true,
    IsDeleted: false,
    CreatedAt: '2023-02-15T00:00:00Z',
    UpdatedAt: '2023-02-15T00:00:00Z',
  },
  {
    EmployeeID: 'emp-003',
    UserID: 'user-003',
    OrganizationID: 'org-002',
    BranchID: 'branch-002',
    DepartmentID: 'dept-003',
    EmployeeCode: 'EMP003',
    EmploymentType: 'contract',
    EmploymentStatus: 'active',
    JoinDate: '2023-03-01',
    IsActive: true,
    IsDeleted: false,
    CreatedAt: '2023-03-01T00:00:00Z',
    UpdatedAt: '2023-03-01T00:00:00Z',
  },
];

// Mock Agents Data
const mockAgents: Agent[] = [
  {
    AgentID: 'agent-001',
    EmployeeID: 'emp-001',
    OrganizationID: 'org-001',
    BranchID: 'branch-001',
    AgentCode: 'AGT001',
    AgentType: 'sales',
    Status: 'active',
    LicenseNumber: 'LIC123456',
    LicenseExpiryDate: '2025-12-31',
    JoinDate: '2023-01-01',
    IsActive: true,
    IsDeleted: false,
    CreatedAt: '2023-01-01T00:00:00Z',
    UpdatedAt: '2023-01-01T00:00:00Z',
  },
  {
    AgentID: 'agent-002',
    EmployeeID: 'emp-002',
    OrganizationID: 'org-001',
    BranchID: 'branch-001',
    AgentCode: 'AGT002',
    AgentType: 'support',
    Status: 'active',
    JoinDate: '2023-02-15',
    IsActive: true,
    IsDeleted: false,
    CreatedAt: '2023-02-15T00:00:00Z',
    UpdatedAt: '2023-02-15T00:00:00Z',
  },
];

// Mock Tasks Data
const mockTasks: Task[] = [
  {
    TaskID: 'task-001',
    OrganizationID: 'org-001',
    Title: 'Complete project proposal',
    Description: 'Draft and submit the Q1 project proposal',
    StatusID: 'status-001',
    PriorityID: 'priority-001',
    AssignedToUserID: 'user-001',
    DueDate: '2024-02-01',
    StartDate: '2024-01-15',
    EstimatedHours: 8,
    ActualHours: 6,
    Tags: 'project,proposal,q1',
    IsArchived: false,
    IsDeleted: false,
    CreatedBy: 'user-001',
    CreatedAt: '2024-01-15T00:00:00Z',
    UpdatedBy: 'user-001',
    UpdatedAt: '2024-01-20T00:00:00Z',
  },
  {
    TaskID: 'task-002',
    OrganizationID: 'org-001',
    Title: 'Review client feedback',
    Description: 'Analyze and respond to client feedback',
    StatusID: 'status-002',
    PriorityID: 'priority-002',
    AssignedToUserID: 'user-002',
    DueDate: '2024-02-05',
    StartDate: '2024-01-20',
    EstimatedHours: 4,
    Tags: 'client,feedback,review',
    IsArchived: false,
    IsDeleted: false,
    CreatedBy: 'user-002',
    CreatedAt: '2024-01-20T00:00:00Z',
    UpdatedBy: 'user-002',
    UpdatedAt: '2024-01-22T00:00:00Z',
  },
  {
    TaskID: 'task-003',
    OrganizationID: 'org-002',
    ParentTaskID: 'task-001',
    Title: 'Prepare presentation slides',
    Description: 'Create slides for the project presentation',
    StatusID: 'status-001',
    PriorityID: 'priority-001',
    AssignedToUserID: 'user-003',
    DueDate: '2024-02-10',
    EstimatedHours: 6,
    Tags: 'presentation,slides',
    IsArchived: false,
    IsDeleted: false,
    CreatedBy: 'user-003',
    CreatedAt: '2024-01-22T00:00:00Z',
    UpdatedBy: 'user-003',
    UpdatedAt: '2024-01-22T00:00:00Z',
  },
];

// Mock Tickets Data
const mockTickets: Ticket[] = [
  {
    TicketID: 'ticket-001',
    OrganizationID: 'org-001',
    TicketNumber: 'TKT-001',
    Title: 'Login issue reported',
    Description: 'User unable to login to the system',
    StatusID: 'status-001',
    CategoryID: 'cat-001',
    Priority: 'high',
    RequesterID: 'user-001',
    AssignedToID: 'user-002',
    DueDate: '2024-01-25',
    SLABreached: false,
    Tags: 'login,issue,urgent',
    IsDeleted: false,
    CreatedBy: 'user-001',
    CreatedAt: '2024-01-23T00:00:00Z',
    UpdatedBy: 'user-001',
    UpdatedAt: '2024-01-23T00:00:00Z',
  },
  {
    TicketID: 'ticket-002',
    OrganizationID: 'org-001',
    TicketNumber: 'TKT-002',
    Title: 'Feature request: dashboard customization',
    Description: 'User wants to customize dashboard layout',
    StatusID: 'status-002',
    CategoryID: 'cat-002',
    Priority: 'medium',
    RequesterID: 'user-002',
    DueDate: '2024-02-01',
    SLABreached: false,
    Tags: 'feature,dashboard,customization',
    IsDeleted: false,
    CreatedBy: 'user-002',
    CreatedAt: '2024-01-24T00:00:00Z',
    UpdatedBy: 'user-002',
    UpdatedAt: '2024-01-24T00:00:00Z',
  },
];

// Mock Documents Data
const mockDocuments: Document[] = [
  {
    DocumentID: 'doc-001',
    OrganizationID: 'org-001',
    Title: 'Employee Handbook 2024',
    Description: 'Company policies and procedures',
    DocumentType: 'pdf',
    FileName: 'employee-handbook-2024.pdf',
    FileURL: '/documents/employee-handbook-2024.pdf',
    FileSize: 2048576,
    MimeType: 'application/pdf',
    Version: 1,
    Status: 'published',
    Tags: 'handbook,policy,2024',
    IsPublic: true,
    IsDeleted: false,
    CreatedBy: 'user-001',
    CreatedAt: '2024-01-01T00:00:00Z',
    UpdatedBy: 'user-001',
    UpdatedAt: '2024-01-01T00:00:00Z',
  },
  {
    DocumentID: 'doc-002',
    OrganizationID: 'org-001',
    Title: 'Q1 Financial Report',
    Description: 'Financial analysis for Q1 2024',
    DocumentType: 'xlsx',
    FileName: 'q1-financial-report.xlsx',
    FileURL: '/documents/q1-financial-report.xlsx',
    FileSize: 1048576,
    MimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    Version: 1,
    Status: 'published',
    Tags: 'finance,q1,2024,report',
    IsPublic: false,
    IsDeleted: false,
    CreatedBy: 'user-002',
    CreatedAt: '2024-01-15T00:00:00Z',
    UpdatedBy: 'user-002',
    UpdatedAt: '2024-01-15T00:00:00Z',
  },
];

// Mock Workflows Data
const mockWorkflows: Workflow[] = [
  {
    WorkflowID: 'workflow-001',
    OrganizationID: 'org-001',
    Name: 'Leave Approval Workflow',
    Code: 'LEAVE-APPROVAL',
    Description: 'Approval process for leave requests',
    EntityType: 'leave_request',
    TriggerType: 'manual',
    IsActive: true,
    IsDeleted: false,
    CreatedBy: 'user-001',
    CreatedAt: '2024-01-01T00:00:00Z',
    UpdatedBy: 'user-001',
    UpdatedAt: '2024-01-01T00:00:00Z',
  },
  {
    WorkflowID: 'workflow-002',
    OrganizationID: 'org-001',
    Name: 'Expense Approval Workflow',
    Code: 'EXPENSE-APPROVAL',
    Description: 'Approval process for expense reports',
    EntityType: 'expense_report',
    TriggerType: 'manual',
    IsActive: true,
    IsDeleted: false,
    CreatedBy: 'user-001',
    CreatedAt: '2024-01-10T00:00:00Z',
    UpdatedBy: 'user-001',
    UpdatedAt: '2024-01-10T00:00:00Z',
  },
];

// Organization Service
export const mockOrganizationService = {
  async getOrganizations(params?: any): Promise<PaginatedResponse<Organization>> {
    await delay();
    const organizations = getStoredData<Organization>('mock-organizations', mockOrganizations);
    
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const search = params?.search?.toLowerCase();
    
    let filtered = organizations;
    if (search) {
      filtered = organizations.filter(org => 
        org.Name.toLowerCase().includes(search) ||
        org.Slug.toLowerCase().includes(search)
      );
    }
    
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize);
    
    return {
      data: paginatedData,
      total: filtered.length,
      page,
      pageSize,
      totalPages: Math.ceil(filtered.length / pageSize),
    };
  },

  async getOrganization(id: string): Promise<Organization> {
    await delay();
    const organizations = getStoredData<Organization>('mock-organizations', mockOrganizations);
    const org = organizations.find(o => o.OrganizationID === id);
    if (!org) throw new Error('Organization not found');
    return org;
  },

  async createOrganization(data: Partial<Organization>): Promise<Organization> {
    await delay();
    const organizations = getStoredData<Organization>('mock-organizations', mockOrganizations);
    const newOrg: Organization = {
      OrganizationID: generateId('org'),
      Name: data.Name || '',
      Slug: data.Slug || data.Name?.toLowerCase().replace(/\s+/g, '-') || '',
      Timezone: 'UTC',
      Currency: 'USD',
      IsActive: true,
      IsDeleted: false,
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
      ...data,
    };
    organizations.push(newOrg);
    saveStoredData('mock-organizations', organizations);
    return newOrg;
  },

  async updateOrganization(id: string, data: Partial<Organization>): Promise<Organization> {
    await delay();
    const organizations = getStoredData<Organization>('mock-organizations', mockOrganizations);
    const index = organizations.findIndex(o => o.OrganizationID === id);
    if (index === -1) throw new Error('Organization not found');
    
    organizations[index] = {
      ...organizations[index],
      ...data,
      UpdatedAt: new Date().toISOString(),
    };
    saveStoredData('mock-organizations', organizations);
    return organizations[index];
  },

  async deleteOrganization(id: string): Promise<void> {
    await delay();
    let organizations = getStoredData<Organization>('mock-organizations', mockOrganizations);
    organizations = organizations.filter(o => o.OrganizationID !== id);
    saveStoredData('mock-organizations', organizations);
  },
};

// Employee Service
export const mockEmployeeService = {
  async getEmployees(params?: any): Promise<PaginatedResponse<Employee>> {
    await delay();
    const employees = getStoredData<Employee>('mock-employees', mockEmployees);
    
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const search = params?.search?.toLowerCase();
    
    let filtered = employees;
    if (search) {
      filtered = employees.filter(emp => 
        emp.EmployeeCode.toLowerCase().includes(search)
      );
    }
    
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize);
    
    return {
      data: paginatedData,
      total: filtered.length,
      page,
      pageSize,
      totalPages: Math.ceil(filtered.length / pageSize),
    };
  },

  async getEmployee(id: string): Promise<Employee> {
    await delay();
    const employees = getStoredData<Employee>('mock-employees', mockEmployees);
    const emp = employees.find(e => e.EmployeeID === id);
    if (!emp) throw new Error('Employee not found');
    return emp;
  },

  async createEmployee(data: Partial<Employee>): Promise<Employee> {
    await delay();
    const employees = getStoredData<Employee>('mock-employees', mockEmployees);
    const newEmp: Employee = {
      EmployeeID: generateId('emp'),
      OrganizationID: data.OrganizationID || 'org-001',
      BranchID: data.BranchID || 'branch-001',
      DepartmentID: data.DepartmentID || 'dept-001',
      EmployeeCode: data.EmployeeCode || `EMP${String(employees.length + 1).padStart(3, '0')}`,
      EmploymentType: data.EmploymentType || 'full-time',
      EmploymentStatus: data.EmploymentStatus || 'active',
      JoinDate: data.JoinDate || new Date().toISOString().split('T')[0],
      IsActive: true,
      IsDeleted: false,
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
      ...data,
    };
    employees.push(newEmp);
    saveStoredData('mock-employees', employees);
    return newEmp;
  },

  async updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
    await delay();
    const employees = getStoredData<Employee>('mock-employees', mockEmployees);
    const index = employees.findIndex(e => e.EmployeeID === id);
    if (index === -1) throw new Error('Employee not found');
    
    employees[index] = {
      ...employees[index],
      ...data,
      UpdatedAt: new Date().toISOString(),
    };
    saveStoredData('mock-employees', employees);
    return employees[index];
  },

  async deleteEmployee(id: string): Promise<void> {
    await delay();
    let employees = getStoredData<Employee>('mock-employees', mockEmployees);
    employees = employees.filter(e => e.EmployeeID !== id);
    saveStoredData('mock-employees', employees);
  },
};

// Agent Service
export const mockAgentService = {
  async getAgents(params?: any): Promise<PaginatedResponse<Agent>> {
    await delay();
    const agents = getStoredData<Agent>('mock-agents', mockAgents);
    
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const search = params?.search?.toLowerCase();
    
    let filtered = agents;
    if (search) {
      filtered = agents.filter(agent => 
        agent.AgentCode.toLowerCase().includes(search) ||
        agent.AgentType.toLowerCase().includes(search)
      );
    }
    
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize);
    
    return {
      data: paginatedData,
      total: filtered.length,
      page,
      pageSize,
      totalPages: Math.ceil(filtered.length / pageSize),
    };
  },

  async getAgent(id: string): Promise<Agent> {
    await delay();
    const agents = getStoredData<Agent>('mock-agents', mockAgents);
    const agent = agents.find(a => a.AgentID === id);
    if (!agent) throw new Error('Agent not found');
    return agent;
  },

  async createAgent(data: Partial<Agent>): Promise<Agent> {
    await delay();
    const agents = getStoredData<Agent>('mock-agents', mockAgents);
    const newAgent: Agent = {
      AgentID: generateId('agent'),
      OrganizationID: data.OrganizationID || 'org-001',
      BranchID: data.BranchID || 'branch-001',
      AgentCode: data.AgentCode || `AGT${String(agents.length + 1).padStart(3, '0')}`,
      AgentType: data.AgentType || 'sales',
      Status: data.Status || 'active',
      IsActive: true,
      IsDeleted: false,
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
      ...data,
    };
    agents.push(newAgent);
    saveStoredData('mock-agents', agents);
    return newAgent;
  },

  async updateAgent(id: string, data: Partial<Agent>): Promise<Agent> {
    await delay();
    const agents = getStoredData<Agent>('mock-agents', mockAgents);
    const index = agents.findIndex(a => a.AgentID === id);
    if (index === -1) throw new Error('Agent not found');
    
    agents[index] = {
      ...agents[index],
      ...data,
      UpdatedAt: new Date().toISOString(),
    };
    saveStoredData('mock-agents', agents);
    return agents[index];
  },

  async deleteAgent(id: string): Promise<void> {
    await delay();
    let agents = getStoredData<Agent>('mock-agents', mockAgents);
    agents = agents.filter(a => a.AgentID !== id);
    saveStoredData('mock-agents', agents);
  },
};

// Task Service
export const mockTaskService = {
  async getTasks(params?: any): Promise<PaginatedResponse<Task>> {
    await delay();
    const tasks = getStoredData<Task>('mock-tasks', mockTasks);
    
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const search = params?.search?.toLowerCase();
    
    let filtered = tasks;
    if (search) {
      filtered = tasks.filter(task => 
        task.Title.toLowerCase().includes(search) ||
        task.Tags?.toLowerCase().includes(search)
      );
    }
    
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize);
    
    return {
      data: paginatedData,
      total: filtered.length,
      page,
      pageSize,
      totalPages: Math.ceil(filtered.length / pageSize),
    };
  },

  async getTask(id: string): Promise<Task> {
    await delay();
    const tasks = getStoredData<Task>('mock-tasks', mockTasks);
    const task = tasks.find(t => t.TaskID === id);
    if (!task) throw new Error('Task not found');
    return task;
  },

  async createTask(data: Partial<Task>): Promise<Task> {
    await delay();
    const tasks = getStoredData<Task>('mock-tasks', mockTasks);
    const newTask: Task = {
      TaskID: generateId('task'),
      OrganizationID: data.OrganizationID || 'org-001',
      Title: data.Title || '',
      IsArchived: false,
      IsDeleted: false,
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
      ...data,
    };
    tasks.push(newTask);
    saveStoredData('mock-tasks', tasks);
    return newTask;
  },

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    await delay();
    const tasks = getStoredData<Task>('mock-tasks', mockTasks);
    const index = tasks.findIndex(t => t.TaskID === id);
    if (index === -1) throw new Error('Task not found');
    
    tasks[index] = {
      ...tasks[index],
      ...data,
      UpdatedAt: new Date().toISOString(),
    };
    saveStoredData('mock-tasks', tasks);
    return tasks[index];
  },

  async deleteTask(id: string): Promise<void> {
    await delay();
    let tasks = getStoredData<Task>('mock-tasks', mockTasks);
    tasks = tasks.filter(t => t.TaskID !== id);
    saveStoredData('mock-tasks', tasks);
  },
};

// Ticket Service
export const mockTicketService = {
  async getTickets(params?: any): Promise<PaginatedResponse<Ticket>> {
    await delay();
    const tickets = getStoredData<Ticket>('mock-tickets', mockTickets);
    
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const search = params?.search?.toLowerCase();
    
    let filtered = tickets;
    if (search) {
      filtered = tickets.filter(ticket => 
        ticket.Title.toLowerCase().includes(search) ||
        ticket.TicketNumber.toLowerCase().includes(search)
      );
    }
    
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize);
    
    return {
      data: paginatedData,
      total: filtered.length,
      page,
      pageSize,
      totalPages: Math.ceil(filtered.length / pageSize),
    };
  },

  async getTicket(id: string): Promise<Ticket> {
    await delay();
    const tickets = getStoredData<Ticket>('mock-tickets', mockTickets);
    const ticket = tickets.find(t => t.TicketID === id);
    if (!ticket) throw new Error('Ticket not found');
    return ticket;
  },

  async createTicket(data: Partial<Ticket>): Promise<Ticket> {
    await delay();
    const tickets = getStoredData<Ticket>('mock-tickets', mockTickets);
    const newTicket: Ticket = {
      TicketID: generateId('ticket'),
      OrganizationID: data.OrganizationID || 'org-001',
      TicketNumber: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      Title: data.Title || '',
      Priority: data.Priority || 'medium',
      RequesterID: data.RequesterID || 'user-001',
      SLABreached: false,
      IsDeleted: false,
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
      ...data,
    };
    tickets.push(newTicket);
    saveStoredData('mock-tickets', tickets);
    return newTicket;
  },

  async updateTicket(id: string, data: Partial<Ticket>): Promise<Ticket> {
    await delay();
    const tickets = getStoredData<Ticket>('mock-tickets', mockTickets);
    const index = tickets.findIndex(t => t.TicketID === id);
    if (index === -1) throw new Error('Ticket not found');
    
    tickets[index] = {
      ...tickets[index],
      ...data,
      UpdatedAt: new Date().toISOString(),
    };
    saveStoredData('mock-tickets', tickets);
    return tickets[index];
  },

  async deleteTicket(id: string): Promise<void> {
    await delay();
    let tickets = getStoredData<Ticket>('mock-tickets', mockTickets);
    tickets = tickets.filter(t => t.TicketID !== id);
    saveStoredData('mock-tickets', tickets);
  },
};

// Document Service
export const mockDocumentService = {
  async getDocuments(params?: any): Promise<PaginatedResponse<Document>> {
    await delay();
    const documents = getStoredData<Document>('mock-documents', mockDocuments);
    
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const search = params?.search?.toLowerCase();
    
    let filtered = documents;
    if (search) {
      filtered = documents.filter(doc => 
        doc.Title.toLowerCase().includes(search) ||
        doc.Tags?.toLowerCase().includes(search)
      );
    }
    
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize);
    
    return {
      data: paginatedData,
      total: filtered.length,
      page,
      pageSize,
      totalPages: Math.ceil(filtered.length / pageSize),
    };
  },

  async getDocument(id: string): Promise<Document> {
    await delay();
    const documents = getStoredData<Document>('mock-documents', mockDocuments);
    const doc = documents.find(d => d.DocumentID === id);
    if (!doc) throw new Error('Document not found');
    return doc;
  },

  async createDocument(data: Partial<Document>): Promise<Document> {
    await delay();
    const documents = getStoredData<Document>('mock-documents', mockDocuments);
    const newDoc: Document = {
      DocumentID: generateId('doc'),
      OrganizationID: data.OrganizationID || 'org-001',
      Title: data.Title || '',
      FileName: data.FileName || '',
      FileURL: data.FileURL || '',
      Version: 1,
      Status: data.Status || 'draft',
      IsPublic: data.IsPublic || false,
      IsDeleted: false,
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
      ...data,
    };
    documents.push(newDoc);
    saveStoredData('mock-documents', documents);
    return newDoc;
  },

  async updateDocument(id: string, data: Partial<Document>): Promise<Document> {
    await delay();
    const documents = getStoredData<Document>('mock-documents', mockDocuments);
    const index = documents.findIndex(d => d.DocumentID === id);
    if (index === -1) throw new Error('Document not found');
    
    documents[index] = {
      ...documents[index],
      ...data,
      Version: documents[index].Version + 1,
      UpdatedAt: new Date().toISOString(),
    };
    saveStoredData('mock-documents', documents);
    return documents[index];
  },

  async deleteDocument(id: string): Promise<void> {
    await delay();
    let documents = getStoredData<Document>('mock-documents', mockDocuments);
    documents = documents.filter(d => d.DocumentID !== id);
    saveStoredData('mock-documents', documents);
  },
};

// Workflow Service
export const mockWorkflowService = {
  async getWorkflows(params?: any): Promise<PaginatedResponse<Workflow>> {
    await delay();
    const workflows = getStoredData<Workflow>('mock-workflows', mockWorkflows);
    
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const search = params?.search?.toLowerCase();
    
    let filtered = workflows;
    if (search) {
      filtered = workflows.filter(wf => 
        wf.Name.toLowerCase().includes(search) ||
        wf.Code.toLowerCase().includes(search)
      );
    }
    
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize);
    
    return {
      data: paginatedData,
      total: filtered.length,
      page,
      pageSize,
      totalPages: Math.ceil(filtered.length / pageSize),
    };
  },

  async getWorkflow(id: string): Promise<Workflow> {
    await delay();
    const workflows = getStoredData<Workflow>('mock-workflows', mockWorkflows);
    const workflow = workflows.find(w => w.WorkflowID === id);
    if (!workflow) throw new Error('Workflow not found');
    return workflow;
  },

  async createWorkflow(data: Partial<Workflow>): Promise<Workflow> {
    await delay();
    const workflows = getStoredData<Workflow>('mock-workflows', mockWorkflows);
    const newWorkflow: Workflow = {
      WorkflowID: generateId('workflow'),
      OrganizationID: data.OrganizationID || 'org-001',
      Name: data.Name || '',
      Code: data.Code || '',
      EntityType: data.EntityType || 'general',
      TriggerType: data.TriggerType || 'manual',
      IsActive: true,
      IsDeleted: false,
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
      ...data,
    };
    workflows.push(newWorkflow);
    saveStoredData('mock-workflows', workflows);
    return newWorkflow;
  },

  async updateWorkflow(id: string, data: Partial<Workflow>): Promise<Workflow> {
    await delay();
    const workflows = getStoredData<Workflow>('mock-workflows', mockWorkflows);
    const index = workflows.findIndex(w => w.WorkflowID === id);
    if (index === -1) throw new Error('Workflow not found');
    
    workflows[index] = {
      ...workflows[index],
      ...data,
      UpdatedAt: new Date().toISOString(),
    };
    saveStoredData('mock-workflows', workflows);
    return workflows[index];
  },

  async deleteWorkflow(id: string): Promise<void> {
    await delay();
    let workflows = getStoredData<Workflow>('mock-workflows', mockWorkflows);
    workflows = workflows.filter(w => w.WorkflowID !== id);
    saveStoredData('mock-workflows', workflows);
  },
};

// Report Service (mock)
export const mockReportService = {
  async getReports(params?: any): Promise<any> {
    await delay();
    return {
      data: [
        { id: 'report-1', name: 'Employee Performance Report', type: 'performance', createdAt: '2024-01-01' },
        { id: 'report-2', name: 'Sales Report Q1', type: 'sales', createdAt: '2024-01-15' },
        { id: 'report-3', name: 'Task Completion Report', type: 'tasks', createdAt: '2024-01-20' },
      ],
      total: 3,
      page: 1,
      pageSize: 10,
      totalPages: 1,
    };
  },

  async getReport(id: string): Promise<any> {
    await delay();
    return {
      id,
      name: 'Sample Report',
      data: {
        summary: 'Report summary data',
        details: 'Detailed report data',
      },
    };
  },
};

// Settings Service (mock)
export const mockSettingsService = {
  async getSettings(): Promise<any> {
    await delay();
    return {
      organization: {
        name: 'TechCorp Inc.',
        email: 'info@techcorp.com',
        phone: '+1234567890',
      },
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
      security: {
        mfaEnabled: false,
        passwordPolicy: 'strong',
      },
    };
  },

  async updateSettings(data: any): Promise<any> {
    await delay();
    return data;
  },
};
