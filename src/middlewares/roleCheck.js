export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Se requiere rol de ADMIN' });
  }
  next();
};

export const adminOrVet = (req, res, next) => {
  if (!['ADMIN', 'VETERINARIO'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Se requiere rol de ADMIN o VETERINARIO' });
  }
  next();
};