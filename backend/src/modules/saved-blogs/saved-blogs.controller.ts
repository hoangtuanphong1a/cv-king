import {
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Query,
  Req,
  UseGuards,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { SavedBlogsService } from './saved-blogs.service';
import { SavedBlogQueryDto } from './dtos/saved-blog-query.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { SavedBlog } from '../../entities/saved-blog.entity';

@ApiTags('saved-blogs')
@Controller('saved-blogs')
@UseGuards(AuthGuard('jwt'))
@Roles('User')
export class SavedBlogsController {
  constructor(private readonly savedBlogsService: SavedBlogsService) {}

  @Post(':blogPostId')
  async saveBlog(
    @Param('blogPostId', ParseUUIDPipe) blogPostId: string,
    @Req() req
  ): Promise<ApiResponse<SavedBlog>> {
    const saved = await this.savedBlogsService.saveBlog(blogPostId, req.user);
    return {
      status: 'success',
      message: 'Blog saved successfully',
      data: saved,
    };
  }

  @Get()
  async findAll(
    @Query(ValidationPipe) query: SavedBlogQueryDto,
    @Req() req
  ): Promise<ApiResponse<{ savedBlogs: SavedBlog[]; total: number }>> {
    const result = await this.savedBlogsService.findAll(query, req.user);
    return {
      status: 'success',
      message: 'Successfully retrieved saved blogs',
      data: result,
      meta: {
        count: result.total,
        page: query.page ?? 1,
        limit: query.limit ?? 10,
      },
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req
  ): Promise<ApiResponse<SavedBlog>> {
    const item = await this.savedBlogsService.findOne(id, req.user);
    return {
      status: 'success',
      message: 'Successfully retrieved saved blog',
      data: item,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req
  ): Promise<ApiResponse<null>> {
    await this.savedBlogsService.remove(id, req.user);
    return {
      status: 'success',
      message: 'Saved blog removed successfully',
      data: null,
    };
  }

  @Delete('blog/:blogPostId')
  async removeByBlogId(
    @Param('blogPostId', ParseUUIDPipe) blogPostId: string,
    @Req() req
  ): Promise<ApiResponse<null>> {
    await this.savedBlogsService.removeByBlogId(blogPostId, req.user);
    return {
      status: 'success',
      message: 'Saved blog removed successfully',
      data: null,
    };
  }

  @Get('blog/:blogPostId/check')
  async isBlogSaved(
    @Param('blogPostId', ParseUUIDPipe) blogPostId: string,
    @Req() req
  ): Promise<ApiResponse<{ isSaved: boolean }>> {
    const isSaved = await this.savedBlogsService.isBlogSaved(blogPostId, req.user);
    return {
      status: 'success',
      message: 'Saved blog status',
      data: { isSaved },
    };
  }
}
