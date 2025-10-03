import Router from 'express';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/auth.js';
import { loginUserController } from '../controllers/auth.js';
import { loginUserSchema } from '../validation/auth.js';
import { logoutUserController } from '../controllers/auth.js';
import { refreshUserSessionController } from '../controllers/auth.js';

const router = Router();

router.post('/register',
    validateBody(registerUserSchema),
    registerUserController);

 router.post('/login',
    validateBody(loginUserSchema),
    loginUserController);
router.post('/logout', logoutUserController);
router.post('/refresh', refreshUserSessionController);

export default router;

