import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import testDriveRoutes from "./routes/testDriveRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";

dotenv.config();


const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/auth",authRouter);
app.use("/api/test-drives", testDriveRoutes);
app.use("/api/leads", leadRoutes);

app.get("/api/health", (req,res)=>{
    res.status(200).json({
        success:true,
        message:"AutoSphere API is running"
    })
});

const PORT = process.env.PORT || 5001;

app.listen(PORT,()=>{
    console.log(`The server is running on ${PORT}`);
})