// Service exports - GitHub/demo deployment using mock services
// This version uses mock services with localStorage for demo purposes

export { mockAuthService as authService } from './mockAuthService';

export {
  mockOrganizationService as organizationService,
  mockEmployeeService as employeeService,
  mockAgentService as agentService,
  mockTaskService as taskService,
  mockTicketService as ticketService,
  mockDocumentService as documentService,
  mockWorkflowService as workflowService,
  mockReportService as reportService,
  mockSettingsService as settingsService
} from './mockDataService';