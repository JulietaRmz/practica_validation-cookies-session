const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware=require('../middlewares/usersMiddlewares')
const {check, validationResult, body} = require('express-validator')
const multer= require ('multer');
const path = require('path');
const fs = require('fs')

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
router.post('/register', upload.any(), 
  [check('email').isEmail().notEmpty().withMessage('Debes ingresar un mail válido'),
  check('password').isLength({min:6}).withMessage('La contraseña debe tener como mínimo 6 caracteres'),
  check('retype').notEmpty().withMessage('Debes repetir tu contraseña'),
  body('avatar').custom(function(value){
      req.files[0].notEmpty,
      (req.file.path.extname(file.originalname)== '.jpg' || req.file.path.extname(file.originalname)== '.jpeg' || req.file.path.extname(file.originalname)== '.png')
  }).withMessage('Debes agregar una imagen')], userController.processRegister);       // Procesa la vista de registro
router.get('/login', userController.showLogin);     // Muestra la vista de login
router.post('/login', userController.processLogin);     // Procesa la vista de login
router.get('/profile', userController.showProfile);     // Muestra el perfil del usuario
router.get('/logout', userController.logout);       // Cierra la sesión

module.exports = router;