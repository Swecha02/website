import jwt from 'jsonwebtoken';

export function requireAdmin(req, res, next) {
  const token = req.cookies?.admin_token || null;

  if (!token) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
