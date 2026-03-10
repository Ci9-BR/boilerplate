import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

/**
 * Health Module for application monitoring.
 */
@Module({
    controllers: [HealthController],
})
export class HealthModule { }
