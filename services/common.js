const passport = require('passport');

exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt');
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role , name:user?.name,image:user?.image};
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2YwZjI3MmRkMTE5MGNjNGMzOThmMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMzIyMzY0NX0.W8BMKe9ZFnba6-v_rIcvmOLoXUre0kmKAelnX18HGXM";
  return token;
};
