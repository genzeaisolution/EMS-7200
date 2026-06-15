import { apiClient } from './api';
import { Workflow, PaginatedResponse } from '../types';

export const workflowService = {
  async getAll(params?: any): Promise<Workflow[]> {
    const response = await apiClient.get<Workflow[]>('/workflows', params);
    return response.data;
  },

  async getById(id: string): Promise<Workflow> {
    const response = await apiClient.get<Workflow>(`/workflows/${id}`);
    return response.data;
  },

  async create(data: Partial<Workflow>): Promise<Workflow> {
    const response = await apiClient.post<Workflow>('/workflows', data);
    return response.data;
  },

  async update(id: string, data: Partial<Workflow>): Promise<Workflow> {
    const response = await apiClient.put<Workflow>(`/workflows/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/workflows/${id}`);
  },
};
