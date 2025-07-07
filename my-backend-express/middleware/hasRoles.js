module.exports = function hasRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: `Accès réservé aux rôles : ${roles.join(', ')}` });
    }
    next();
  };
};