import jwt from 'jsonwebtoken';
import { logger } from './Logger.js';

class Response {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  SendResWithRefreshToken(req, res, user, body) {
    const token = jwt.sign(
      { userId: user.Id, email: user.Email, role: user.Role },
      process.env.SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    );
    // Set a cookie
    res.cookie('addictocode', token, {
      httpOnly: true,
      secure: true,
      // maxAge: 100 // 1 heure
      maxAge: process.env.MAX_AGE // 1 heure
    });

    // Set a header
    res.setHeader('x-addictocode-apikey', token);
    res.status(200).json(body);

    logger.info(req.app.locals.db, JSON.stringify({
      message: body,
      logging: {
        user: user,
        token: token,
        maxAge: process.env.MAX_AGE,
      }
    }));
  }

  SendResLogoutToken(res, body) {
    res.clearCookie('addictocode', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    });
    res.setHeader('x-addictocode-apikey', 'TOKEN EXPIRED');
    res.status(200).json(body);
  }

  SendRes(res, status, body) {
    res.status(status).json(body);
  }

}

const response = new Response();
export { response };
