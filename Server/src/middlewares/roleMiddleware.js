import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret_key = process.env.JWT_SECRET;

export const roleMiddleware = (...allowedRoles)=>{
    return (req,res,next)=>{
        if(!req.user || !req.user.role){
            return res.status(401).json({
                message:"Access forbidden: No role found"
            })
        }

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                message:`Access forbidden: Required roles: ${allowedRoles.join(', ')}`
            })
        }

        next();
    }
}