import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Request } from 'express';
import { User } from './user.entity';
import { ActivityLog } from './../shared/activity-log.entity';
import { ActivityLogService } from '../shared/activity-logs.service';
import { MailService } from '../shared/mail.service';
import { LoginDTO } from './auth.dto';
import { RegisterDTO } from './auth.dto';
import { SendResetEmailDTO } from './auth.dto';
import { PasswordResetDTO } from './auth.dto';
import { loginEmailHtmlTemplate } from '../../utils/loginEmailHtmlTemplate';
import * as bcrypt from 'bcryptjs';
import { getUserPayload } from 'src/utils/getUserPayload';

@Injectable()
export class AuthService {
  @Inject() activityLogService: ActivityLogService;
  @Inject() mailService: MailService;

  public login = async (data: LoginDTO, req: Request, testing: boolean = false): Promise<User> => {
    if (!data.email || !data.password) {
      throw new HttpException('Please enter all fields', HttpStatus.BAD_REQUEST);
    }

    const user: User | undefined = await User.createQueryBuilder().addSelect('User.password').where('email = :email', { email: data.email }).getOne();
    if (!user) throw new HttpException('Invalid Details', HttpStatus.BAD_REQUEST);

    if (!(await user.validatePassword(data.password))) {
      await this.activityLogService.save(req, user.id, 'LOGIN_ERROR');
      throw new HttpException('Invalid Details', HttpStatus.BAD_REQUEST);
    }

    const log: ActivityLog | null = await this.activityLogService.save(req, user.id, 'LOGIN_SUCCESS');
    const logins: ActivityLog[] = await this.activityLogService.find({ actionType: 'LOGIN_SUCCESS', userAgent: req.headers['user-agent'], userId: user.id });
  
    if (logins.length <= 1) {
      this.mailService.send(user.email, 'Login attempt', loginEmailHtmlTemplate(log.city, log.region, log.userAgent));
    }
    
    delete user.password;
    return user;
  };

  public register = async (data: RegisterDTO, req: Request): Promise<User> => {
    if (!data.firstname || !data.lastname || !data.email || !data.password) {
      throw new HttpException('Please enter all fields', HttpStatus.BAD_REQUEST);
    }

    try {
      const user: User = await User.create(data).save();
      const log: ActivityLog | null = await this.activityLogService.save(req, user.id, 'LOGIN_SUCCESS');
      return user;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new HttpException('Email address is already taken.', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Internal server error.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  };

  public sendPasswordResetEmail = async (data: SendResetEmailDTO): Promise<void> => {
    if (!data.email) {
      throw new HttpException('Please enter an email address.', HttpStatus.BAD_REQUEST);
    }

    const user: User | undefined = await User.findOne({ email: data.email });
    if (user) {
      try {
        const resetToken: string = Array(10)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        user.passwordResetToken = resetToken;
        user.refreshTokenStep += 1;
        await this.mailService.send(
          data.email,
          'Reset Password Instructions.',
          `Your key is ${resetToken}`,
        );
        await user.save();
      } catch (e) {
        console.log(e);
      }
    }
  };

  public resetPassword = async (data: PasswordResetDTO): Promise<void> => {
    if (!data.resetToken || !data.newPassword) {
      throw new HttpException(
        'Please provide both a token and a new password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: User | undefined = await User.findOne({
      passwordResetToken: data.resetToken,
    });
    if (!user) {
      throw new HttpException(
        'The token you entered is not valid.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      user.password = await bcrypt.hash(data.newPassword, 10);
      user.passwordResetToken = '';
      user.refreshTokenStep += 1;
      await user.save();
    } catch (e) {
      throw new HttpException(
        'There was an error updating your password.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  };
}
