import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module.js';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'Media';
  const logger = new Logger('SearchBoostrap');
  const rmqUrl = process.env.RABBITMQ_URL ?? "amqp://localhost:5672";
  const queue = process.env.MEDIA_QUEUE ?? 'catalog_queue';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SearchModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl],
        queue,
        queueOptions: {
          durable: true
        }
      }
    }
  );
  app.enableShutdownHooks();
  app.listen();
  await logger.log('Search microservice (TCP) listening on port ${port}');
}
await bootstrap();
