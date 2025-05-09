<<<<<<< HEAD
const {body} = require('express-validator');
const userController = require('../controllers/user.controllers');
const router = require('express').Router();
const {authUser} = require('../middlewares/auth.middleware');

router.post('/signup',[
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required').isLength({min:8}).withMessage('Password must be at least 8 characters long'),
    body('forestId').notEmpty().withMessage('Forest ID is required')
],userController.signup);

router.post('/login',[
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')
],userController.login);

router.get('/logout',authUser,userController.logout);

=======
const {body} = require('express-validator');
const userController = require('../controllers/user.controllers');
const router = require('express').Router();
const {authUser} = require('../middlewares/auth.middleware');

router.post('/signup',[
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required').isLength({min:8}).withMessage('Password must be at least 8 characters long'),
    body('forestId').notEmpty().withMessage('Forest ID is required')
],userController.signup);

router.post('/login',[
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')
],userController.login);

router.get('/logout',authUser,userController.logout);

>>>>>>> refs/remotes/origin/samir
module.exports = router;