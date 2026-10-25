import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module.js';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'Media';
  const logger = new Logger('SearchBoostrap');
  const port = Number(process.env.SEARCH_TCP_PORT ?? 4012);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SearchModule,
    {
      transport: Transport.TCP,
      options:{
        host: '0.0.0.0',
        port
      }
    }
  );
  app.enableShutdownHooks();
  app.listen();
  await logger.log('Search microservice (TCP) listening on port ${port}');
}
await bootstrap();
