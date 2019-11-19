const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const Role = require('./role');

function authorization(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach client (USER | STORE | COURIER) to request object (req.client)
    expressJwt({
      secret: process.env.SECRET_KEY,
      requestProperty: 'client',
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
        } else {
          const token = jwt.sign(
            { role: Role.Anonymous },
            process.env.SECRET_KEY
          );
          req.token = token;
          return token;
        }
      },
    }),

    // authorize based on client role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.client.role)) {
        // client's role is not authorized
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // authentication and authorization successful
      next();
    },
  ];
}

module.exports = authorization;
