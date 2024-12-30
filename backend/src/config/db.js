import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("DB CONNECTED")
    } catch (error) {
        console.log("DB connnection failed: ", error)
        throw new Error("Something went wrong!")   
    }
}   

export default connectDB    