import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ChangePasswordDto } from './dto/change.password.dto';
import { ApiTags, ApiOperation,  ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@Controller()
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up to the app' })
  @ApiBody({
    schema: {
      properties: {
        nickname: {
          type: 'string',
          example: 'Test User',
        },
        email: {
          type: 'string',
          example: 'user@test.com',
        },
        password: {
          type: 'string',
          example: 'Passw0rd',
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Successfully created account.' ,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
            description: '',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
          },
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid nickname, email or password' })
  @ApiResponse({ status: 409, description: 'This email address is already registered.' })
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  @ApiOperation({summary: 'Log in to the app'})
  @ApiBody({
    schema: {
      properties: {
        email: {
          type: 'string',
          example: 'user@test.com',
        },
        password: {
          type: 'string',
          example: 'Passw0rd',
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Successfully logged in.' ,
  schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          description: '',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        },
      }
    }
  }
})
  @ApiResponse({ status: 400, description: 'Invalid email or password.' })
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('change-password')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({summary: 'Change your current password.'})
  @ApiBody({
    schema: {
      properties: {
        oldPassword: {
          type: 'string',
          example: 'Passw0rd',
        },
        newPassword: {
          type: 'string',
          example: 'Qwerty12',
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Password changed successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid old password.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req): Promise<{ message: string }>  {
    return await this.authService.changePassword(req.user._id, changePasswordDto);
  }
}
