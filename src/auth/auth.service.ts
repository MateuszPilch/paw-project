import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change.password.dto';
import { ForgotPasswordDto } from './dto/forgot.password.dto';
import { ResetPasswordDto } from './dto/reset.password.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {

    const {nickname, email, password } = signUpDto;
    const user = await this.userModel.findOne({ email });
  
    if (user) {
      throw new UnauthorizedException('This email address is already registered.');
    }

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userModel.create({
      nickname,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: newUser._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {

    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<{ message: string }>  {

    const { oldPassword, newPassword } = changePasswordDto;
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid old password');
    }

    user.password = await this.hashPassword(newPassword);
    await user.save();

    return { message: 'Password changed successfully' };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }>
  {
    const { email } = forgotPasswordDto;
    const token = Math.random().toString(20).substr(2,12);
    const url = 'http://localhost:3000/reset/${token}';

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset you password',
      html: '!!!Gratulacje użytkowniku!!! Wygrałeś Iphone S6. Kliknij w <a href="${url}"> link </a> i odbierz nagrodę już dziś!',
    })
    return { message: 'Check out your email' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }>
  {
    const { password } = resetPasswordDto;
    return ;
  }

  async hashPassword(password: string): Promise<string>
  {
    return bcrypt.hash(password, 14)
  }
}