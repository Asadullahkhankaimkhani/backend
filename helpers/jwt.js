const expressJwt = require("express-jwt");

function authJwt() {
  const secret = process.env.SECRET_KEY;
  const api = process.env.API_URL;

  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      `${api}/user/checkphone`,
      `${api}/user/find`,
      `${api}/user/findEB`,
      `${api}/user/login`,
      `${api}/user/loginEB`,
      `${api}/user/forgotPassword`,
      `${api}/auth/forgotpassword`,
      `${api}/auth/codeVerification`,
      `${api}/auth/saveUserNewPassword`,
      `${api}/auth/register`,
      `${api}/auth/login`,
      `${api}/aboutus`,
      {
        url: /^\/api\/v1\/user\/mobile\/.*/,
        methods: ["GET", "PUT"],
      },
      {
        url: /^\/api\/v1\/user\/password\/.*/,
        methods: ["GET", "PUT"],
      },
    ],
  });
}

async function isRevoked(req, user, done) {
  if (!user) {
    done(null, true);
  }
  done();
}

module.exports = authJwt;
