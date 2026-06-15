import { apiClient } from './api';
import { Task, PaginatedResponse } from '../types';

export const taskService = {
  async getAll(params?: any): Promise<Task[]> {
    const response = await apiClient.get<Task[]>('/tasks', params);
    return response.data;
  },

  async getById(id: string): Promise<Task> {
    const response = await apiClient.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  async create(data: Partial<Task>): Promise<Task> {
    const response = await apiClient.post<Task>('/tasks', data);
    return response.data;
  },

  async update(id: string, data: Partial<Task>): Promise<Task> {
    const response = await apiClient.put<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/tasks/${id}`);
  },
};
