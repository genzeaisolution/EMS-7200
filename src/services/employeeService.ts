import { apiClient } from './api';
import { Employee, PaginatedResponse } from '../types';

export const employeeService = {
  async getAll(params?: any): Promise<Employee[]> {
    const response = await apiClient.get<Employee[]>('/employees', params);
    return response.data;
  },

  async getById(id: string): Promise<Employee> {
    const response = await apiClient.get<Employee>(`/employees/${id}`);
    return response.data;
  },

  async create(data: Partial<Employee>): Promise<Employee> {
    const response = await apiClient.post<Employee>('/employees', data);
    return response.data;
  },

  async update(id: string, data: Partial<Employee>): Promise<Employee> {
    const response = await apiClient.put<Employee>(`/employees/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/employees/${id}`);
  },
};
