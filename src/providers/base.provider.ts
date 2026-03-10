import { Logger } from '@nestjs/common';

/**
 * Base abstract class for all infrastructure providers.
 * Enforces standardized logging, auditing, and common behavior.
 * Following SOLID (Dependency Inversion and Single Responsibility).
 */
export abstract class BaseProvider {
    protected readonly logger: Logger;

    constructor(providerName: string) {
        this.logger = new Logger(providerName);
    }

    /**
     * Standardized log for operation starts.
     */
    protected logOperation(operation: string, metadata?: Record<string, unknown>): void {
        this.logger.log(`Starting operation: ${operation} ${metadata ? JSON.stringify(metadata) : ''}`);
        this.recordMetric(`${operation}.count`, 1);
    }

    /**
     * Standardized error handling for all infrastructure calls.
     */
    protected handleError(operation: string, error: unknown): never {
        const errorMessage = error instanceof Error ? error.message : String(error);
        this.logger.error(`Failed operation: ${operation} - Error: ${errorMessage}`);
        this.recordMetric(`${operation}.error`, 1);
        throw error;
    }

    /**
     * Hook for performance/business metrics.
     * OpenTelemetry/CloudWatch ready.
     */
    protected recordMetric(name: string, value: number, tags: Record<string, string> = {}): void {
        // Placeholder for future Telemetry SDK integration
        // Example: this.telemetry.gauge(name, value, tags);
        void name; void value; void tags;
    }

    /**
     * Hook for starting distributed traces.
     */
    protected startTrace(name: string): unknown {
        // Placeholder for Span starting
        return { name };
    }
}
