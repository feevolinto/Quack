export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (!authHeader.startsWith("Bearer fake-token-")) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const userId = authHeader.split("fake-token-")[1];
  req.user = { id: userId };

  next();
};
