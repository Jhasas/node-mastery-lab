import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CepService {

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService

    ) { }
    

    async fetchAll(cep: string) {

        
        const address = await this.getCep(cep);
        const nationalize = await this.getNationalize(address.localidade);

        return {
            address,
            nationalize
        }

    } 

    async getCep(cep: string) {

        const baseUrl = this.configService.get<string>('VIACEP_URL');
        const { data } = await firstValueFrom(
            this.httpService.get(`${baseUrl}/${cep}/json/`)
        );

        return data;
    }

    async getNationalize(name: string) {

        const baseUrl = this.configService.get<string>('NATIONALIZE_URL');
        const { data } = await firstValueFrom(
            this.httpService.get(`${baseUrl}/?name=${name}`)
        );

        return data;
    }


}
