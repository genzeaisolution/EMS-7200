import { apiClient } from './api';

export const reportService = {
  async getDashboardStats(): Promise<any> {
    const response = await apiClient.get<any>('/reports/dashboard');
    return response.data;
  },

  async getTaskReport(): Promise<any> {
    const response = await apiClient.get<any>('/reports/tasks');
    return response.data;
  },

  async getTicketReport(): Promise<any> {
    const response = await apiClient.get<any>('/reports/tickets');
    return response.data;
  },

  async getEmployeeReport(): Promise<any> {
    const response = await apiClient.get<any>('/reports/employees');
    return response.data;
  },
};
