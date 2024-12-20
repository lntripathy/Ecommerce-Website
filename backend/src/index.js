import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/db.js"
import router from "./routes/index.js"
import cookieParser from 'cookie-parser'

const app = express()
// app.use(express.json())     // parsing request body

// Middleware to increase body size limit
app.use(express.json({ limit: "10mb" })); // Allow JSON payloads up to 10MB
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Allow URL-encoded payloads up to 10MB

app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    sameSite: "lax",
}))

app.use("/api", router)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const PORT = process.env.PORT || 3000  


// DB connection
connectDB().then(() => {
    app.listen(PORT, ()=>{
        console.log(`Example app listening on port ${PORT}`)
    })
})
