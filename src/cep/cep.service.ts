import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CepService {

    private readonly logger = new Logger(CepService.name)

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) { }
    
    async fetchAllParallel(cep: string) {

        const [address, nationalize] = await Promise.all([
            this.getCep(cep),
            this.getNationalize(cep)
        ]);

        return {
            address,
            nationalize
        }

    }

    async fetchAll(cep: string) {

        
        const address = await this.getCep(cep);
        const nationalize = await this.getNationalize(address.localidade);

        return {
            address,
            nationalize
        }

    } 

    async getCep(cep: string) {

        try {
            const baseUrl = this.configService.get<string>('VIACEP_URL');
            const { data } = await firstValueFrom(
                this.httpService.get(`${baseUrl}/${cep}/json/`)
            );

            return data;
        } catch (error) {
            this.logger.error(`Falha ao consultar ViaCEP para o CEP ${cep}: ${error.stack}`);
            throw new HttpException('Erro ao consultar serviço de CEP', HttpStatus.SERVICE_UNAVAILABLE);
        }
        

    }

    async getNationalize(name: string) {

        try {
            const baseUrl = this.configService.get<string>('NATIONALIZE_URL');
            const { data } = await firstValueFrom(
                this.httpService.get(`${baseUrl}/?name=${name}`)
            );

            return data;
        } catch (error) {
            this.logger.error(`Falha ao consultar Nacionalize para o nome ${name}: ${error.stack}`);
            throw new HttpException('Erro ao consultar serviço de Nacionalidade', HttpStatus.SERVICE_UNAVAILABLE);
        }
        
    }


}
