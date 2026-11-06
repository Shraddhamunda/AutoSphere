import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import { registerSchema } from "../validators/authValidator";
import {z} from "zod";

dotenv.config();

export const register = async (req,res)=>{
    try{
        const validation = registerSchema.safeParse(req.body);

        if(!validation.success){
            return res.status(400).json({
                success:false,
                message:"Validation Failed",
                errors: z.treeifyError(validation.error)
            })
        }

        const {name,email,password} = validation.data;

        


    }catch(err){
        return res.status(500).json({
            message:"Internal server error",
            err
        })
    }
}