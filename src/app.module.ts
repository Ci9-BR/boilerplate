import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MultiTenancyMiddleware } from './common/middlewares/multi-tenancy.middleware';
import { S3Provider } from './providers/aws/s3.provider';
import { SQSProvider } from './providers/aws/sqs.provider';
import { SNSProvider } from './providers/aws/sns.provider';
import { DynamoDBProvider } from './providers/aws/dynamodb.provider';
import { OpenAIProvider } from './providers/openai/openai.provider';
import { SecretsManagerProvider } from './providers/aws/secrets-manager.provider';
import { PrismaModule } from './common/prisma/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { AppController } from './app.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        HealthModule,
    ],
    controllers: [AppController],
    providers: [
        S3Provider,
        SQSProvider,
        SNSProvider,
        DynamoDBProvider,
        OpenAIProvider,
        SecretsManagerProvider,
    ],
    exports: [
        S3Provider,
        SQSProvider,
        SNSProvider,
        DynamoDBProvider,
        OpenAIProvider,
        SecretsManagerProvider,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(MultiTenancyMiddleware).forRoutes('*');
    }
}
