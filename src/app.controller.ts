import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Root Controller for baseline application validation.
 */
@ApiTags('baseline')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Greeting endpoint' })
  @ApiResponse({ status: 200, description: 'Successful greeting' })
  getHello(): string {
    /* eslint-disable i18next/no-literal-string */
    return 'Hello World!';
    /* eslint-enable i18next/no-literal-string */
  }
}
