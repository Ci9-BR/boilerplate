import { Injectable } from '@nestjs/common';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { ConfigService } from '@nestjs/config';
import { BaseProvider } from '../base.provider';

/**
 * AWS Secrets Manager Provider for secure credential retrieval.
 * Fully functional implementation using AWS SDK v3.
 */
@Injectable()
export class SecretsManagerProvider extends BaseProvider {
  private client: SecretsManagerClient;

  constructor(private configService: ConfigService) {
    super(SecretsManagerProvider.name);
    this.client = new SecretsManagerClient({
      region: this.configService.get<string>('AWS_REGION'),
      endpoint: this.configService.get<string>('AWS_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') || 'dummy',
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || 'dummy',
      },
    });
  }

  /**
   * Retrieve a secret value by its name.
   * Parses the SecretString as JSON.
   */
  async getSecret(secretName: string): Promise<Record<string, unknown> | null> {
    this.logOperation('getSecret', { secretName });
    try {
      const command = new GetSecretValueCommand({ SecretId: secretName });
      const response = await this.client.send(command);

      if ('SecretString' in response && response.SecretString) {
        return JSON.parse(response.SecretString) as Record<string, unknown>;
      }
      return null;
    } catch (error) {
      this.handleError('getSecret', error);
    }
  }
}
