import { apiUtils } from "@/Services/Common/Base";

const SETTINGS_ENDPOINT = "/dashboard/settings";

const SettingsService = {
  get: async () => {
    const response = await apiUtils.get(SETTINGS_ENDPOINT);
    return response.data;
  },

  create: async (payload) => {
    const response = await apiUtils.post(SETTINGS_ENDPOINT, payload);
    return response.data;
  },

  update: async (settingId, payload) => {
    const response = await apiUtils.put(`${SETTINGS_ENDPOINT}/${settingId}`, payload);
    return response.data;
  },

  delete: async (settingId) => {
    const response = await apiUtils.delete(`${SETTINGS_ENDPOINT}/${settingId}`);
    return response.data;
  },

  uploadLogo: async (settingId, logoFiles) => {
    const formData = new FormData();
    formData.append("logo", logoFiles[0]);

    const response = await apiUtils.post(`${SETTINGS_ENDPOINT}/${settingId}/logo`, formData, {
      headers: { "Content-Type": undefined },
    });

    return response.data;
  },

  deleteLogo: async (settingId) => {
    const response = await apiUtils.delete(`${SETTINGS_ENDPOINT}/${settingId}/logo`);
    return response.data;
  },
};

export default SettingsService;
