import express from 'express'
import colors from 'colors'
// import cors from 'cors'
import db from './config/db'
import router from './routes/router'
import routerUser from './routes/authRoutes'
// import { corsConfig } from './config/cors'

const server = express()
//read data on form
server.use(express.json())
export async function conectDB(){
    try{

        await db.authenticate()
        await db.sync()
       //console.log(colors.bgYellow.black('Conextion to database successfully'));
        
    }catch(error)
    {
     //  console.log(error);
      console.log(colors.bgRed.white('Issuse connecting to database'));
      //throw error;
    }
}
conectDB()
// server.use(cors(corsConfig))

//rutes
server.use('/api/products',router)
server.use('/api/auth',routerUser)
server.get('/api',(req,res)=>{
    res.json({msg:'Desde api'})
})
export default server