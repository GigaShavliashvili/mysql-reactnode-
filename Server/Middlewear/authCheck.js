const jwt = require("jsonwebtoken");

async function authCheck(req, res, next) {
  const token = req.get("Authorization").split(" ")[1];
  console.log(token)
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      res.status(403).json(err);
      console.log(err)
    } else if (user) {
        console.log(user)
      next();
    }
  });
}
async function checkRefreshToken(req, res, next) {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    res.status(401).json({ msg: "refresh token dont found" });
  } else {
    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
      if (err) res.status(403).json({ msg: "invalid refresh token" });
      console.log(user)
      req.user = {
        id:user.id,
        fullName:user.fullName,
        username:user.username,
        email:user.email
      };
      next();
    });
  }
}

module.exports = {
  checkRefreshToken,
  authCheck,
};
