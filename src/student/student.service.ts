import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './schema/student.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}
  create(createStudentDto: CreateStudentDto): Promise<Student> {
    const model = new this.studentModel();
    model.name = createStudentDto.name;
    model.rollNo = createStudentDto.rollNo;
    model.standard = createStudentDto.standard;
    model.noOfSubject = createStudentDto.noOfSubject;
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
        },
      )
      .exec();
  }

  remove(id: string) {
    return this.studentModel.deleteOne({ _id: id }).exec();
  }
}
