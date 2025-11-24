import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
    providers: [CloudinaryProvider, UploadService],
    controllers:[UploadController],
    exports: [CloudinaryProvider, UploadService],
})
export class CloudinaryModule { }
