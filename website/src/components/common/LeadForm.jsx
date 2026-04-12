import { useState } from "react";
import "./LeadForm.css";

export default function LeadForm({ 
  context = "General Inquiry", 
  title = "Get In Touch",
  subtitle = "Have questions about new developments or design? We'll provide clarity and guidance.",
  buttonText = "Submit Inquiry",
  isNewsletter = false,
  isStacked = false
}) {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    message: isNewsletter ? "Newsletter Subscription Request" : `I'm interested in learning more about ${context}.` 
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          interest: isNewsletter ? "Newsletter" : context
        }),
      });

      if (resp.ok) {
        setSubmitted(true);
      } else {
        const data = await resp.json();
        throw new Error(data.error || "Failed to send message.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="lead-form-success">
        <div className="success-icon">✓</div>
        <h4>Thank you!</h4>
        <p>We've received your request and will be in touch shortly.</p>
        <button className="btn-outline" onClick={() => setSubmitted(false)} style={{marginTop: 20}}>Send Another</button>
      </div>
    );
  }

  if (isNewsletter) {
    return (
      <div className="newsletter-wrap">
         <form className="newsletter-form-component" onSubmit={submit}>
            <input 
              type="email" 
              name="email" 
              placeholder="Your email address" 
              value={form.email} 
              onChange={handle} 
              required 
            />
            <button type="submit" disabled={loading}>
              {loading ? "..." : "Subscribe"}
            </button>
         </form>
         {error && <p className="error-text-small">{error}</p>}
      </div>
    );
  }

  return (
    <div className={`lead-form-container ${isStacked ? "is-stacked" : ""}`}>
      {title && <h3 className="lead-form-title">{title}</h3>}
      {subtitle && <p className="lead-form-subtitle">{subtitle}</p>}
      
      <form className="lead-form-body" onSubmit={submit}>
        <div className="form-group">
          <label>Full Name *</label>
          <input 
            name="name" 
            value={form.name} 
            onChange={handle} 
            placeholder="Your full name" 
            required 
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Email Address *</label>
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handle} 
              placeholder="your@email.com" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input 
              name="phone" 
              value={form.phone} 
              onChange={handle} 
              placeholder="(647) 000-0000" 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Message *</label>
          <textarea 
            name="message" 
            value={form.message} 
            onChange={handle} 
            rows={4} 
            placeholder="Tell us about your goals..." 
            required 
          />
        </div>

        {error && <p className="error-text">{error}</p>}
        
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Sending Information..." : buttonText}
        </button>
        
        <p className="form-disclaimer">
          By submitting, you agree to be contacted regarding your inquiry. No pressure.
        </p>
      </form>
    </div>
  );
}
