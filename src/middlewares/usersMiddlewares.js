const {check, validationResult, body} = require('express-validator')

function authMiddleware (res,res,next) {
        [check('email').isEmail().notEmpty().withMessage('Debes ingresar un mail válido'),
        check('password').isLength({min:6}).withMessage('La contraseña debe tener como mínimo 6 caracteres'),
        check('retype').notEmpty().withMessage('Debes repetir tu contraseña'),
        body('avatar').custom(function(value){
            req.files[0].notEmpty,
            (req.file.path.extname(file.originalname)== '.jpg' || req.file.path.extname(file.originalname)== '.jpeg' || req.file.path.extname(file.originalname)== '.png')
        }).withMessage('Debes agregar una imagen')];
        next();
}

module.exports=authMiddleware;
