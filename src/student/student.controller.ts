import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import {
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

import { AdminDto } from './dto/admin.dto';

@ApiTags('Student Model')
@Controller('')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('student')
  @ApiOperation({ summary: 'create new record' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'sonu',
          description: 'name of student',
        },
        email: {
          type: 'string',
          example: 'abc@gmail.com',
          description: 'email of student',
        },
        rollNo: {
          type: 'string',
          example: '21019-43-097',
          description: 'rollNo of student',
        },
        noOfSubject: {
          type: 'integer',
          example: 3,
          description: 'No of subjects student have',
        },
        password: {
          type: 'string',
          example: 'name1234',
          description:
            'password must be not be less than 4 or greater than 10 digits',
        },
        standard: {
          type: 'string',
          example: '4th or 5',
          description: 'In which class student have',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'saved to database',
  })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Post('admin')
  @ApiOperation({ summary: 'Create Admin' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'email=admin@gmail.com',
          description: 'Login admin',
        },
        password: {
          type: 'string',
          example: 'password=admin',
          description: 'Login admin',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'return jwt token to access restrict route',
  })
  createAdmin(@Body() adminDto: AdminDto) {
    return this.studentService.createAdmin(adminDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('student')
  @ApiOperation({ summary: 'Get all student Data from api' })
  @ApiResponse({
    description: 'All student data list',
    status: 200,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  findAll() {
    const users = this.studentService.findAll();
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Get('student/:id')
  @ApiOperation({ summary: 'Get a Single student by id' })
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('student/:id')
  @ApiOperation({ summary: 'update the record ' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter student id',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        name: {
          type: 'string',
          example: 'sonu',
          description: 'name of student',
        },
        email: {
          type: 'string',
          example: 'abc@gmail.com',
          description: 'email of student',
        },
        rollNo: {
          type: 'string',
          example: '21019-43-097',
          description: 'rollNo of student',
        },
        noOfSubject: {
          type: 'integer',
          example: 3,
          description: 'No of subjects student have',
        },
        password: {
          type: 'string',
          example: 'weert454545',
          description:
            'password must be not be less than 4 or greater than 10 digits',
        },
        standard: {
          type: 'string',
          example: '4th or 5',
          description: 'In which class student have',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'updated....',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return await this.studentService.update(id, updateStudentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('student/:id')
  @ApiOperation({ summary: 'delete the record' })
  @ApiParam({
    name: 'id',
    description: 'enter unique id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'deleted the record',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
