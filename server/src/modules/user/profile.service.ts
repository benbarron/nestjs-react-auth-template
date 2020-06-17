import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { ChangePasswordDTO } from './profile.dto';
import { ProfileInfoDTO } from './profile.dto';

@Injectable()
export class ProfileService {
  public uploadProfileImage = async (
    image: any,
    userId: string,
  ): Promise<User> => {
    if (!image) {
      throw new HttpException(
        'Please upload an image.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: User | undefined = await User.findOne({ id: userId });
    if (!user) {
      throw new HttpException('Unathorized', HttpStatus.UNAUTHORIZED);
    }

    const fileName: string = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    const fileExt: string = image['mimetype'].split('/')[1];
    fs.writeFileSync(
      `${process.cwd()}/public/storage/profile_images/${fileName}.${fileExt}`,
      image.buffer,
    );

    if (user.profileImage) {
      try {
        fs.unlinkSync(process.cwd() + '/public' + user.profileImage);
      } catch (e) {}
    }
    user.profileImage = `/storage/profile_images/${fileName}.${fileExt}`;
    return await user.save();
  };

  public changePassword = async (
    data: ChangePasswordDTO,
    userId: string,
  ): Promise<void> => {
    if (!data.newPassword || !data.oldPassword) {
      throw new HttpException(
        'Please enter all fields.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: User | undefined = await User.createQueryBuilder()
      .addSelect('User.password')
      .where('email = :email', { id: userId })
      .getOne();

    if (!user) {
      throw new HttpException('Unathorized', HttpStatus.UNAUTHORIZED);
    }

    if (!(await bcrypt.compare(data.oldPassword, user.password))) {
      throw new HttpException(
        'Please enter the correct old password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(data.newPassword, salt);
    await user.save();
  };

  updateProfileInformation = async (
    data: ProfileInfoDTO,
    userId: string,
  ): Promise<User> => {
    if (!data.firstname || !data.lastname || !data.email) {
      throw new HttpException(
        'Firstname, lastname and email are required fields.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user: User | undefined = await User.createQueryBuilder()
      .where('id = :id', { id: userId })
      .getOne();
    if (!user) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }
    user.firstname = data.firstname;
    user.lastname = data.lastname;
    user.email = data.email;
    user.city = data.city;
    user.bio = data.bio;
    user.state = data.state;
    await user.save();
    return user;
  };

  setDarkMode = async (newValue: boolean, userId: string): Promise<void> => {
    await User.update({ id: userId }, { darkMode: newValue });
  };
}
