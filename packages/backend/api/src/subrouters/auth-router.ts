import express from 'express';

import cookieRouter from './cookie-router';
import loginRouter from './login-router';
import logoutRouter from './logout-router';
import registerRouter from './register-router';

const authRouter = express.Router();

authRouter.use('/cookie', cookieRouter);
authRouter.use('/login', loginRouter);
authRouter.use('/logout', logoutRouter);
authRouter.use('/register', registerRouter);

export default authRouter;
