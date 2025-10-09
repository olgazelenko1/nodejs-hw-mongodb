import Router from 'express';

import { validateBody } from '../middlewares/validateBody.js';

import { refreshUserSessionController,requestResetEmailController,logoutUserController,loginUserController,registerUserController,resetPwdController } from '../controllers/auth.js';

import {  registerUserSchema,loginUserSchema,requestResetEmailSchema, resetPwdSchema  } from '../validation/auth.js';




const router = Router();

router.post('/register',
    validateBody(registerUserSchema),
    registerUserController);

 router.post('/login',
    validateBody(loginUserSchema),
    loginUserController);
    
router.post('/logout',
     logoutUserController);

router.post('/refresh', 
    refreshUserSessionController);

router.post('/send-reset-email',
    validateBody( requestResetEmailSchema),
    requestResetEmailController);

router.post('/reset-pwd',
    validateBody(resetPwdSchema),
    resetPwdController);

    
export default router;

