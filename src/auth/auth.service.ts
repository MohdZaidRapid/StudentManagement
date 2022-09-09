import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from '../student/student.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.studentService.getAdminAccess(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      console.log(user);
      return result;
    }
    throw new BadRequestException('Invalid credentials');
  }

  async login(user: any) {
    // console.log(user._doc._id.toString());
    const payload = { id: user._doc._id.toString() };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
