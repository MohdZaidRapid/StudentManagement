import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from '../StudentInterace/studen.interface';

import { Model } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private studentModel: Model<Student>) {}
  create(createStudentDto: CreateStudentDto) {
    const model = new this.studentModel();

    model.name = createStudentDto.name;
    model.rollNo = createStudentDto.rollNo;
    model.standard = createStudentDto.standard;
    model.noOfSubject = createStudentDto.noOfSubject;
    model.email = createStudentDto.email;
    model.password = createStudentDto.password;
    return model.save();
  }

  findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  findOne(id: string): Promise<Student> {
    return this.studentModel.findById(id).exec();
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentModel
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
  }

  remove(id: string) {
    return this.studentModel.deleteOne({ _id: id }).exec();
  }
}
