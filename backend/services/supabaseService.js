const { supabase } = require("../config/supabase");

/**
 * Property Database Queries
 */
const propertyService = {
  async fetchAll() {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    
    return data.map((p) => ({
      id: p.id,
      name: p.name,
      location: p.location,
      builder: p.builder,
      status: p.status,
      priceFrom: parseFloat(p.price_from),
      priceTo: p.price_to ? parseFloat(p.price_to) : null,
      beds: p.beds,
      baths: p.baths,
      img: p.img,
      desc: p.description,
      createdAt: p.created_at,
    }));
  },

  async fetchById(id) {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      location: data.location,
      builder: data.builder,
      status: data.status,
      priceFrom: parseFloat(data.price_from),
      priceTo: data.price_to ? parseFloat(data.price_to) : null,
      beds: data.beds,
      baths: data.baths,
      img: data.img,
      desc: data.description,
      createdAt: data.created_at,
    };
  },

  async create(propertyData) {
    const payload = {
      name: propertyData.name,
      location: propertyData.location,
      builder: propertyData.builder,
      status: propertyData.status || "For Sale",
      price_from: parseFloat(propertyData.priceFrom),
      price_to: propertyData.priceTo ? parseFloat(propertyData.priceTo) : null,
      beds: parseInt(propertyData.beds, 10),
      baths: parseInt(propertyData.baths, 10),
      img: propertyData.img,
      description: propertyData.desc,
    };

    const { data, error } = await supabase
      .from("properties")
      .insert([payload])
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      throw new Error("Failed to insert property listing.");
    }
    return data[0];
  },

  async update(id, propertyData) {
    const payload = {
      name: propertyData.name,
      location: propertyData.location,
      builder: propertyData.builder,
      status: propertyData.status,
      price_from: parseFloat(propertyData.priceFrom),
      price_to: propertyData.priceTo ? parseFloat(propertyData.priceTo) : null,
      beds: parseInt(propertyData.beds, 10),
      baths: parseInt(propertyData.baths, 10),
      img: propertyData.img,
      description: propertyData.desc,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("properties")
      .update(payload)
      .eq("id", id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      throw new Error("Property listing not found or no changes made.");
    }
    return data[0];
  },

  async delete(id) {
    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  },

  // Upload Photo File Stream to Supabase Public Bucket
  async uploadPhoto(fileBuffer, fileName, mimeType, authHeader = null) {
    const fileExt = fileName.split(".").pop();
    const uniqueName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `properties/${uniqueName}`;

    // If an authHeader is provided, instantiate a custom client for this request to inherit admin permissions
    let client = supabase;
    if (authHeader) {
      const { createClient } = require("@supabase/supabase-js");
      client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      });
    }

    // Upload direct binary buffer on the backend using authorized client
    const { error: uploadError } = await client.storage
      .from("property-photos")
      .upload(filePath, fileBuffer, {
        contentType: mimeType,
      });

    if (uploadError) throw uploadError;

    // Retrieve public URL
    const { data } = client.storage
      .from("property-photos")
      .getPublicUrl(filePath);

    return data.publicUrl;
  },
};

/**
 * Lead / Inquiry Database Queries
 */
const leadService = {
  async fetchAll() {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async create(leadData) {
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone || null,
          interest: leadData.interest || null,
          message: leadData.message,
          status: "new",
        },
      ])
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      throw new Error("Failed to register customer lead.");
    }
    return data[0];
  },

  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      throw new Error("Lead record not found or no changes made.");
    }
    return data[0];
  },
};

module.exports = { propertyService, leadService };
