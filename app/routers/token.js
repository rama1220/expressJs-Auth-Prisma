import {Router} from 'express';
import {validateTokenRequest} from '../../validators/validators.js';
import createToken from '../createToken.js';
import prisma from '../prisma.js';
const router = Router();

router.post('/token', validateTokenRequest,createToken)

router.get('/token', async (req,res)=>{
    try{
        const token = await prisma.token.findMany();
        res.json(token);
    }catch(error){
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
})

export default router;