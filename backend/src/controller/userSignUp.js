import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';


// function to bcrypt password
const hashPasswordFunction = async (plainPassword) => {
  try {
    const saltRounds = 10; // Number of salt rounds
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return  hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
  }
};

const useSignUpController = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        const user = await User.findOne({email})

        if(user){
            throw new Error("Email account already exists.")
        }

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password") 
        }
        if(!name){
            throw new Error("Please provide name")
        }

        // bcrypt the password
        const hashedPassword = await hashPasswordFunction(password)

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashedPassword
        }

        const userData = new User(payload)
        const saveUser = await userData.save()

        const dataSize = Buffer.byteLength(JSON.stringify(req.body)); // Calculate size in bytes
        console.log(`Data size: ${dataSize} bytes`);


        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User Created Successfully."
        })

    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
}

export default useSignUpController