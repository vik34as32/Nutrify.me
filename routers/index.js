const express = require('express')
const router = express.Router()
const userAdmin  = require('./AdminRouter/AdminLoginRouter/admin')
const adminAuthetication  = require('./AdminRouter/AdminAuthenticationRouter/admiAuthetication')
const authentication  = require('./UsersRouter/UserLoginRouter/authentication')
const UserAuthentication = require('./UsersRouter/UserAuthenticationRouter/userAuthentication')
const IsAdmin = require('../middleware/admin_middleware/auth')
const IsUserAuthentication = require('../middleware/user-middleware/auth')






router.use('/admin',userAdmin)       
router.use('/',authentication)
router.use('/auth',IsUserAuthentication,UserAuthentication)
router.use('/admin/dashboard',IsAdmin,adminAuthetication)
module.exports =router