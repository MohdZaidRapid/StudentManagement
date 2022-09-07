import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from '../student/student.service';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.studentService.getUserbyEmail(username);
    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(user: any) {
    // console.log(user._doc._id.toString());
    const payload = { id: user._doc._id.toString(), username: user._doc.name };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
