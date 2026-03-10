import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';
import { BaseProvider } from '../base.provider';

/**
 * AWS SQS Provider for message queuing operations.
 * Fully functional implementation using AWS SDK v3.
 */
@Injectable()
export class SQSProvider extends BaseProvider {
    private client: SQSClient;

    constructor(private configService: ConfigService) {
        super(SQSProvider.name);
        this.client = new SQSClient({
            region: this.configService.get<string>('AWS_REGION'),
            endpoint: this.configService.get<string>('AWS_ENDPOINT'),
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') || 'dummy',
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || 'dummy',
            },
        });
    }

    /**
     * Send a JSON message to a specific SQS queue.
     */
    async sendMessage(queueUrl: string, body: Record<string, unknown>) {
        this.logOperation('sendMessage', { queueUrl });
        try {
            const command = new SendMessageCommand({
                QueueUrl: queueUrl,
                MessageBody: JSON.stringify(body),
            });
            return await this.client.send(command);
        } catch (error) {
            this.handleError('sendMessage', error);
        }
    }
}
