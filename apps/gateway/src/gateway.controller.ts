import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service.js';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) { }

  @Get('/health')
  async health() {
    const ping = async (serviceName: string, client: ClientProxy) => {
      try {
        const result = await firstValueFrom(
          client.send('service.ping', { from: 'gateway' })
        )
        return {
          ok: true,
          service: serviceName,
          result
        }
      } catch (err: any) {
        return {
          ok: false,
          service: serviceName,
          error: err?.message ?? 'unknow error'
        }
      }
    }
  }
}
