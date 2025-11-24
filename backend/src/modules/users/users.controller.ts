import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ValidationPipe,
  ParseUUIDPipe,
  Put,
  ParseIntPipe,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '@modules/users/dtos/user.dto';
import { Users } from '@entities/user.entity';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { Roless } from '@modules/auth/guards/roles.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // @Get('my-profile')
  // @UseGuards(JwtAuthGuard)
  // async getMyProfile(@Req() req: any): Promise<ApiResponse<Partial<Users>>> {
  //   const userId = req.user.sub;
  //   const data = await this.usersService.getUserById(userId);
  //   return { status: 'success', message: 'User profile fetched', data };
  // }
  @Get('my-profile')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(
    @Req() req: any
  ): Promise<ApiResponse<Partial<Users>>> {
    console.log('req.user', req.user); // thêm log
    const userId = req.user.sub;
    if (!userId) throw new NotFoundException('No userId in JWT');


    const data = await this.usersService.getSafeUserById(userId);
    return { status: 'success', message: 'User profile fetched', data };
  }



  @Put('my-profile')
  @UseGuards(JwtAuthGuard)
  async updateMyProfile(
    @Req() req: any,
    @Body(ValidationPipe) dto: UpdateUserDto,
  ): Promise<ApiResponse<Users>> {
    const userId = req.user.sub;
    const data = await this.usersService.update(userId, dto);
    return { status: 'success', message: 'User profile updated', data };
  }

  /**
   * Retrieve all users
   * @returns List of all users wrapped in ApiResponse
   */
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roless('Admin')
  async findAll(): Promise<ApiResponse<Users[]>> {
    const users = await this.usersService.getAllUsers();
    return {
      status: 'success',
      message: 'Successfully retrieved all users',
      data: users,
      meta: { count: users.length },
    };
  }

  /**
   * Find a user by ID
   * @param id ID of the user
   * @returns User wrapped in ApiResponse
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roless('Admin', 'JobSeeker')
  async findOne(
    @Param('id', ParseIntPipe) id: string
  ): Promise<ApiResponse<Partial<Users>>> {
    const user = await this.usersService.getUserById(id);
    return {
      status: 'success',
      message: 'Successfully retrieved user',
      data: user,
    };
  }



  /**
   * Create a new user
   * @param createUserDto Data to create the user
   * @returns Created user wrapped in ApiResponse
   */
  @Post()
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto
  ): Promise<ApiResponse<any>> {
    const user = await this.usersService.createUser(createUserDto);
    return {
      status: 'success',
      message: 'User created successfully',
      data: user,
    };
  }

  /**
   * Update a user
   * @param updateUserDto Data to update the user
   * @returns Updated user wrapped in ApiResponse
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roless('Admin')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: UpdateUserDto
  ): Promise<ApiResponse<Users>> {
    const user = await this.usersService.update(id, dto);
    return {
      status: 'success',
      message: 'User updated successfully',
      data: user,
    };
  }

  /**
   * Delete a user
   * @param id ID of the user to delete
   * @returns Success message wrapped in ApiResponse
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roless('Admin')
  async remove(
    @Param('id', ParseIntPipe) id: string
  ): Promise<ApiResponse<boolean>> {
    await this.usersService.delete(id);
    return {
      status: 'success',
      message: 'User deleted successfully',
      data: true,
    };
  }
}
