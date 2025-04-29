import express from 'express';

import loginRouter from './login-router';
import logoutRouter from './logout-router';
import registerRouter from './register-router';

const authRouter = express.Router();

authRouter.use('/register', registerRouter);
authRouter.use('/login', loginRouter);
authRouter.use('/logout', logoutRouter);

export default authRouter;
