/**
 * Usage:
 *   router.post("/", requireAuth, roleGuard(["shopkeeper"]), handler)
 */
export const roleGuard = (allowed = []) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  if (allowed.length && !allowed.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};
