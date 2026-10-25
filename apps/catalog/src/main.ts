import { NestFactory } from "@nestjs/core";
import { CatalogModule } from "./catalog.module.js";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  process.title = 'catalog';
  const logger = new Logger('CatalogBootstrap');
  const port = Number(process.env.CATALOG_TCP_PORT ?? 4011);
  

}
bootstrap();