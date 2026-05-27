import { supabase } from "../lib/supabaseClient";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5003";

// Helper to get active session bearer token
const getAuthHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Property REST API Operations
 */
export const propertyService = {
  async fetchProperties() {
    const resp = await fetch(`${API_URL}/api/properties`);
    if (!resp.ok) throw new Error("Failed to retrieve property listings from server.");
    return await resp.json();
  },

  async fetchPropertyById(id) {
    const resp = await fetch(`${API_URL}/api/properties/${id}`);
    if (!resp.ok) throw new Error("Failed to retrieve listing details from server.");
    return await resp.json();
  },

  async createProperty(propertyData) {
    const headers = await getAuthHeaders();
    const resp = await fetch(`${API_URL}/api/properties`, {
      method: "POST",
      headers,
      body: JSON.stringify(propertyData),
    });
    if (!resp.ok) {
      const data = await resp.json();
      throw new Error(data.error || "Failed to create new real estate listing.");
    }
    return await resp.json();
  },

  async updateProperty(id, propertyData) {
    const headers = await getAuthHeaders();
    const resp = await fetch(`${API_URL}/api/properties/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(propertyData),
    });
    if (!resp.ok) {
      const data = await resp.json();
      throw new Error(data.error || "Failed to update project records.");
    }
    return await resp.json();
  },

  async deleteProperty(id) {
    const headers = await getAuthHeaders();
    const resp = await fetch(`${API_URL}/api/properties/${id}`, {
      method: "DELETE",
      headers,
    });
    if (!resp.ok) {
      const data = await resp.json();
      throw new Error(data.error || "Failed to delete project records.");
    }
    return true;
  },

  // Stream upload showcase photos as multipart/form-data to Express server
  async uploadPropertyPhoto(file) {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const formData = new FormData();
    formData.append("photo", file);

    const resp = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!resp.ok) {
      const data = await resp.json();
      throw new Error(data.error || "Failed to upload photo to server storage.");
    }

    const result = await resp.json();
    return result.imgUrl;
  },
};

/**
 * Lead REST API Operations
 */
export const leadService = {
  async fetchLeads() {
    const headers = await getAuthHeaders();
    const resp = await fetch(`${API_URL}/api/leads`, { headers });
    if (!resp.ok) throw new Error("Failed to load customer inbox leads.");
    return await resp.json();
  },

  async createLead(leadData) {
    const resp = await fetch(`${API_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    });
    if (!resp.ok) {
      const data = await resp.json();
      throw new Error(data.error || "Failed to submit customer lead inquiry.");
    }
    return await resp.json();
  },

  async updateLeadStatus(id, status) {
    const headers = await getAuthHeaders();
    const resp = await fetch(`${API_URL}/api/leads/${id}/status`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });
    if (!resp.ok) {
      const data = await resp.json();
      throw new Error(data.error || "Failed to update lead read-state.");
    }
    return await resp.json();
  },
};
