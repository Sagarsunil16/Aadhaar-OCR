import express from 'express'
import dotenv from 'dotenv'
import router from './routes/route'

dotenv.config()

const app = express()
const port =  process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/',router)

app.listen(port,()=>{
    console.log(`Server is listening on port:"http://localhost:${port}"`)
})