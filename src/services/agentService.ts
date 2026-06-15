import { apiClient } from './api';
import { Agent, PaginatedResponse } from '../types';

export const agentService = {
  async getAll(params?: any): Promise<Agent[]> {
    const response = await apiClient.get<Agent[]>('/agents', params);
    return response.data;
  },

  async getById(id: string): Promise<Agent> {
    const response = await apiClient.get<Agent>(`/agents/${id}`);
    return response.data;
  },

  async create(data: Partial<Agent>): Promise<Agent> {
    const response = await apiClient.post<Agent>('/agents', data);
    return response.data;
  },

  async update(id: string, data: Partial<Agent>): Promise<Agent> {
    const response = await apiClient.put<Agent>(`/agents/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/agents/${id}`);
  },
};
