import { Injectable } from '@nestjs/common';
import { DynamoDBClient, PutItemCommand, GetItemCommand, AttributeValue } from '@aws-sdk/client-dynamodb';
import { ConfigService } from '@nestjs/config';
import { BaseProvider } from '../base.provider';

/**
 * AWS DynamoDB Provider for NoSQL database operations.
 * Fully functional implementation using AWS SDK v3.
 */
@Injectable()
export class DynamoDBProvider extends BaseProvider {
    private client: DynamoDBClient;

    constructor(private configService: ConfigService) {
        super(DynamoDBProvider.name);
        this.client = new DynamoDBClient({
            region: this.configService.get<string>('AWS_REGION'),
            endpoint: this.configService.get<string>('AWS_ENDPOINT'),
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') || 'dummy',
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || 'dummy',
            },
        });
    }

    /**
     * Persist an item in a specific DynamoDB table.
     */
    async putItem(tableName: string, item: Record<string, AttributeValue>) {
        this.logOperation('putItem', { tableName });
        try {
            const command = new PutItemCommand({
                TableName: tableName,
                Item: item,
            });
            return await this.client.send(command);
        } catch (error) {
            this.handleError('putItem', error);
        }
    }

    /**
     * Retrieve an item from a specific DynamoDB table using its key.
     */
    async getItem(tableName: string, key: Record<string, AttributeValue>) {
        this.logOperation('getItem', { tableName });
        try {
            const command = new GetItemCommand({
                TableName: tableName,
                Key: key,
            });
            return await this.client.send(command);
        } catch (error) {
            this.handleError('getItem', error);
        }
    }
}
