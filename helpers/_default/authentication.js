const jwt = require('jsonwebtoken');

const getProtectedResource = (req, authConfig) => {
  const config = authConfig.config;
  let protectedPaths = config.protect;
  let protectedPath = protectedPaths.filter(resource =>
    req.url.startsWith(resource.path)
  );
  if (protectedPath.length == 0) {
    return false;
  }
  if (protectedPath[0].methods.indexOf(req.method) > -1) {
    return true;
  }
  return false;
};

const checkToken = req => {
  let authorization = req.get('auth-token');
  if (!authorization) {
    throw new Error(401);
  }
  return jwt.verify(token);
};

class Authentication {
    constructor(config) {
      this.config = config;
    }
    filter() {
      return (req, res, next) => {
        try {
          let shouldProtect = getProtectedResource(req, this.config.routes);
  
          if (shouldProtect) {
            //let principal = checkToken(req);
            //res.locals.principal = principal;
            console.log('unouthorized required');
          }
          next();
        } catch (e) {
          console.log('unouthorized', e);
          res.status(401).json({ error: 'not_authorized' }).end();
        }
      };
    }
  }
  
  module.exports = Authentication;