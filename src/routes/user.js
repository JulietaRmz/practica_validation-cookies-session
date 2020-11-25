const express = require('express');
const router = express.Router();
const multer= require ('multer');
const path = require('path');
const fs = require('fs')
const {check, validationResult, body} = require('express-validator')
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/usersMiddlewares')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });


router.get('/register', userController.showRegister);       // Muestra la vista de registro
router.post('/register',/* upload.any(), *//* [
  console.log('ENTRE AL MIDDLE'),
  check('email').isEmail().withMessage('Debes ingresar un mail válido'),
  console.log('CHECKEE LA IMEIL'),
  check('password').isLength({min:6}).withMessage('La contraseña debe tener como mínimo 6 caracteres'),
  console.log('CHECKEE LA PASS'),
  check('retype').notEmpty().withMessage('Debes repetir tu contraseña'),
  console.log('FIN')
] */authMiddleware, userController.processRegister);                 // Procesa la vista de registro
router.get('/login', userController.showLogin);     // Muestra la vista de login
router.post('/login', userController.processLogin);     // Procesa la vista de login
router.get('/profile', userController.showProfile);     // Muestra el perfil del usuario
router.get('/logout', userController.logout);       // Cierra la sesión

module.exports = router;