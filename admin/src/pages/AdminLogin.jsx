import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Successful login
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-card-glow"></div>
      <div className="login-card">
        <div className="login-header">
          <div className="brand-logo">NHV</div>
          <h2>NewHomeVault</h2>
          <p className="login-subtitle">ADMIN CONTROL PANEL</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="login-error-msg">{error}</div>}

          <div className="login-field-group">
            <label>Admin Email</label>
            <input
              type="email"
              placeholder="admin@newhomevault.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-field-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? "AUTHENTICATING..." : "SIGN IN TO PORTAL"}
          </button>
        </form>
      </div>
    </div>
  );
}
