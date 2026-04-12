import { useNavigate } from "react-router-dom";
import { properties, testimonials, blogs } from "../../utils/mockData";
import "./Home.css";
import meganShowroom from "../../assets/images/megan_showroom_clean.png";
import meganMain from "../../assets/images/megan_main.png";

const heroSlides = [
  { bg: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80" },
  { bg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" },
  { bg: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80" },
];

export default function Home() {
  const navigate = useNavigate();
  const featured = properties.slice(0, 3);
  const spotlight = properties.slice(0, 2);

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${heroSlides[0].bg})` }} />
        <div className="hero-overlay" />
        <div className="hero-content container">
          <span className="hero-eyebrow">New Home Advisory · Canada</span>
          <h1 className="hero-title">Find Your New<br />Construction Home</h1>
          <p className="hero-sub">Curated access to exclusive new-build developments. Clear guidance. No pressure.</p>
          <button className="btn-primary" onClick={() => navigate("/contact#inquiry")}>Get in Touch</button>
        </div>
        <div className="hero-scroll-indicator">
          <span />
        </div>
      </section>

      {/* ABOUT INTRO */}
      <section id="home-about" className="section about-intro">
        <div className="container about-intro-grid">
          <div className="about-intro-images">
            <img src={meganShowroom} alt="Megan working" className="img-main" />
            <img src={meganMain} alt="Megan Portrait" className="img-accent" />
          </div>
          <div className="about-intro-text">
            <span className="section-label">About Us</span>
            <h2 className="section-title">Curated Homes.<br />Intelligent Decisions.</h2>
            <p>We help clients navigate exclusive new home developments and thoughtfully designed spaces with clarity and confidence.</p>
            <p style={{ marginTop: 16 }}>Through trusted builder partnerships, deep market knowledge, and careful analysis, we provide access to high-quality opportunities across Canada and key global markets.</p>
            <p style={{ marginTop: 16, fontStyle: 'italic', color: 'var(--gold)' }}>Every recommendation is grounded in data, experience, and long-term perspective. No pressure.</p>
            <button className="btn-outline" style={{ marginTop: 32 }} onClick={() => navigate("/contact#inquiry")}>Book a Private Consultation</button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="home-services" className="section-alt services-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="section-label">What We Do</span>
            <h2 className="section-title">A Boutique Advisory for<br />New Homes & Design</h2>
          </div>
          <div className="services-grid">
            {[
              { icon: "🏡", title: "New Home Advisory", desc: "Strategic guidance through exclusive new-build and condominium developments. We help clients evaluate projects, compare opportunities, and select the right homes with clarity and confidence." },
              { icon: "🎨", title: "Design & Staging", desc: "Integrated interior design and property presentation services. We create refined living spaces and market-ready environments that enhance comfort, functionality, and long-term value." },
              { icon: "📊", title: "Portfolio & Market Advisory", desc: "Long-term guidance for buyers and investors. We provide data-informed analysis, acquisition planning, and resale strategies aligned with your financial and lifestyle goals." },
            ].map((s) => (
              <div key={s.title} className="service-card">
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <button className="service-link" onClick={() => navigate("/services")}>Learn More →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT BY LOCATION */}
      <section id="project-locations" className="section">
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <span className="section-label">Area Projects</span>
            <h2 className="section-title">Project By Location</h2>
          </div>
          <div className="location-grid">
            {properties.slice(0, 3).map((p) => (
              <div key={p.id} className="location-card" onClick={() => navigate("/property-detail", { state: p })}>
                <img src={p.img} alt={p.name} />
                <div className="location-overlay">
                  <h3>{p.name}</h3>
                  <span>{p.location}</span>
                  <button className="btn-outline">View Property</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section id="featured-listings" className="section">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="section-label">Properties</span>
            <h2 className="section-title">Featured Listings</h2>
          </div>
          <div className="listings-grid">
            {featured.map((p) => (
              <div key={p.id} className="listing-card" onClick={() => navigate("/property-detail", { state: p })}>
                <div className="listing-img-wrap">
                  <img src={p.img} alt={p.name} />
                  <span className="listing-badge">{p.status}</span>
                </div>
                <div className="listing-body">
                  <p className="listing-loc">📍 {p.location}</p>
                  <div className="listing-specs">
                    <span>🛏 {p.beds}</span>
                    <span>🚿 {p.baths}</span>
                  </div>
                  <p className="listing-price">From ${p.priceFrom.toLocaleString()} – ${p.priceTo.toLocaleString()}</p>
                  <h3 className="listing-title">{p.name}</h3>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button className="btn-outline" onClick={() => navigate("/property")}>View All Properties</button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="home-testimonials" className="section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-label">Our Testimonial</span>
            <h2 className="section-title">Client's Feedback</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card">
                <p>{t.text}</p>
                <div className="testimonial-author">{t.name}</div>
                <div className="testimonial-location">{t.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="home-blogs" className="section">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="section-label">News & Blogs</span>
            <h2 className="section-title">Real Estate Insights</h2>
          </div>
          <div className="blog-grid">
            {blogs.map((b) => (
              <a key={b.title} href={b.url} target="_blank" rel="noreferrer" className="blog-card" style={{ textDecoration: 'none' }}>
                <div className="blog-card-img">
                  <img src={b.img} alt={b.title} />
                </div>
                <div className="blog-card-body">
                  <div className="blog-meta">
                    <span>By {b.author}</span>
                    <span>{b.category}</span>
                    <span>{b.date}</span>
                  </div>
                  <h3>{b.title}</h3>
                  <span>Read more →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-banner">
        <div className="container">
          <h2>Looking for a dream home?</h2>
          <p>We can help you realize your dream of a new home</p>
          <button className="btn-primary" onClick={() => navigate("/property")}>Explore Properties</button>
        </div>
      </div>
    </div>
  );
}
