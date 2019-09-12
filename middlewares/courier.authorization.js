const expressJwt = require('express-jwt');

function authorization(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach courier to request object (req.courier)
    expressJwt({
      secret: process.env.SECRET_KEY,
      requestProperty: 'courier',
      getToken: function(req) {
        if (
          req.header('Authorization') &&
          req.header('Authorization').split(' ')[0] === 'Bearer'
        ) {
          const token = req.header('Authorization').split(' ')[1];
          req.token = token;
          return token;
        } else if (req.cookies.token) {
          const { token } = req.cookies;
          req.token = token;
          return token;
        }
        return null;
      },
    }),

    // authorize based on courier role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.courier.role)) {
        // courier's role is not authorized
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.token = req.header('Authorization').replace('Bearer ', '');
      // authentication and authorization successful
      next();
    },
  ];
}

module.exports = authorization;
