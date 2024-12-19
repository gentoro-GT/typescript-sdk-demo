import {Fragment, JSX} from "react";
import {Message, MessageRole} from "../../ChatContext.ts";
import {Gentoro, SdkEvent} from "@gentoro/sdk";

export class AuthenticationRequested implements Message{
    private _id:number;
    private _role:MessageRole;
    private _event:SdkEvent;
    private _gentoroSdk:Gentoro;
    constructor(id: number, event:SdkEvent, gentoroSdk: Gentoro) {
        this._id = id;
        this._role = MessageRole.Gentoro;
        this._event = event;
        this._gentoroSdk = gentoroSdk;
    }

    id(): number {
        return this._id;
    }

    role(): MessageRole {
        return this._role;
    }

    plainText = () => {
        return "Please authenticate yourself to continue";
    };

    render = (): JSX.Element | string => {
        return (
            <Fragment key={`message_${this._id}`}>
                <p>In order to continue with the tooling execution, we need your credentials. Please authenticate yourself to continue.</p>
                <p>
                    <a
                        onClick={() => {
                            this._gentoroSdk.handleAuthenticationRequest(this._event.eventInfo, window);
                        }}
                        className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500" href="#">
                        Click here
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                             stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6"/>
                        </svg>
                    </a> to continue to authentication flow
                </p>
            </Fragment>
        );
    };
}
