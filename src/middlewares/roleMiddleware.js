export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado: permisos insuficientes'
      });
    }
    next();
  };
};

// Uso equivalente a @Roles('ADMIN')
export const adminOnly = checkRole(['ADMIN']);
export const adminOrVet = checkRole(['ADMIN', 'VETERINARIO']);