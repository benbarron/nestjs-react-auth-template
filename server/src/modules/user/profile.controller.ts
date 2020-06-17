import {
  Controller,
  Post,
  UseInterceptors,
  Res,
  UploadedFile,
  Inject,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { Response } from 'express';
import { ChangePasswordDTO } from './profile.dto';
import { User } from './user.entity';
import { ProfileInfoDTO } from './profile.dto';

@Controller('/api/profile')
export class ProfileController {
  @Inject() profileService: ProfileService;

  @Post('/image')
  @UseInterceptors(FileInterceptor('profile-image'))
  async uploadProfileImage(@UploadedFile() image, @Res() res: Response) {
    const user: User = await this.profileService.uploadProfileImage(
      image,
      res.locals.user.id,
    );
    return res.json({
      message: 'Your profile image has successfully been changed.',
      user,
    });
  }

  @Post('/password')
  async changePassword(@Body() body: ChangePasswordDTO, @Res() res: Response) {
    await this.profileService.changePassword(body, res.locals.user.id);
    return res.json({ message: 'Your password has successully been updated.' });
  }

  @Post('/info')
  async updateProfileInfo(@Body() body: ProfileInfoDTO, @Res() res: Response) {
    const user: User = await this.profileService.updateProfileInformation(
      body,
      res.locals.user.id,
    );
    return res.json({ message: 'Your profile has been updated.', user });
  }

  @Post('/dark-mode')
  async setDarkMode(
    @Body() body: { newDarkModeValue: boolean },
    @Res() res: Response,
  ) {
    await this.profileService.setDarkMode(
      body.newDarkModeValue,
      res.locals.user.id,
    );
    return res.json({ message: 'Updated successfully.' });
  }
}
