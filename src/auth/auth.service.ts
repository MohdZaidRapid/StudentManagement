import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from '../student/student.service';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    private jwtservice: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.studentService.getUserbyEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.name, id: user._id };
    return {
      access_token: this.jwtservice.sign(payload),
    };
  }
}
