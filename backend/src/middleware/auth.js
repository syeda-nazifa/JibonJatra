import jwt from "jsonwebtoken"

/**
 * auth(roles)
 * - If roles is non-empty, it will enforce allowed roles.
 * - Usage: as middleware: auth() or auth(['admin']) or auth('admin')
 */

export default (roles = []) => {
  if (typeof roles === "string") roles = [roles];

  return (req, res, next) => {
    try{
      const token = (req.headers.authorization || "").split(" ")[1];
      if(!token) return res.status(401).json({message: "No Token"});

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {id: decoded.id, role: decoded.role};

      if(roles.length && !roles.includes(req.user.role)){
        return res.status(403).json({message: "Forbidden"});
      }
      next();

    }catch{
      res.status(401).json({message: "Invalid Token"})
    }
  };
};
