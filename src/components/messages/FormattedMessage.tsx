import {JSX} from "react";
import {Message, MessageRole} from "../../ChatContext.ts";
import {FormattedMessage as MdFormattedMessage} from "../base/ChatBubble.tsx";

export class FormattedMessage implements Message{
    private _id:number;
    private _role:MessageRole;
    private _content:string;
    constructor(id: number, role: MessageRole, content: string) {
        this._id = id;
        this._role = role;
        this._content = content;
    }

    id(): number {
        return this._id;
    }

    role(): MessageRole {
        return this._role;
    }

    plainText = () => {
        return this._content;
    };

    render = (): JSX.Element | string => {
        return (
            <MdFormattedMessage key={`message_${this._id}`}>
                {this._content}
            </MdFormattedMessage>
        );
    };
}
