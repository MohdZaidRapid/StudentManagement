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
import { ClassNameDto } from './dto/className.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import {
  ApiResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

import { LocalAuthGuard } from '../auth/local-auth.guard';

@ApiTags('Student Model')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('class')
  createClass(@Body() createClassDto: ClassNameDto) {
    return this.studentService.createClass(createClassDto);
  }

  @Post()
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

  @Get()
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

  @Get(':id')
  @ApiOperation({ summary: 'Get a Single student by id' })
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
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
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return await this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
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
