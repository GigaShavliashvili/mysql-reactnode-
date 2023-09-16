// @Desc Register User
// @Route POST /api/auth/register
// @Access public

const DbService = require("../dbservice");
const {
  HashPassword,
  createToken,
  ComparePasswords,
  createRefreshToken,
} = require("../utils/auth.utils");
const { ValidateEmail } = require("../utils/utils");

exports.register = async (req, res) => {
  const { userName, firstName, lastName, email, password } = req.body;
  if (!userName || !firstName || !lastName || !password) {
    return res.status(400).json({ errMessage: "enter all fields" });
  } else if (!ValidateEmail(email)) {
    return res.status(400).json({ success: false, msg: "Enter valid email" });
  }
  //if user name is already registered
  DbService.userExist(userName)
    .then((dontExist) => {
      // if username dont exist
      if (dontExist) {
        const hashedPassword = HashPassword(password);
        DbService.registerUser({
          userName,
          firstName,
          lastName,
          email,
          password: hashedPassword,
        }).then((response) => {
          const token = createToken({
            userName,
            firstName,
            lastName,
            email,
            id: response.insertId,
          });
          res.status(200).json({ id: response.insertId, token: token });
        });
      } else {
        return res
          .status(400)
          .json({ success: false, msg: "user already exists" });
      }
    })
    .catch((err) => console.log(err));
};

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName, password);
  if (!userName || !password) {
    res.status(400).json({ success: false, msg: "enter all fields" });
  }
  DbService.getUserbyUserName(userName)
    .then((response) => {
      if (response.length !== 0) {
        if (ComparePasswords(password, response[0].password)) {
          const user = response[0];
          const accessToken = createToken({ ...user });
          const refreshToken = createRefreshToken({...user });
          res.status(200).json({
            success: true,
            data: accessToken,
            refreshToken: refreshToken,
          });
        } else {
          res
            .status(200)
            .json({ success: false, errmsg: "password is incorrect" });
        }
      } else {
        res.status(404).json({ success: false, errmsg: "user not found" });
      }
    })
    .catch((err) => console.log(err));
};

exports.refreshToken = async (req, res) => {
    const user = req.user
  const accessToken = createToken({ ...user }, { expiresIn: "30s" });
  res.status(200).json({ success: true, data: accessToken });
};
