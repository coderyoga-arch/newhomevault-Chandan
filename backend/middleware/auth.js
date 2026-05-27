const { supabase } = require("../config/supabase");

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied. Authentication token is missing." });
    }

    const token = authHeader.split(" ")[1];
    
    // Verify the JWT token with Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Access denied. Invalid or expired authentication session." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(500).json({ error: "Internal authentication validation error." });
  }
};

module.exports = { requireAuth };
