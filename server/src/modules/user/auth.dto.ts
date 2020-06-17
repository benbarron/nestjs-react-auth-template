export class LoginDTO {
  email: string;
  password: string;
}

export class PasswordResetDTO {
  resetToken: string;
  newPassword: string;
}

export class RegisterDTO {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export class SendResetEmailDTO {
  email: string;
}
