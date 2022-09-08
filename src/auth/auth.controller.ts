import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'; 

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth Model')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({
    summary: 'Authenticate student on the basics of credentials',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'example@gmail.com',
          description: 'email of student',
        },
        password: {
          type: 'string',
          example: 'Enter student password',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'JWT Access Token' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({
    summary: 'Return Currently authenticated user by paassing jwt token in',
  })
  @ApiHeader({ name: 'x-Bearer JwtToken', description: 'Authorization Token' })
  @ApiResponse({
    status: 200,
    description: 'information of currently logged in user',
  })
  @ApiBadRequestResponse({
    status: 401,
    description: 'Please authenticate to acccess this route ',
  })
  async getProfile(@Request() req) {
    return req.user;
  }
}
