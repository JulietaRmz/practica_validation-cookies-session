const { validationResult } = require('express-validator');
const helperUsers = require('../helpers/helperUsers');
const bcryptjs = require('bcryptjs');
const path = require('path');
const fs = require('fs');

module.exports = {
    showRegister: (req, res) => {
        return res.render('user/user-register-form');
    },

    processRegister: (req, res) => {
        const passwordHashed = bcryptjs.hashSync(req.body.password, 5);
        const user = {
            id: helperUsers.getNewId(),
            email: req.body.email,
            password: passwordHashed,
            avatar : req.files[0].filename
        }
        let errors=validationResult(req);
        if (!errors.isEmpty) {
            res.render('user-register-form', { errors:errors.errors})
        }

        helperUsers.writeUser(user);
        res.redirect('/');
    },

    showLogin: (req, res) => {
        return res.send('user/user-login-form');
    },
    processLogin: (req, res) => {
        // Do the magic
        return res.send('Do the magic');
    },
    showProfile: (req, res) => {
        return res.render('user/profile');
    },
    logout: (req, res) => {
        // Do the magic
        return res.redirect('/');
    }

}