import OpenAI from 'openai';
import {Message} from "../ChatContext.ts";
import {ChatCompletion} from "openai/resources/chat/completions";

export interface StreamChatResponse {
    onChunk: (message: string) => void;
    onComplete: (message: string | null) => void;
}

export class OpenAiService {
    private _client: OpenAI;
    constructor( ) {
        this._client = new OpenAI({
            apiKey: import.meta.env.VITE_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true,
        });
    }

    complete = (messages: Message[]):Promise<ChatCompletion>  => {
        return new Promise<ChatCompletion>( (resolve, reject) => {
            this._client.chat.completions.create({
                messages: messages.map((message) => ({
                    "role": message.role === 'gentoro' ? "assistant" : "user",
                    "content": message.message,
                } as OpenAI.Chat.Completions.ChatCompletionMessageParam)),
                model: import.meta.env.VITE_OPENAI_MODEL
            }).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    streamChat( messages: OpenAI.Chat.ChatCompletionMessage [], consumer: StreamChatResponse ): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const stream = this._client.beta.chat.completions.stream({
                messages,
                model: import.meta.env.VITE_OPENAI_MODEL,
                stream: true,
            })

            stream.on('content', (delta) => {
                consumer.onChunk(delta);
            });

            stream.finalChatCompletion()
                .then((response) => {
                    consumer.onComplete(response.choices[0].message.content);
                    resolve();
                }).catch((error) => {
                    reject(error);
                });

        })
    }

}
