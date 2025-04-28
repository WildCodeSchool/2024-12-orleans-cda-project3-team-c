// POST LOGOUT**************************************************
import express from 'express';

const logoutRouter = express.Router();

logoutRouter.post('/', function (req, res) {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ ok: true });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal logout server error' });
  }
});

export default logoutRouter;
