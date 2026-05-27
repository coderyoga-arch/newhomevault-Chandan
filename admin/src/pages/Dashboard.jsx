import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { propertyService, leadService } from "../services/supabaseService";
import { Home, Mail, CheckCircle, Clock, Plus, ArrowRight } from "lucide-react";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProperties: 0,
    forSaleCount: 0,
    totalLeads: 0,
    newLeadsCount: 0,
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [properties, leads] = await Promise.all([
          propertyService.fetchProperties(),
          leadService.fetchLeads(),
        ]);

        const forSale = properties.filter((p) => p.status === "For Sale").length;
        const newLeads = leads.filter((l) => l.status === "new").length;

        setStats({
          totalProperties: properties.length,
          forSaleCount: forSale,
          totalLeads: leads.length,
          newLeadsCount: newLeads,
        });

        setRecentLeads(leads.slice(0, 5));
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const handleMarkAsContacted = async (leadId) => {
    try {
      await leadService.updateLeadStatus(leadId, "contacted");
      setRecentLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: "contacted" } : l))
      );
      setStats((prev) => ({
        ...prev,
        newLeadsCount: Math.max(0, prev.newLeadsCount - 1),
      }));
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Welcome Header */}
      <div className="dashboard-welcome">
        <div>
          <h2>Welcome back, Megan</h2>
          <p>Here is an overview of NewHomeVault property statistics and customer leads today.</p>
        </div>
        <Link to="/properties/new" className="add-prop-btn-quick">
          <Plus size={16} />
          <span>Add Property</span>
        </Link>
      </div>

      {/* Stats Panels */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrap bg-blue-light">
            <Home className="text-blue" size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Listings</p>
            <h3 className="stat-number">{stats.totalProperties}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap bg-gold-light">
            <Home className="text-gold" size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Active Listings</p>
            <h3 className="stat-number">{stats.forSaleCount}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap bg-purple-light">
            <Mail className="text-purple" size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Inquiries</p>
            <h3 className="stat-number">{stats.totalLeads}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap bg-orange-light">
            <Clock className="text-orange" size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">New Leads</p>
            <h3 className="stat-number">{stats.newLeadsCount}</h3>
          </div>
        </div>
      </div>

      {/* Main Grid split */}
      <div className="dashboard-split-grid">
        {/* Recent Inquiries Panel */}
        <div className="dashboard-panel leads-panel">
          <div className="panel-header">
            <h3>Recent Customer Inquiries</h3>
            <Link to="/leads" className="panel-header-link">
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="panel-body">
            {recentLeads.length === 0 ? (
              <div className="empty-panel-state">
                <Mail size={32} />
                <p>No inquiries received yet.</p>
              </div>
            ) : (
              <div className="dashboard-lead-list">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className={`dashboard-lead-item status-${lead.status}`}>
                    <div className="lead-item-header">
                      <div>
                        <h4 className="lead-name">{lead.name}</h4>
                        <p className="lead-meta-text">{lead.email} | {lead.phone || "No phone"}</p>
                      </div>
                      <span className={`lead-badge badge-${lead.status}`}>{lead.status}</span>
                    </div>
                    
                    <p className="lead-interest-tag">Interest: <strong>{lead.interest || "General"}</strong></p>
                    <p className="lead-msg-preview">{lead.message}</p>
                    
                    {lead.status === "new" && (
                      <button 
                        onClick={() => handleMarkAsContacted(lead.id)} 
                        className="mark-contacted-btn"
                      >
                        <CheckCircle size={14} />
                        <span>Mark as Contacted</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Tools Panel */}
        <div className="dashboard-panel quick-tools-panel">
          <div className="panel-header">
            <h3>Quick Control Actions</h3>
          </div>
          <div className="panel-body quick-actions-body">
            <button onClick={() => navigate("/properties")} className="action-button-card">
              <div className="action-card-icon">🏠</div>
              <div className="action-card-text">
                <h4>Manage Real Estate Listings</h4>
                <p>Add properties, update descriptions, builder names, prices or statuses.</p>
              </div>
            </button>
            
            <button onClick={() => navigate("/leads")} className="action-button-card">
              <div className="action-card-icon">✉️</div>
              <div className="action-card-text">
                <h4>Review Leads Inbox</h4>
                <p>Inspect inquiry interest tags, details, messages and mark read states.</p>
              </div>
            </button>
            
            <a href="http://localhost:5173" target="_blank" rel="noreferrer" className="action-button-card">
              <div className="action-card-icon">🌐</div>
              <div className="action-card-text">
                <h4>Launch Client Website</h4>
                <p>Verify live property renderings, inquiry form modules and blogs.</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
