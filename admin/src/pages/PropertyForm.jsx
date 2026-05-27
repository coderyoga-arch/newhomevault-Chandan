import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { propertyService } from "../services/supabaseService";
import { Upload, X, ArrowLeft, Image as ImageIcon } from "lucide-react";
import "./PropertyForm.css";

export default function PropertyForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // populated in edit mode
  const isEditMode = !!id;

  const [form, setForm] = useState({
    name: "",
    location: "",
    builder: "",
    status: "For Sale",
    priceFrom: "",
    priceTo: "",
    beds: "",
    baths: "",
    img: "",
    desc: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(isEditMode);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load existing property details if in Edit Mode
  useEffect(() => {
    if (isEditMode) {
      async function loadProperty() {
        try {
          const p = await propertyService.fetchPropertyById(id);
          setForm({
            name: p.name,
            location: p.location,
            builder: p.builder || "",
            status: p.status,
            priceFrom: p.priceFrom.toString(),
            priceTo: p.priceTo ? p.priceTo.toString() : "",
            beds: p.beds.toString(),
            baths: p.baths.toString(),
            img: p.img || "",
            desc: p.desc || "",
          });
        } catch (err) {
          setError("Failed to load property details. Verify if this listing exists.");
          console.error("Load property by ID error:", err);
        } finally {
          setFetchingData(false);
        }
      }
      loadProperty();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Image Upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic file validation
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (.jpg, .png, .webp).");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const publicUrl = await propertyService.uploadPropertyPhoto(file);
      setForm((prev) => ({ ...prev, img: publicUrl }));
      setSuccess("Image uploaded successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to upload photo. Ensure your Supabase Storage permissions are active.");
      console.error("Upload image error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, img: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate prices
    const priceFromNum = parseFloat(form.priceFrom);
    if (isNaN(priceFromNum) || priceFromNum <= 0) {
      setError("Minimum price must be a valid positive number.");
      setLoading(false);
      return;
    }

    try {
      if (isEditMode) {
        await propertyService.updateProperty(id, form);
      } else {
        await propertyService.createProperty(form);
      }

      navigate("/properties");
    } catch (err) {
      setError(err.message || "Failed to save property. Verify your form fields.");
      console.error("Save property error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="form-loading-wrap">
        <div className="form-spinner"></div>
        <p>Loading Listing Data...</p>
      </div>
    );
  }

  return (
    <div className="property-form-page">
      {/* Header breadcrumb */}
      <div className="form-nav-bar">
        <Link to="/properties" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to List</span>
        </Link>
      </div>

      <div className="form-card">
        <div className="form-card-header">
          <h2>{isEditMode ? `Edit: ${form.name}` : "Create New Property Listing"}</h2>
          <p>Provide comprehensive project details, prices, and high-resolution layout images.</p>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          {error && <div className="form-alert alert-error">{error}</div>}
          {success && <div className="form-alert alert-success">{success}</div>}

          {/* Column Left: Information Inputs */}
          <div className="form-column-inputs">
            <div className="input-group">
              <label>Project Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Trailside Towns"
                required
              />
            </div>

            <div className="input-group">
              <label>Location (City, Province) *</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Mount Forest, ON"
                required
              />
            </div>

            <div className="form-row-2">
              <div className="input-group">
                <label>Builder Developer</label>
                <input
                  type="text"
                  name="builder"
                  value={form.builder}
                  onChange={handleChange}
                  placeholder="e.g. Wilson Developments"
                />
              </div>

              <div className="input-group">
                <label>Listing Status *</label>
                <select name="status" value={form.status} onChange={handleChange} required>
                  <option value="For Sale">For Sale</option>
                  <option value="Sold">Sold</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="form-row-2">
              <div className="input-group">
                <label>Price Starting From ($) *</label>
                <input
                  type="number"
                  name="priceFrom"
                  value={form.priceFrom}
                  onChange={handleChange}
                  placeholder="379900"
                  required
                />
              </div>

              <div className="input-group">
                <label>Price Up To ($)</label>
                <input
                  type="number"
                  name="priceTo"
                  value={form.priceTo}
                  onChange={handleChange}
                  placeholder="390900 (Optional)"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="input-group">
                <label>Bedrooms *</label>
                <input
                  type="number"
                  name="beds"
                  value={form.beds}
                  onChange={handleChange}
                  placeholder="3"
                  required
                  min="0"
                />
              </div>

              <div className="input-group">
                <label>Bathrooms *</label>
                <input
                  type="number"
                  name="baths"
                  value={form.baths}
                  onChange={handleChange}
                  placeholder="2"
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="input-group">
              <label>Detailed Project Description</label>
              <textarea
                name="desc"
                value={form.desc}
                onChange={handleChange}
                rows={5}
                placeholder="Describe layout plans, neighborhood amenities, finishes, transport access..."
              />
            </div>
          </div>

          {/* Column Right: Interactive Image Uploader */}
          <div className="form-column-photo">
            <label className="photo-label">Property Showcase Photo</label>
            
            {form.img ? (
              <div className="uploaded-photo-preview">
                <img src={form.img} alt="Showcase Preview" />
                <button type="button" onClick={handleRemoveImage} className="remove-photo-btn">
                  <X size={16} />
                  <span>Remove Image</span>
                </button>
              </div>
            ) : (
              <div className={`dropzone-area ${uploading ? "is-uploading" : ""}`}>
                <input
                  type="file"
                  id="photo-file-picker"
                  onChange={handleImageUpload}
                  accept="image/*"
                  disabled={uploading}
                />
                
                {uploading ? (
                  <div className="upload-spinner-wrap">
                    <div className="upload-spinner"></div>
                    <p>Uploading to Supabase Storage...</p>
                  </div>
                ) : (
                  <label htmlFor="photo-file-picker" className="dropzone-label">
                    <Upload size={32} className="upload-icon-svg" />
                    <h4>Select Property Photo</h4>
                    <p>PNG, JPG, or WEBP. Uploads directly to bucket.</p>
                    <span className="browse-btn">Browse File</span>
                  </label>
                )}
              </div>
            )}

            {/* Manual Text Image URL input */}
            <div className="input-group manual-url-input" style={{ marginTop: 24 }}>
              <label>Or Paste Public Image URL</label>
              <div className="url-input-wrap">
                <ImageIcon size={18} className="url-icon-svg" />
                <input
                  type="url"
                  name="img"
                  value={form.img}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/photo..."
                />
              </div>
            </div>
          </div>

          {/* Form Actions footer row */}
          <div className="form-actions-row">
            <button
              type="button"
              onClick={() => navigate("/properties")}
              className="btn-cancel"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading || uploading}>
              {loading ? "Saving Records..." : isEditMode ? "Save Changes" : "Create Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
