import { Router } from "express";
// import tokenRoute from "./routers/token.js";
import { authToken } from "./middleware.js";

const router = Router();

router.get('/protected', authToken,(req,res)=>{
    res.json({message:"protected data"})
})

export default router