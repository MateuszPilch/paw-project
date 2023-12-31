import { BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { Settings } from './schemas/settings.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change.password.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {

    const {nickname, email, password } = signUpDto;
    const user = await this.userModel.findOne({ email });
  
    if (user) {
      throw new ConflictException('This email address is already registered.');
    }

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userModel.create({
      nickname,
      email,
      password: hashedPassword,
      settings: new Settings()
    });
    const token = this.jwtService.sign({ id: newUser._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {

    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password.');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<{ message: string }>  {

    const { oldPassword, newPassword } = changePasswordDto;
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid old password.');
    }

    user.password = await this.hashPassword(newPassword);
    
    await user.save();

    return { message: 'Password changed successfully.' };
  }

  async hashPassword(password: string): Promise<string>
  {
    return bcrypt.hash(password, 14)
  }
}