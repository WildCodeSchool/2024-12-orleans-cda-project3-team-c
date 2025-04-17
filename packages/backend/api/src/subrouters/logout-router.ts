// POST LOGOUT**************************************************
import express from 'express';

const userLogout = express.Router();

userLogout.post('/', function (req, res) {
  try {
    res.clearCookie('token');
    res.json({ ok: true });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal logout server error' });
  }
});

export default userLogout;
