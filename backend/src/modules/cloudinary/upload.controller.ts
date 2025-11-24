import {
    Controller,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
    Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const result = await this.uploadService.uploadFile(file);
        return {
            url: result['secure_url'],
            public_id: result['public_id'], // lưu vào DB để sau này xoá/sửa
        };
    }

    @Put()
    @UseInterceptors(FileInterceptor('file'))
    async updateFile(
        @UploadedFile() file: Express.Multer.File,
        @Body('publicId') publicId: string,
    ) {
        const result = await this.uploadService.updateFile(file, publicId);
        return {
            url: result['secure_url'],
            public_id: result['public_id'],
        };
    }
}
