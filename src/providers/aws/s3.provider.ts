import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { BaseProvider } from '../base.provider';

/**
 * AWS S3 Provider for cloud storage operations.
 * Fully functional implementation using AWS SDK v3.
 */
@Injectable()
export class S3Provider extends BaseProvider {
    private client: S3Client;

    constructor(private configService: ConfigService) {
        super(S3Provider.name);
        this.client = new S3Client({
            region: this.configService.get<string>('AWS_REGION'),
            endpoint: this.configService.get<string>('AWS_ENDPOINT'),
            forcePathStyle: true,
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') || 'dummy',
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || 'dummy',
            },
        });
    }

    /**
     * Upload a buffer to a specific S3 bucket.
     */
    async upload(bucket: string, key: string, body: Buffer) {
        this.logOperation('upload', { bucket, key });
        try {
            const command = new PutObjectCommand({ Bucket: bucket, Key: key, Body: body });
            return await this.client.send(command);
        } catch (error) {
            this.handleError('upload', error);
        }
    }

    /**
     * Retrieve an object from a specific S3 bucket.
     */
    async get(bucket: string, key: string) {
        this.logOperation('get', { bucket, key });
        try {
            const command = new GetObjectCommand({ Bucket: bucket, Key: key });
            return await this.client.send(command);
        } catch (error) {
            this.handleError('get', error);
        }
    }
}
