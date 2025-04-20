let attempts = {};

function rateLimit(route) {
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    if (!attempts[ip]) attempts[ip] = [];

    attempts[ip] = attempts[ip].filter(ts => now - ts < 60000);
    if (attempts[ip].length >= 5) {
      return res.status(429).json({ message: 'Too many requests' });
    }

    attempts[ip].push(now);
    next();
  };
}

module.exports = rateLimit;
