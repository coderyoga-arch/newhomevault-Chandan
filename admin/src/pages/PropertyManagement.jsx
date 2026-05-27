import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { propertyService } from "../services/supabaseService";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import "./PropertyManagement.css";

export default function PropertyManagement() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const data = await propertyService.fetchProperties();
      setProperties(data);
    } catch (err) {
      console.error("Error loading properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await propertyService.deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirmId(null);
    } catch (err) {
      alert("Failed to delete property. Check your permissions.");
      console.error("Delete property error:", err);
    } finally {
      setDeleting(false);
    }
  };

  // Filter logic
  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      (p.builder && p.builder.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" || p.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="property-mgmt-page">
      {/* Top Banner Actions */}
      <div className="mgmt-header">
        <p className="mgmt-description">
          Create, edit, and organize residential real estate project details visible to consumers.
        </p>
        <Link to="/properties/new" className="add-prop-btn">
          <Plus size={16} />
          <span>Add New Property</span>
        </Link>
      </div>

      {/* Filter and search toolbar */}
      <div className="mgmt-toolbar">
        <div className="search-box-wrap">
          <Search size={18} className="search-icon-svg" />
          <input
            type="text"
            placeholder="Search by property, builder, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input-field"
          />
        </div>

        <div className="filter-select-wrap">
          <label>Filter Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select-field"
          >
            <option value="all">All Listings</option>
            <option value="for sale">For Sale</option>
            <option value="sold">Sold</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Main Grid Spreadsheet */}
      <div className="mgmt-table-container">
        {loading ? (
          <div className="table-loader-wrap">
            <div className="spinner-dots">
              <div></div><div></div><div></div>
            </div>
            <p>Retrieving Real Estate Listings...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="table-empty-wrap">
            <p>No listings match your search keywords or status filter.</p>
            <Link to="/properties/new" className="btn-outline" style={{ marginTop: 16 }}>
              Add a Property
            </Link>
          </div>
        ) : (
          <table className="mgmt-spreadsheet">
            <thead>
              <tr>
                <th width="80px">Photo</th>
                <th>Project Details</th>
                <th>Builder</th>
                <th>Status</th>
                <th>Price Range</th>
                <th>Layout</th>
                <th width="120px" style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((p) => (
                <tr key={p.id} className="mgmt-tr">
                  <td className="td-img-cell">
                    <img
                      src={p.img || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&q=80"}
                      alt={p.name}
                      className="mgmt-thumb"
                    />
                  </td>
                  <td className="td-details-cell">
                    <h4 className="mgmt-prop-name">{p.name}</h4>
                    <p className="mgmt-prop-loc">📍 {p.location}</p>
                  </td>
                  <td>
                    <span className="mgmt-builder-tag">{p.builder || "Not specified"}</span>
                  </td>
                  <td>
                    <span className={`status-pill pill-${p.status.toLowerCase().replace(" ", "-")}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="td-price-cell">
                    <strong>From ${p.priceFrom.toLocaleString()}</strong>
                    {p.priceTo && <p className="price-to-text">Up to ${p.priceTo.toLocaleString()}</p>}
                  </td>
                  <td className="td-layout-cell">
                    <span>🛌 {p.beds} Beds</span>
                    <span>🛁 {p.baths} Baths</span>
                  </td>
                  <td className="td-actions-cell">
                    <div className="actions-button-group">
                      <button
                        onClick={() => navigate(`/properties/edit/${p.id}`)}
                        className="mgmt-action-btn btn-edit"
                        title="Edit Project"
                      >
                        <Edit2 size={14} />
                      </button>
                      
                      <button
                        onClick={() => setDeleteConfirmId(p.id)}
                        className="mgmt-action-btn btn-delete"
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete Confirmation Overlay Modal */}
      {deleteConfirmId && (
        <div className="modal-overlay">
          <div className="modal-card modal-delete">
            <h3>Delete Property Listing?</h3>
            <p>
              Are you sure you want to permanently remove <strong>{properties.find((p) => p.id === deleteConfirmId)?.name}</strong>? 
              This action will destroy all records of this listing and cannot be undone.
            </p>
            <div className="modal-action-row">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="btn-cancel-modal"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="btn-confirm-delete-modal"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
