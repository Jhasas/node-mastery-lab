import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidarCepPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(/^\d{8}$/.test(value)) {
      return value;
    } else {
      throw new BadRequestException('CEP deve conter exatamente 8 dígitos numéricos');
    }
  }
}
