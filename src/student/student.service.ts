import { ClassNameDto } from './dto/className.dto';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './StudentInterace/studen.interface';
import { className } from './StudentInterace/className.interface';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student') private studentModel: Model<Student>,
    @InjectModel('className') private classModel: Model<className>,
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
  async createClass(classNameDto: ClassNameDto) {
    const model = await new this.classModel(classNameDto);
    return await model.save();
  }

  findAll(): Promise<Student[]> {
    return this.studentModel.find().populate('className', 'className').exec();
  }

  async getUserbyEmail(email: string) {
    return await this.studentModel.findOne({ email: email }).exec();
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
