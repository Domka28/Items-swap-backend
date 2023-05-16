import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService
  ) {

  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  async register(
    @Body('userName') userName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.appService.create({
      userName,
      email,
      password: hashedPassword
    });

    delete user.password;
    return user;

  }
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response
  ) {

    const user = await this.appService.findOne({ where: { email: email } });
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException('invalid credentials')
    }

    const jwt = await this.jwtService.signAsync({ id: user.id })

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      "jwt": jwt,
      "userId": user.id,
      "userName": user.userName,
      "description": user.description,
      "avatar": user.avatar
    };
  }
  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.appService.findOne({ where: { id: data['id'] } });
      const { password, ...result } = user;
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt')
    return {
      message: 'success'
    }
  }
}


