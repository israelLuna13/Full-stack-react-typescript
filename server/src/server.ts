import express from 'express'
import colors from 'colors'
import db from './config/db.js'
import router from './routes/router.js'
import routerUser from './routes/authRoutes.js'

const server = express()
//read data on form
server.use(express.json())
async function conectDB(){
    try{
        await db.authenticate()
        db.sync()
        console.log(colors.bgYellow.black('Conextion to database successfully'));
        
    }catch(error)
    {
        console.log(error);
        console.log(colors.bgRed.white('Error try connect to database'));
    }
}
conectDB()

//rutes
server.use('/api/products',router)
server.use('/api/auth',routerUser)
export default server