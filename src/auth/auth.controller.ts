import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ChangePasswordDto } from './dto/change.password.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Get('login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('change-password')
  @UseGuards(AuthGuard())
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req): Promise<{ message: string }>  {
    return await this.authService.changePassword(req.user._id, changePasswordDto);
  }
}
