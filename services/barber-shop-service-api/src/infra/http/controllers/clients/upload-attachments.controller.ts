import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadAttachmentsUseCase } from "services/barber-shop-service-api/src/domain/clients/application/use-cases/upload-attachments";
import { AuthGuard } from "../../auth/auth-guard";
import { Roles } from "../../auth/enum-role";

@Controller('/attachments')
@UseGuards(AuthGuard)
@Roles(['CLIENT', 'ADMIN'])
export class UploadController {

  constructor(
    private uploadAttachmentsUseCase: UploadAttachmentsUseCase) {
  }
    
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile(
        new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024, }), // 5mb
          new FileTypeValidator({ fileType: 'image/jpeg'}),
        ],
      }),  
    ) file: Express.Multer.File) {

      const {value} = await this.uploadAttachmentsUseCase.execute({
        body: file.buffer,
        fileName: file.originalname,
        fileType: file.mimetype
      })

      return {
        attachmentId: value.attachment._id.toValue
      }

    }

}