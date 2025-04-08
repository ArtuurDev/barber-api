import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadAttachmentsUseCase } from "services/barber-shop-service-api/src/domain/clients/application/use-cases/upload-attachments";

@Controller('/attachments')
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

      const attachment = await this.uploadAttachmentsUseCase.execute({
        body: file.buffer,
        fileName: file.filename,
        fileType: file.mimetype
      })

      return {
        attachmentid: attachment.value._id.toValue
      }

    }

}