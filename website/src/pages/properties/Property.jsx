import { useNavigate } from "react-router-dom";
import { properties } from "../../utils/mockData";
import "./Property.css";

export default function Property() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-banner">
        <h1>Property Listing</h1>
        <div className="breadcrumb">
          <span onClick={() => navigate("/")}>Home</span>
          <span style={{cursor:'default',color:'rgba(255,255,255,0.4)'}}>›</span>
          <span style={{cursor:'default',color:'rgba(255,255,255,0.6)'}}>Property Listing</span>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="property-grid">
            {properties.map((p) => (
              <div key={p.id} className="property-card" onClick={() => navigate("/property-detail", { state: p })}>
                <div className="property-img-wrap">
                  <img src={p.img} alt={p.name} />
                  <span className="property-badge">{p.status}</span>
                  <div className="property-author">
                    <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=60&q=80" alt="Agent" />
                  </div>
                </div>
                <div className="property-body">
                  <h3 className="property-name">{p.name}</h3>
                  <p className="property-loc">📍 {p.location}</p>
                  {p.priceFrom && (
                    <p className="property-price">From ${p.priceFrom.toLocaleString()}</p>
                  )}
                  <button className="property-btn">View Details →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-banner">
        <div className="container">
          <h2>Looking for a dream home?</h2>
          <p>We can help you realize your dream of a new home</p>
          <button className="btn-primary" onClick={() => navigate("/contact")}>Explore Properties</button>
        </div>
      </div>
    </div>
  );
}
