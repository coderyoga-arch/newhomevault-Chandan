import { useState, useEffect } from "react";
import { leadService } from "../services/supabaseService";
import { Mail, Search, Check, Eye, Archive } from "lucide-react";
import "./LeadManagement.css";

export default function LeadManagement() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeLead, setActiveLead] = useState(null); // Selected lead for details modal

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const data = await leadService.fetchLeads();
      setLeads(data);
    } catch (err) {
      console.error("Error loading leads:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await leadService.updateLeadStatus(id, status);
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
      );
      
      // If modal is active, update the active lead state
      if (activeLead && activeLead.id === id) {
        setActiveLead((prev) => ({ ...prev, status }));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Filter leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      (l.phone && l.phone.includes(search)) ||
      (l.interest && l.interest.toLowerCase().includes(search.toLowerCase())) ||
      l.message.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || l.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="lead-mgmt-page">
      {/* Description Header */}
      <div className="mgmt-header">
        <p className="mgmt-description">
          Review buyer inquiries, pre-construction newsletter subscribers, and customer contact requests submitted from the public site.
        </p>
      </div>

      {/* Toolbar */}
      <div className="mgmt-toolbar">
        <div className="search-box-wrap">
          <Search size={18} className="search-icon-svg" />
          <input
            type="text"
            placeholder="Search leads by name, email, interest or message details..."
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
            <option value="all">All Inquiries</option>
            <option value="new">New / Unread</option>
            <option value="contacted">Contacted</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Inbox table */}
      <div className="mgmt-table-container">
        {loading ? (
          <div className="table-loader-wrap">
            <div className="spinner-dots">
              <div></div><div></div><div></div>
            </div>
            <p>Loading Leads Inbox...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="table-empty-wrap">
            <Mail size={40} style={{ color: "var(--gold)", marginBottom: 16 }} />
            <p>No customer inquiries found matching your filters.</p>
          </div>
        ) : (
          <table className="mgmt-spreadsheet">
            <thead>
              <tr>
                <th>Date Received</th>
                <th>Client Credentials</th>
                <th>Interest Category</th>
                <th>Status</th>
                <th>Message Snippet</th>
                <th width="160px" style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((l) => {
                const date = new Date(l.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <tr key={l.id} className={`mgmt-tr lead-row-${l.status}`}>
                    <td style={{ fontSize: 13, color: "var(--slate)" }}>{date}</td>
                    <td className="td-details-cell">
                      <h4 className="mgmt-prop-name">{l.name}</h4>
                      <p className="mgmt-prop-loc">{l.email}</p>
                      {l.phone && <p className="lead-phone-sub">📞 {l.phone}</p>}
                    </td>
                    <td>
                      <span className="lead-interest-badge">{l.interest || "General Inquiry"}</span>
                    </td>
                    <td>
                      <span className={`status-pill pill-${l.status}`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="td-msg-cell">
                      <p className="lead-msg-snippet">{l.message}</p>
                    </td>
                    <td className="td-actions-cell">
                      <div className="actions-button-group">
                        <button
                          onClick={() => setActiveLead(l)}
                          className="mgmt-action-btn btn-edit"
                          title="Open Message Details"
                        >
                          <Eye size={14} />
                        </button>
                        
                        {l.status === "new" && (
                          <button
                            onClick={() => handleUpdateStatus(l.id, "contacted")}
                            className="mgmt-action-btn btn-check"
                            title="Mark as Contacted"
                          >
                            <Check size={14} />
                          </button>
                        )}

                        {l.status !== "archived" && (
                          <button
                            onClick={() => handleUpdateStatus(l.id, "archived")}
                            className="mgmt-action-btn btn-delete"
                            title="Archive Lead"
                          >
                            <Archive size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Details View Modal popup */}
      {activeLead && (
        <div className="modal-overlay" onClick={() => setActiveLead(null)}>
          <div className="modal-card lead-details-card" onClick={(e) => e.stopPropagation()}>
            <div className="lead-details-header">
              <div>
                <span className={`status-pill pill-${activeLead.status}`} style={{ marginBottom: 8 }}>
                  {activeLead.status}
                </span>
                <h3>Inquiry from {activeLead.name}</h3>
                <p className="modal-time-stamp">
                  Received on {new Date(activeLead.created_at).toLocaleString()}
                </p>
              </div>
              <button onClick={() => setActiveLead(null)} className="close-modal-x">×</button>
            </div>

            <div className="lead-details-body">
              <div className="lead-contact-grid">
                <div className="contact-box">
                  <h5>Email Address</h5>
                  <p><a href={`mailto:${activeLead.email}`}>{activeLead.email}</a></p>
                </div>
                {activeLead.phone && (
                  <div className="contact-box">
                    <h5>Phone Number</h5>
                    <p><a href={`tel:${activeLead.phone}`}>{activeLead.phone}</a></p>
                  </div>
                )}
                <div className="contact-box" style={{ gridColumn: "span 2" }}>
                  <h5>Interested In</h5>
                  <p className="interest-text-pill">{activeLead.interest || "General Inquiry"}</p>
                </div>
              </div>

              <div className="lead-message-section">
                <h5>Detailed Message</h5>
                <div className="message-content-box">
                  {activeLead.message}
                </div>
              </div>
            </div>

            <div className="lead-details-footer">
              <div className="footer-status-actions">
                <span>Update Status:</span>
                <div className="actions-pill-group">
                  <button
                    disabled={activeLead.status === "new"}
                    onClick={() => handleUpdateStatus(activeLead.id, "new")}
                    className="status-toggle-btn new-status"
                  >
                    Mark New
                  </button>
                  <button
                    disabled={activeLead.status === "contacted"}
                    onClick={() => handleUpdateStatus(activeLead.id, "contacted")}
                    className="status-toggle-btn contacted-status"
                  >
                    Mark Contacted
                  </button>
                  <button
                    disabled={activeLead.status === "archived"}
                    onClick={() => handleUpdateStatus(activeLead.id, "archived")}
                    className="status-toggle-btn archived-status"
                  >
                    Archive
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
