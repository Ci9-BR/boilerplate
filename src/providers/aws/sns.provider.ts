import { Injectable } from '@nestjs/common';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { ConfigService } from '@nestjs/config';
import { BaseProvider } from '../base.provider';

/**
 * AWS SNS Provider for pub/sub notification operations.
 * Fully functional implementation using AWS SDK v3.
 */
@Injectable()
export class SNSProvider extends BaseProvider {
    private client: SNSClient;

    constructor(private configService: ConfigService) {
        super(SNSProvider.name);
        this.client = new SNSClient({
            region: this.configService.get<string>('AWS_REGION'),
            endpoint: this.configService.get<string>('AWS_ENDPOINT'),
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') || 'dummy',
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || 'dummy',
            },
        });
    }

    /**
     * Publish a notification message to a specific SNS topic.
     */
    async publish(topicArn: string, message: Record<string, unknown>) {
        this.logOperation('publish', { topicArn });
        try {
            const command = new PublishCommand({
                TopicArn: topicArn,
                Message: JSON.stringify(message),
            });
            return await this.client.send(command);
        } catch (error) {
            this.handleError('publish', error);
        }
    }
}
