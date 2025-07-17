export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Se requiere rol de ADMIN' });
  }
  next();
};