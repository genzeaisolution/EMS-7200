import { apiClient } from './api';
import { Document, PaginatedResponse } from '../types';

export const documentService = {
  async getAll(params?: any): Promise<Document[]> {
    const response = await apiClient.get<Document[]>('/documents', params);
    return response.data;
  },

  async getById(id: string): Promise<Document> {
    const response = await apiClient.get<Document>(`/documents/${id}`);
    return response.data;
  },

  async upload(file: File, metadata: any, onProgress?: (progress: number) => void): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);
    Object.keys(metadata).forEach(key => {
      formData.append(key, metadata[key]);
    });
    
    const response = await apiClient.upload<Document>('/documents', file, onProgress);
    return response.data;
  },

  async update(id: string, data: Partial<Document>): Promise<Document> {
    const response = await apiClient.put<Document>(`/documents/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/documents/${id}`);
  },
};
