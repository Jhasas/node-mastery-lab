import { Controller, Get, Param } from '@nestjs/common';
import { CepService } from './cep.service';
import { ValidarCepPipe } from './validar-cep/validar-cep.pipe';

@Controller('cep')
export class CepController {

    constructor(private readonly cepService: CepService) { }

    @Get(':cep')
    async fetch(@Param('cep', ValidarCepPipe) cep: string) {
        return await this.cepService.fetchAll(cep)
    }
}
