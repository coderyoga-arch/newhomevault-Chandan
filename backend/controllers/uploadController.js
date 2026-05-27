const { propertyService } = require("../services/supabaseService");

const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided for upload." });
    }

    // Call service layer to stream file buffer to Supabase bucket
    const publicUrl = await propertyService.uploadPhoto(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype,
      req.headers.authorization
    );

    res.status(200).json({
      success: true,
      message: "Showcase image uploaded successfully.",
      imgUrl: publicUrl,
    });
  } catch (err) {
    console.error("Upload controller error:", err);
    res.status(500).json({ 
      error: "Failed to upload photo to storage server.",
      details: err.message || err.toString()
    });
  }
};

module.exports = {
  uploadPhoto,
};
