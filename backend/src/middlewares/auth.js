export const auth = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: -1, descripcion: `ruta ${req.path} no autorizada` });
    }
    next();
}

export const authUser = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ error: -1, descripcion: `ruta ${req.path} no autorizada` });
    }
    next();
}
