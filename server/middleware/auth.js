import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  const token = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    req.user = user;
    // console.log(req.body);
    next();
  });
};

export default authenticateUser;