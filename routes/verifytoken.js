const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('auth-token');
  if(!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, "sdadskdqwoeqcmashdqwd213");
    req.user = verified;
  
    next();
  }catch (err) {
    res.status(400).send({message: err})
  }
}
