const { propertyService } = require("../services/supabaseService");

const getProperties = async (req, res) => {
  try {
    const data = await propertyService.fetchAll();
    res.status(200).json(data);
  } catch (err) {
    console.error("Get Properties Error:", err);
    res.status(500).json({ error: "Failed to fetch property listings." });
  }
};

const getPropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await propertyService.fetchById(id);
    res.status(200).json(data);
  } catch (err) {
    console.error(`Get Property By ID (${id}) Error:`, err);
    res.status(404).json({ error: "Property listing not found." });
  }
};

const createProperty = async (req, res) => {
  try {
    const data = await propertyService.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    console.error("Create Property Error:", err);
    res.status(500).json({ error: "Failed to create property listing. Check your parameters." });
  }
};

const updateProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await propertyService.update(id, req.body);
    res.status(200).json(data);
  } catch (err) {
    console.error(`Update Property (${id}) Error:`, err);
    res.status(500).json({ error: "Failed to update property listing." });
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    await propertyService.delete(id);
    res.status(200).json({ success: true, message: "Property listing deleted successfully." });
  } catch (err) {
    console.error(`Delete Property (${id}) Error:`, err);
    res.status(500).json({ error: "Failed to delete property listing." });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
