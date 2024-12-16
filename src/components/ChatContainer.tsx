import React from "react";
import {ChatContext, ChatContextType, Message, EventListener} from "../ChatContext.ts";
import {FormattedMessage, GentoroChatBubble, UserChatBubble} from "./ChatBubble.tsx";
import {LoadingDots} from "./LoadingDots.tsx";

export interface ChatContainerState {
    messages: Message[];
    showLoading: boolean;
}

export type ChatContainerProps = object

export class ChatContainer extends React.Component<ChatContainerProps, ChatContainerState, ChatContextType> {
    static contextType = ChatContext;
    state = {
        messages: [],
        showLoading: false,
    };

    componentDidMount() {
        this.setState({
            messages: (this.context as ChatContextType)?.service.
                listenForEvents(this._messageListener),
        });
    }

    private _messageListener = {
        onStateChanged: (state: "ready" | "blocked") => {
            this.setState({
                showLoading: state === "blocked",
            });
        },
        onNewMessages: (messages: Message[]) => {
            const _last_message_id:number = this.state.messages.length === 0 ?
                0 : this.state.messages[this.state.messages.length - 1].id;
            const _message_copy: Message [] = [...this.state.messages];
            console.log('received broad casted message', messages, _last_message_id);
            messages.filter((message) => message.id > _last_message_id).forEach( messages => _message_copy.push(messages));
            this.setState({
                messages: _message_copy,
            });
        }
    } as EventListener;

    render() {
        return (
            <ul className="mt-16 space-y-5">
                {
                    this.state.messages.map((message: Message, index) => (
                        message.role === "gentoro" ?
                            <GentoroChatBubble key={index}>
                                <FormattedMessage>{message.message}</FormattedMessage>
                            </GentoroChatBubble> :
                            <UserChatBubble key={index}>
                                <FormattedMessage>{message.message}</FormattedMessage>
                            </UserChatBubble>
                    ))
                }
                {this.state.showLoading && (
                    <GentoroChatBubble key={'loading'}>
                        <LoadingDots />
                    </GentoroChatBubble>
                )}
            </ul>
        )
    }
}
