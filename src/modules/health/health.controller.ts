import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Health Controller to provide observability endpoints.
 * Used by load balancers and container orchestrators (K8s/AWS ECS).
 */
@ApiTags('monitoring')
@Controller('health')
export class HealthController {

    @Get()
    @ApiOperation({ summary: 'Liveness check' })
    @ApiResponse({ status: 200, description: 'Service is alive' })
    getHealth(): Record<string, string> {
        /* eslint-disable i18next/no-literal-string */
        return { status: 'ok', timestamp: new Date().toISOString() };
        /* eslint-enable i18next/no-literal-string */
    }

    @Get('ready')
    @ApiOperation({ summary: 'Readiness check' })
    @ApiResponse({ status: 200, description: 'Service is ready to handle traffic' })
    getReady(): Record<string, string> {
        /* eslint-disable i18next/no-literal-string */
        return { status: 'ready', uptime: process.uptime().toFixed(2) };
        /* eslint-enable i18next/no-literal-string */
    }
}
