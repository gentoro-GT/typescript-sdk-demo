import OpenAI from 'openai';
import {ChatCompletion, ChatCompletionMessageParam, ChatCompletionTool} from "openai/resources/chat/completions";


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

    complete = (_messages: ChatCompletionMessageParam[], _tools: ChatCompletionTool[] ):Promise<ChatCompletion> => {
        return new Promise<ChatCompletion>( (resolve, reject) => {
            this._client.chat.completions.create({
                messages: _messages,
                model: import.meta.env.VITE_OPENAI_MODEL,
                tools: _tools,
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
