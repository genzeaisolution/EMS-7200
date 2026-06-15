// Service exports - use mock services for GitHub/demo deployment
// Set USE_MOCK_SERVICES to true for demo/GitHub Pages deployment
const USE_MOCK_SERVICES = true;

if (USE_MOCK_SERVICES) {
  // Export mock services
  export { mockAuthService as authService } from './mockAuthService';
  export { mockOrganizationService as organizationService } from './mockDataService';
  export { mockEmployeeService as employeeService } from './mockDataService';
  export { mockAgentService as agentService } from './mockDataService';
  export { mockTaskService as taskService } from './mockDataService';
  export { mockTicketService as ticketService } from './mockDataService';
  export { mockDocumentService as documentService } from './mockDataService';
  export { mockWorkflowService as workflowService } from './mockDataService';
  export { mockReportService as reportService } from './mockDataService';
  export { mockSettingsService as settingsService } from './mockDataService';
} else {
  // Export real API services (backend required)
  export { authService } from './authService';
  export { organizationService } from './organizationService';
  export { employeeService } from './employeeService';
  export { agentService } from './agentService';
  export { taskService } from './taskService';
  export { ticketService } from './ticketService';
  export { documentService } from './documentService';
  export { workflowService } from './workflowService';
  export { reportService } from './reportService';
  export { settingsService } from './settingsService';
}
