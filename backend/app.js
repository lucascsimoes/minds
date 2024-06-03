import { configDotenv } from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import userRoute from './routes/user.js'
import cardRoute from './routes/card.js'
import transactionRoute from './routes/transaction.js'

configDotenv();
const app = express()

app.use(cors());
app.use(express.json())
app.use('/auth', userRoute)
app.use('/card', cardRoute)
app.use('/transaction', transactionRoute)


const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${ dbUser }:${ dbPassword }@cluster0.nmnxpht.mongodb.net/minds?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        app.listen(8000)
        console.log("[ OK ] Conectado ao banco de dados")
    })
    .catch(error => {
        console.log(error)
    }
)

