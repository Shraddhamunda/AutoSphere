import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import { registerSchema } from "../validators/authValidator";
import {z} from "zod";
import prisma from "../config/prisma";

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

        const existingUser = await prisma.user.findUnique({
            where:{
                email:email
            }
        })

        if(existingUser){
            return res.status(409).json({
                success:false,
                message:"A user with this email already exists"
            })
        }
       const salt = Number(process.env.SALT);
       const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await prisma.user.create({
            data:{
                name:name,
                email:email,
                password:hashedPassword,
            }
        });

        return res.status(201).json({
            success:true,
            message:"User is registered successfully",
            user:{
                id:newUser.id,
                name:newUser.name,
                email:newUser.email,
                role:newUser.role
            }
        });


    }catch(err){
        console.error(err);

        if (err.code === "P2002") {
        return res.status(409).json({
            success: false,
            message: "A user with this email already exists"
        });
    }
    
        return res.status(500).json({
            message:"Internal server error",
        })
    }
}