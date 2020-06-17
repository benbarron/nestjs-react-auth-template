import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { getUserPayload } from '../../utils/getUserPayload';
import * as jwt from 'jsonwebtoken';
import { User } from './user.entity';

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    let accessToken: string | undefined = req.header('access-token') || '';
    let refreshToken: string | undefined = req.header('refresh-token') || '';

    try {
      const accessDecoded: any = jwt.verify(accessToken, String(process.env.JWT_ACCESS_SECRET));
      res.locals.user = accessDecoded;
      next();
    } catch (e1) {
      try {
        const refreshDecoded: any = jwt.verify(refreshToken, String(process.env.JWT_REFRESH_SECRET));
        const user: User | undefined = await User.findOne({ id: refreshDecoded.id });

        if (!user) throw Error('User not found.');
        if (user.refreshTokenStep != refreshDecoded.refreshTokenStep) throw Error('Token has been revoked.');

        const newAccessToken: string = jwt.sign(getUserPayload(user), String(process.env.JWT_ACCESS_SECRET), { expiresIn: String(process.env.JWT_ACCESS_LIFETIME) });
        res.setHeader('new-access-token', newAccessToken);
        res.locals.user = user;
        next();
      } catch (e2) {
        return res.status(401).json({ message: 'Unauthorized.' });
      }
    }
  }
}
