module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader === "Bearer ZEWAIL") {
      next(); 
    } else {
      res.status(403).json({ error: "Unauthorized access" });
    }
};
