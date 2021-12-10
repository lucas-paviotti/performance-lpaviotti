const { Router } = require('express');
const { getSignup, postSignup, failedSignup } = require('../controllers/signup.controller');
const { UsuarioModelo } = require('../models/Usuario');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { createHash } = require('../utils/utils');
const { logger } = require('../config/config');

const signupRouter = Router();

passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    },
    (req, username, password, done) => {
        UsuarioModelo.findOne({'username': username}, (err,user) => {
            if (err) {
                logger.error('Error en signup:' + err);
                return done(err);
            }
            if (user) {
                logger.warn('Usuario ya existe');
                return done(null, false, logger.warn('message', 'Usuario ya existe'));
            } else {
                const nuevoUsuario = new UsuarioModelo({
                    username: username,
                    password: createHash(password),
                    email: req.body.email,
                    firstname: req.body.firstName,
                    lastname: req.body.lastName 
                });
                nuevoUsuario.save((err) => {
                    if (err) {
                        logger.error('Error al guardar usuario:' + err);
                        throw err;
                    }
                    logger.info('Registro de usuario exitoso');
                    return done(null, nuevoUsuario)
                });
            }
        })
    }
));

signupRouter.get('/', getSignup);
signupRouter.post('/', passport.authenticate('signup', {failureRedirect: '/signup/failed'}), postSignup);
signupRouter.get('/failed', failedSignup);

module.exports = {
    signupRouter
}