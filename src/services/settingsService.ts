import { apiClient } from './api';

export const settingsService = {
  async getUserSettings(userId: string): Promise<Record<string, string>> {
    const response = await apiClient.get<Record<string, string>>(`/settings/user/${userId}`);
    return response.data;
  },

  async updateUserSetting(userId: string, key: string, value: string): Promise<void> {
    await apiClient.put(`/settings/user/${userId}`, { key, value });
  },

  async getOrganizationSettings(orgId: string): Promise<Record<string, string>> {
    const response = await apiClient.get<Record<string, string>>(`/settings/organization/${orgId}`);
    return response.data;
  },

  async updateOrganizationSetting(orgId: string, key: string, value: string): Promise<void> {
    await apiClient.put(`/settings/organization/${orgId}`, { key, value });
  },
};
