import { AdminDto } from './dto/admin.dto';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './StudentInterace/studen.interface';
import { Admin } from './StudentInterace/admin.interface';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student') private studentModel: Model<Student>,
    @InjectModel('admin') private adminModel: Model<Admin>,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    if (await this.studentModel.findOne({ email: createStudentDto.email })) {
      throw new ConflictException('Email already exist');
    }
    const hashedPassword = await bcrypt.hash(createStudentDto.password, 12);
    createStudentDto.password = hashedPassword;
    const model = await new this.studentModel(createStudentDto);

    // model.name = createStudentDto.name;
    // model.rollNo = createStudentDto.rollNo;
    // model.standard = createStudentDto.standard;
    // model.noOfSubject = createStudentDto.noOfSubject;
    // model.email = createStudentDto.email;
    // model.password = createStudentDto.password;

    return await model.save();
  }

  async createAdmin(adminDto: AdminDto) {
    if (await this.adminModel.findOne({ email: adminDto.email })) {
      throw new ConflictException('Admin Already exists');
    } else if ((await this.adminModel.countDocuments({})) > 0) {
      throw new ConflictException('Admin already available in db');
    }
    const hashedPassword = await bcrypt.hash(adminDto.password, 12);
    adminDto.password = hashedPassword;
    const model = await new this.adminModel(adminDto);

    return await model.save();
  }

  findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async getUserbyEmail(email: string) {
    return await this.studentModel.findOne({ email: email }).exec();
  }

  async getAdminAccess(email: string) {
    return this.adminModel.findOne({ email: email }).exec();
  }

  async findOne(id: string): Promise<Student> {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await this.studentModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User Not Found');
      } else {
        return user;
      }
    } else {
      throw new NotFoundException('User Not Found');
    }
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await this.studentModel
        .updateOne(
          { _id: id },
          {
            name: updateStudentDto.name,
            rollNo: updateStudentDto.rollNo,
            standard: updateStudentDto.standard,
            noOfSubject: updateStudentDto.noOfSubject,
            email: updateStudentDto.email,
            password: updateStudentDto.password,
          },
        )
        .exec();
      return user;
    } else {
      throw new NotFoundException('User Not Found');
    }
  }

  async remove(id: string) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await this.studentModel.deleteOne({ _id: id }).exec();

      if (user.deletedCount < 1) {
        throw new NotFoundException('User Not Found');
      } else {
        return user;
      }
    } else {
      throw new NotFoundException('User Not Found');
    }
  }
}
