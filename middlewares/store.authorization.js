const expressJwt = require('express-jwt');

function authorization(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach store to request object (req.store)
    expressJwt({ secret: process.env.SECRET_KEY, requestProperty: 'store' }),

    // authorize based on store role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.store.role)) {
        // store's role is not authorized
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.token = req.header('Authorization').replace('Bearer ', '');
      // authentication and authorization successful
      next();
    },
  ];
}

module.exports = authorization;
