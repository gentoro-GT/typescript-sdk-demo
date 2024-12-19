import React from "react";
import {ChatContext, ChatContextType, EventListener, Message, MessageRole} from "../ChatContext.ts";
import {GentoroChatBubble, UserChatBubble} from "./base/ChatBubble.tsx";
import {LoadingDots} from "./base/LoadingDots.tsx";

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
        onNewMessages: (_messages: Message[]) => {
            const { messages } = this.state;
            const _last_message_id:number = messages.length === 0 ?
                0 : (messages[messages.length - 1] as Message).id();
            const _message_copy: Message [] = [...messages];
            _messages.filter((message) => message.id() > _last_message_id).forEach( messages => _message_copy.push(messages));
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
                        message.role() === MessageRole.Gentoro ?
                            <GentoroChatBubble key={index}>
                                {message.render()}
                            </GentoroChatBubble> :
                            <UserChatBubble key={index}>
                                {message.render()}
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
