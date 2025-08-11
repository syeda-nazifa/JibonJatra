import jwt from "jsonwebtoken";

/**
 * auth(roles)
 * - If roles is non-empty, it will enforce allowed roles.
 * - Usage: as middleware: auth() or auth(['admin']) or auth('admin')
 */
export default (roles = []) => {
  if (typeof roles === "string") roles = [roles];

  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.split(" ")[1]; // Authorization: Bearer TOKEN
      if (!token) return res.status(401).json({ message: "No token provided" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Attach minimal user info to req
      req.user = { id: decoded.id, role: decoded.role };

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: insufficient role" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
