import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CepModule } from './cep/cep.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CepModule, ConfigModule.forRoot({ 
    isGlobal: true, 
    envFilePath: `.env.${process.env.NODE_ENV || 'development'}`
   })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
