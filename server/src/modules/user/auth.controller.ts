import { Controller, Get, Body, Req, Res, Post, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from './user.entity';
import { getUserPayload } from '../../utils/getUserPayload';
import { AuthService } from './auth.service';
import * as jwt from 'jsonwebtoken';
import { LoginDTO } from './auth.dto';
import { RegisterDTO } from './auth.dto';
import { SendResetEmailDTO } from './auth.dto';
import { PasswordResetDTO } from './auth.dto';

@Controller('/api/auth')
export class AuthController {
  @Inject() authService: AuthService;

  @Get('/user')
  public getAuthenticatedUser(@Res() res: Response) {
    return res.json({ user: res.locals.user });
  }

  @Post('/login')
  async login(@Body() body: LoginDTO, @Req() req: Request, @Res() res: Response) {
    const user: User = await this.authService.login(body, req);
    const accessToken: string = jwt.sign(getUserPayload(user), String(process.env.JWT_ACCESS_SECRET), { expiresIn: String(process.env.JWT_ACCESS_LIFETIME) });
    const refreshToken: string = jwt.sign(getUserPayload(user), String(process.env.JWT_REFRESH_SECRET), { expiresIn: String(process.env.JWT_REFRESH_LIFETIME) });
    return res.json({ message: 'Login sucessful', refreshToken, accessToken, user });
  }

  @Post('/register')
  async register(@Body() body: RegisterDTO, @Req() req: Request, @Res() res: Response) {
    const user: User = await this.authService.register(body, req);
    const accessToken: string = jwt.sign(getUserPayload(user), String(process.env.JWT_ACCESS_SECRET), { expiresIn: String(process.env.JWT_ACCESS_LIFETIME) });
    const refreshToken: string = jwt.sign(getUserPayload(user), String(process.env.JWT_REFRESH_SECRET), { expiresIn: String(process.env.JWT_REFRESH_LIFETIME) });
    return res.json({ message: 'User registration sucessful.', refreshToken, accessToken, user });
  }

  @Post('/password/send')
  async sendResetEmail(@Body() body: SendResetEmailDTO, @Res() res: Response) {
    await this.authService.sendPasswordResetEmail(body);
    return res.json({ message: `If an account exists with the email ${body.email} we will send an email with a key. Copy and paste that key into the input box below.` });
  }

  @Post('/password/reset')
  async resetPassword(@Body() body: PasswordResetDTO, @Res() res: Response) {
    await this.authService.resetPassword(body);
    return res.json({ message: 'Your password has successfully been updated. You can now login with your new password.' });
  }
}
