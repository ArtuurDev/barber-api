import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { ZodError, ZodSchema  } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue
    } catch (error) {
        if(error instanceof ZodError) {
            return new BadRequestException(error.format())
        }
        if(error instanceof PrismaClientValidationError) {
          return error
        }
      return new BadRequestException(error)
    }
  }
}