import type { Request,Response } from "express"
import User from "../models/User.model.js"
import { checkPassword, hashPassword } from "../utils/auth.js"
import Token from "../models/Token.js"
import { generateToken } from "../utils/token.js"
import { AuthEmail } from "../emails/AuthEmail.js"

export class AuthHandler{
    static createAccount = async(req:Request,res:Response)=>{
        try {
            const {password,email} =req.body
            const userExist = await User.findOne({
                where:{email}
            })
            if(userExist){
                const error = new Error('The user is registered')
                return res.status(409).json({error:error.message})
            }
            //create user
            const user = new User(req.body)
            user.password = await hashPassword(password)
            await user.save()

           //token
           const token = new Token()
           token.token = generateToken()
           token.userId = user.id

           //sent email
           AuthEmail.sentConfirmationEmail({
            email:user.email,
            name:user.name,
            token:token.token
           })
           await token.save()
            return res.send('Account created, Check you email to confirm')
        } catch (error) {
            console.log(error);
            return res.status(500).json({error:'There was error'})
        }
    }

    static confirmAccount =  async(req:Request,res:Response)=>{
        try{
            const {token} = req.body
            const tokenExist = await Token.findOne({where:{token}})
            if(!tokenExist){
                const error = new Error('Token is not valide')
                return res.status(404).json({error:error.message})
            }
            const user = await User.findByPk(tokenExist.userId)
            user.confirmed =true

            //save user and delete token
            await Promise.allSettled([user.save(),tokenExist.destroy()])
            res.send('Account confirmed successfully')
        }catch(error){
            res.status(500).json({error:'There was error'})

        }
    }

    static login = async(req:Request,res:Response)=>{
      try {
        const {email,password} = req.body

        const user = await User.findOne({where:{email}})
        if(!user){
            const error = new Error('User does not existe')
            return res.status(404).json({error:error.message})
        }

        if(!user.confirmed){
            const token = new Token()
            token.userId = user.id
            token.token = generateToken()
            await token.save()

            AuthEmail.sentConfirmationEmail({
                email:user.email,
                name:user.name,
                token:token.token
            })

            const error = new Error('The account is not confirmed. We have sent email to confirm account')
            return res.status(401).json({error:error.message})
        }

        //check password
        const isPasswordCorrect = await checkPassword(password,user.password)
        if(!isPasswordCorrect)
        {
            const error = new Error('Password Incorrect')
            return res.status(401).json({error:error.message})
        }
        res.send('Authenticated')
      } catch (error) {
        console.log(error);
        res.status(500).json({error:'There was error'})
        
      }
        
    }

    static requestConfirmationCode = async(req:Request,res:Response)=>
    {
        try {
            const {email} = req.body
            const user = await User.findOne({where:{email}})
            if(!user)
            {
                const error = new Error('The user is not registered')
                return res.status(404).json({error:error.message})
            }
            if(user.confirmed)
            {
                const error = new Error('The user is already confirmed')
                return res.status(403).json({error:error.message})
            }

            const token = new Token()
            token.token = generateToken()
            token.userId = user.id

            AuthEmail.sentConfirmationEmail({
                email:user.email,
                name:user.name,
                token:token.token
            })

            await token.save()
            res.send('Email send with the token to your email ')

        } catch (error) {
            console.log(error);
            res.status(500).json({error:'There was error'})
            
        }

    }
}
