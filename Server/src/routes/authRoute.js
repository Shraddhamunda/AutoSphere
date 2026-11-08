import { Router } from "express"
import {register,login} from "../controllers/authController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = Router();

router.post("/register",register);
router.post("/login",login);
router.get("/me",authMiddleware,(req,res)=>{
    return res.status(200).json({
        success:true,
        user:req.user
    })
});
router.get("/admin-test",roleMiddleware('admin'),(req,res)=>{
    return res.json({
        success:true,
        message:"Admin access granted"
    })
})

export default router;