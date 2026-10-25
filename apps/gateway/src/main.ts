import { NestFactory } from "@nestjs/core";
import { GatewayModule } from "./gateway.module.js";
import { Logger } from "@nestjs/common";

async function bootstrap() {
   process.title = "gateway";
   const logger = new Logger("GatewayBootstrap");
   const app = await NestFactory.create(GatewayModule);
   //if the app is asked to shutdown, run the necessary cleanup steps before existing 
   //Cleanup = closing connections and releasing resources before the application finishes stopping.
   app.enableShutdownHooks(); 
   const port = Number(process.env.GATEWAY_PORT ?? 3000);
   await app.listen(port);
   logger.log(`Gateway running at port ${port}`);

}
bootstrap();