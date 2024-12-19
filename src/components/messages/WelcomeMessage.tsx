import {Message, MessageRole} from "../../ChatContext.ts";
import {Fragment} from "react";

export class WelcomeMessage implements Message {
    private _id:number;
    private _role:MessageRole;
    constructor(id: number, role: MessageRole = MessageRole.Gentoro) {
        this._id = id;
        this._role = role;
    }

    id(): number {
        return this._id;
    }

    plainText(): string {
        return "Welcome to Gentoro demo, how can I help you?";
    }

    role(): MessageRole {
        return this._role;
    }

    render = () => {
        return (
            <Fragment key={`message_${this._id}`}>
                <h2 className="font-medium">
                    Ok, we are all set now,
                </h2>
                <div className="space-y-1.5">
                    <p className="mb-1.5 text-sm">
                        The intent of this demo is to let you experiment with Gentoro SDK, connecting OpenAI models with your enterprise solutions.
                    </p>
                    <ul className="list-disc list-outside space-y-1.5 ps-3.5">
                        <li className="text-sm">
                            If you have not yet setup Gentoro bridge with your required tools, please do so now.
                        </li>
                        <li className="text-sm">
                            If you already have, than you can start by asking questions or giving commands to the AI model.
                        </li>
                    </ul>
                </div>
            </Fragment>
        )
    }
}
