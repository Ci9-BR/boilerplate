import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

/**
 * Global Exception Filter to catch and handle all application errors.
 * Strictly complies with Global Rules:
 * - Logs errors/warnings to storage/log folder.
 * - Standardizes error response format.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    /* eslint-disable i18next/no-literal-string */
    const message =
      exception instanceof HttpException ? exception.getResponse() : 'Internal server error';
    /* eslint-enable i18next/no-literal-string */

    // Log to file as per rule: storage/log
    /* eslint-disable i18next/no-literal-string */
    const logDir = join(process.cwd(), 'storage', 'log');
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }

    const logMessage = `[${new Date().toISOString()}] ${request.method} ${request.url} - Status: ${status} - Error: ${JSON.stringify(message)}\n`;
    appendFileSync(join(logDir, 'error.log'), logMessage);
    /* eslint-enable i18next/no-literal-string */

    this.logger.error(logMessage);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
