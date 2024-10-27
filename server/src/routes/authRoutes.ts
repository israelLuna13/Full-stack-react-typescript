import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation.js";
import { AuthHandler } from "../handlers/user.js";
const router=Router()
router.post('/create-account',
    body('name').notEmpty().withMessage('Name not most empty'),
    body('password').isLength({min:6}).withMessage('Password is very short, minimum 6 characters'),
    body('password_confirmation').custom((value,{req})=>{
        if(value !== req.body.password)
            throw new Error('The password are not same')
        return true
    }),
    body('email').isEmail().withMessage('Email not valide'),
    handleInputErrors,
    AuthHandler.createAccount)

router.post('/confirm-account',
    body('token').notEmpty().withMessage('The token is required'),
    handleInputErrors,AuthHandler.confirmAccount
)

router.post('/login',body('email').isEmail().withMessage('Email not valide'),
body('password').notEmpty().withMessage('The password not cant be empty'),handleInputErrors,AuthHandler.login)

router.post('/request-code',
    body('email').isEmail().withMessage('Email not valide'),
    handleInputErrors,
    AuthHandler.requestConfirmationCode
)

export default router