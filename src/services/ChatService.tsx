import {ChatServiceType, EventListener, Message, MessageRole} from "../ChatContext.ts";
import {OpenAiService} from "./OpenAiService.tsx";

import {AuthenticationRequested} from "../components/messages/AuthenticationRequested.tsx";
import {FormattedMessage} from "../components/messages/FormattedMessage.tsx";
import {WelcomeMessage} from "../components/messages/WelcomeMessage.tsx";
import {ChatCompletion,
    ChatCompletionTool,
    ChatCompletionToolMessageParam,
    ChatCompletionMessageParam} from "openai/resources/chat/completions";
import {ErrorMessage} from "../components/messages/ErrorMessage.tsx";
import OpenAI from "openai";
import {
    Gentoro,
    SdkConfig,
    SdkEvent,
    SdkEventType,
    Message as GentoroMessage, Providers
} from "@gentoro/sdk";

export class ChatService implements ChatServiceType {
    private _messages: Message[] = [];
    private _listeners: EventListener[] = [];
    private _cursor = new Map<EventListener, number>();
    private _pos = 1;
    private _openai: OpenAiService;
    private _gentoro:Gentoro;
    constructor() {
        this._messages = [new WelcomeMessage(1)];
        this._openai = new OpenAiService();

        const config:SdkConfig = {
            apiKey: import.meta.env.VITE_GENTORO_API_KEY,
            baseUrl: import.meta.env.VITE_GENTORO_BASE_URI,
            authModBaseUrl: import.meta.env.VITE_GENTORO_AUTH_MOD_BASE_URI,
            provider: Providers.Openai,
        };

        this._gentoro = new Gentoro(config);
        this._gentoro.addSdkEventListener(SdkEventType.AUTHENTICATION_REQUEST, this.authenticationRequestHandler.bind(this));

    }

    authenticationRequestHandler = (event: SdkEvent) => {
        this.pushAndBroadcastMessage(new AuthenticationRequested(++this._pos, event, this._gentoro));
    }

    listenForEvents(listener: EventListener): Message[] {
        this._listeners.push(listener);
        this._cursor.set(listener, this._messages.length === 0 ? 0 : this._messages[this._messages.length - 1].id());
        return this._messages;
    }

    private pushAndBroadcastMessage(message: Message): void {
        this._messages.push(message);
        this.broadcastLastNMessages();
    }
    private broadcastLastNMessages(n:number = 1): void {
        this._listeners.forEach((listener) => {
            const lastNMessages = this._messages.slice(-n);
            lastNMessages.forEach((message) => {
                if( message.id() > (this._cursor.get(listener) || 0) ) {
                    listener.onNewMessages([message]);
                    this._cursor.set(listener, message.id());
                }
            });
        });
    }

    private asGentoroMessages(_thread: ChatCompletionMessageParam[]): GentoroMessage[] {
        return _thread.filter(_msg => ['assistant', 'user'].indexOf(_msg.role) != -1 )
            .map((_msg) => ({
            role: _msg.role,
            content: _msg.content,
        })) as GentoroMessage[]
    }

    postMessage(role: MessageRole, message: string ): void {
        this.pushAndBroadcastMessage(new FormattedMessage(++this._pos, role, message));
        if( role === MessageRole.User ) {
            this._listeners.forEach((listener) => listener.onStateChanged("blocked"));
            const _thread: ChatCompletionMessageParam[] = this._messages.map((_msg) => ({
                "role": _msg.role() === MessageRole.Gentoro ? "assistant" : "user",
                "content": _msg.plainText(),
            } as OpenAI.Chat.Completions.ChatCompletionMessageParam));

            const _communicateWithOpenAI = (_callback: (error: boolean, data: unknown) => void): void => {
                // gather up-to-date tools
                this._gentoro.getTools(import.meta.env.VITE_GENTORO_BRIDGE_UID, this.asGentoroMessages(_thread))
                    .then((tools) => {
                        // call openai with thread and tools
                        this._openai.complete(_thread, tools as ChatCompletionTool[])
                            .then((result) => {
                                _callback(false, result);
                            }).catch((error) => {
                            _callback(true, error);
                        });
                    }).catch((errorGentoro) => {
                        _callback(true, errorGentoro);
                    })
            }

            const _communicateWithGentoro = (_data: unknown, _callback: (error: boolean, data: unknown) => void): void => {
                // delegate the tool execution to gentoro
                this._gentoro.runTools(import.meta.env.VITE_GENTORO_BRIDGE_UID, this.asGentoroMessages(_thread), _data as ChatCompletion)
                    .then((result) => {
                        _callback(false, result);
                    }).catch((error) => {
                        _callback(true, error);
                    })
            }

            const _reportErrorAndEndFlow = (_errorMessage: unknown): void => {
                if( Array.isArray(_errorMessage) ) {
                    _errorMessage = _errorMessage[0];
                }
                this.pushAndBroadcastMessage(new ErrorMessage(++this._pos, _errorMessage));
                this._listeners.forEach((listener) => listener.onStateChanged("ready"));
            }

            const startOrResumeCommunicationFlow = (): void => {
                _communicateWithOpenAI((errorOpenAI, dataOpenAi) => {
                    if (errorOpenAI) {
                        _reportErrorAndEndFlow(dataOpenAi);
                    } else {
                        _communicateWithGentoro(dataOpenAi, (errorGentoro, dataGentoro) => {
                            if (errorGentoro) {
                                _reportErrorAndEndFlow(dataGentoro);
                            } else {
                                const _execOutput: ChatCompletionToolMessageParam [] | null = dataGentoro as ChatCompletionToolMessageParam [] | null;
                                if (_execOutput != null && _execOutput.length > 0) {
                                    _thread.push((dataOpenAi as ChatCompletion).choices[0].message);
                                    _thread.push(..._execOutput as ChatCompletionToolMessageParam []);
                                    startOrResumeCommunicationFlow();
                                } else {
                                    this.pushAndBroadcastMessage(new FormattedMessage(
                                        ++this._pos,
                                        MessageRole.Gentoro,
                                        (dataOpenAi as ChatCompletion).choices[0].message.content as string));
                                    this._listeners.forEach((listener) => listener.onStateChanged("ready"));
                                }
                            }
                        });
                    }
                });
            }
            startOrResumeCommunicationFlow();
        }
    }

    getAllMessages(): Message[] {
        return this._messages;
    }


}
