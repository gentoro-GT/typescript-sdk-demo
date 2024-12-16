import {ChatServiceType, EventListener, Message, MessageRole} from "../ChatContext.ts";
import {SystemMessages} from "../components/WelcomeMessage.tsx";
import {OpenAiService} from "./OpenAiService.tsx";

export class ChatService implements ChatServiceType {
    private _messages: Message[] = [];
    private _listeners: EventListener[] = [];
    private _cursor = new Map<EventListener, number>();
    private _pos = 1;
    private _openai: OpenAiService;

    constructor() {
        this._messages = [{
            id: 1,
            role: "gentoro",
            message: SystemMessages.Welcome,
        }];
        this._openai = new OpenAiService();
    }

    listenForEvents(listener: EventListener): Message[] {
        this._listeners.push(listener);
        this._cursor.set(listener, this._messages.length === 0 ? 0 : this._messages[this._messages.length - 1].id);
        return this._messages;
    }

    postMessage(role: MessageRole, message: string ): void {
        console.log('called post message');
        const _message: Message = {id: ++this._pos, role, message};
        this._messages.push(_message);
        this.broadcastMessage(_message);

        if( role === "user" ) {
            this._listeners.forEach((listener) => listener.onStateChanged("blocked"));
            this._openai.complete(this._messages)
                .then((result) => {
                    console.log('completed message', result);
                    this._messages.push({
                        id: ++this._pos,
                        role: "gentoro",
                        message: result.choices[0].message.content || '',
                    });
                }).catch((error) => {
                    console.error('completed message error', error);
                    this._messages.push({
                        id: ++this._pos,
                        role: "gentoro",
                        message: JSON.stringify(error) || '',
                    });
                }).finally(() => {
                    this.broadcastMessage(this._messages[this._messages.length - 1]);
                    this._listeners.forEach((listener) => listener.onStateChanged("ready"));
                });
        }
    }

    getAllMessages(): Message[] {
        return this._messages;
    }

    private broadcastMessage ( message: Message ): void {
        this._listeners.forEach((listener) => {
            if( message.id > (this._cursor.get(listener) || 0) ) {
                console.log('broadcasting message', this._cursor.get(listener), message.id, message);
                listener.onNewMessages([message])
                this._cursor.set(listener, message.id);
            }
        });
    }

}
