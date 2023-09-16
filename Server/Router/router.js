const { register, login, refreshToken } = require('../Controller/auth')
const { checkRefreshToken } = require('../Middlewear/authCheck')


const router = require('express').Router()

router.get("/")
router.post('/register', register)
router.post('/login',  login)
router.post("/refreshToken", checkRefreshToken, refreshToken)
module.exports = router