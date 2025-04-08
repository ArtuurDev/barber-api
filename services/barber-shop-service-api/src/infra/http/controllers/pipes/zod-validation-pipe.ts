import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      if(metadata.type !== 'body') return value
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.format()); // Agora lançamos a exceção corretamente
      }
      throw new BadRequestException('Erro na validação dos dados'); // Evita expor detalhes sensíveis
    }
  }
}
