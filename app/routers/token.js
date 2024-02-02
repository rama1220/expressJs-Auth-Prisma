import {Router} from 'express';
import {validateTokenRequest} from '../../middleware/validators.js';
import createToken from '../createToken.js';
const router = Router();

router.post('/token', validateTokenRequest,createToken)

export default router;