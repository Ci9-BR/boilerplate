import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { BaseProvider } from '../base.provider';

/**
 * OpenAI Provider for AI-driven completions and content analysis.
 * Fully functional implementation using OpenAI SDK (GPT-4 ready).
 */
@Injectable()
export class OpenAIProvider extends BaseProvider {
    private client: OpenAI;

    constructor(private configService: ConfigService) {
        super(OpenAIProvider.name);
        this.client = new OpenAI({
            apiKey: this.configService.get<string>('OPENAI_API_KEY'),
        });
    }

    /**
     * Create a chat completion using specific messages.
     */
    async createChatCompletion(messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]) {
        this.logOperation('createChatCompletion');
        try {
            return await this.client.chat.completions.create({
                model: 'gpt-4',
                messages,
            });
        } catch (error) {
            this.handleError('createChatCompletion', error);
        }
    }

    // AI helper for application features
    /**
     * Higher-level AI helper for content analysis.
     */
    async analyze(content: string, t: (key: string) => string) {
        this.logOperation('analyze');
        try {
            const response = await this.createChatCompletion([
                { role: 'system', content: t('ai.system_facilitator_prompt') },
                { role: 'user', content: `${t('ai.analyze_content_prefix')} ${content}` },
            ]);
            return response?.choices[0].message.content;
        } catch (error) {
            this.handleError('analyze', error);
        }
    }
}
