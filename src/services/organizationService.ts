import { apiClient } from './api';
import { Organization, PaginatedResponse } from '../types';

export const organizationService = {
  async getAll(params?: any): Promise<Organization[]> {
    const response = await apiClient.get<Organization[]>('/organizations', params);
    return response.data;
  },

  async getById(id: string): Promise<Organization> {
    const response = await apiClient.get<Organization>(`/organizations/${id}`);
    return response.data;
  },

  async create(data: Partial<Organization>): Promise<Organization> {
    const response = await apiClient.post<Organization>('/organizations', data);
    return response.data;
  },

  async update(id: string, data: Partial<Organization>): Promise<Organization> {
    const response = await apiClient.put<Organization>(`/organizations/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/organizations/${id}`);
  },
};
