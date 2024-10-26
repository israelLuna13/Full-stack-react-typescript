import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
import Product from "../models/Product.model.js";
dotenv.config()

const db = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    models: [Product],
    logging: false
})
export default db;