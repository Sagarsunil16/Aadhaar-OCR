import express from 'express'
import dotenv from 'dotenv'
import router from './routes/route'
import cors from 'cors'
dotenv.config()

const app = express()
const port =  process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    // credentials: true,
}))


app.use('/api',router)

app.listen(port,()=>{
    console.log(`Server is listening on port:"http://localhost:${port}"`)
})