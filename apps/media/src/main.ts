import { NestFactory } from "@nestjs/core";
import { MediaModule } from "./media.module.js";
import { Logger } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";


async function bootstrap() {
  process.title = 'media';
  const logger = new Logger('MediaBootstrap');
  const rmqUrl = process.env.RABBITMQ_URL ?? "amqp://localhost:5672";
  const queue = process.env.MEDIA_QUEUE ?? 'catalog_queue';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MediaModule,
    {
      transport: Transport.RMQ,
      options:{
        urls: [rmqUrl],
        queue,
        queueOptions: {
          durable: true
        }
      }
    }
  );
  app.enableShutdownHooks();
  await app.listen();
  logger.log(`Media RMQ listening on queue ${queue} via ${rmqUrl}`);

}
bootstrap(); 