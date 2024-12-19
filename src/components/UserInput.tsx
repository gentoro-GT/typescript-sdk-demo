import React from "react";
import {MainIconButton} from "./base/Buttons.tsx";
import {SendMessageIcon} from "./base/Icons.tsx";
import {Textarea} from "./base/Input.tsx";
import {ChatContext, ChatContextType, MessageRole} from "../ChatContext.ts";

type UserInputProps = {
    message?: string;
};
type UserInputState = {
    value: string;
};

export class UserInput extends React.Component<UserInputProps, UserInputState> {
    static contextType = ChatContext;
    state: UserInputState = {
        value: "",
    }

    render() {
        return (
            <div className="relative">
                <Textarea
                    value={this.state.value}
                    placeholder={this.props.message}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                            e.preventDefault(); e.stopPropagation();
                            (this.context as ChatContextType)?.service?.postMessage(MessageRole.User, this.state.value);
                            this.setState({ value: "" });
                        }

                    }}
                    onChange={(e) => this.setState({ value: e.target.value })}>
                </Textarea>
                <div className="absolute bottom-px right-px p-2 rounded-b-lg bg-white dark:bg-neutral-900">
                    <div className="flex justify-between items-center">
                        <div className="flex items- gap-x-1">
                            <MainIconButton onClick={() => {
                                (this.context as ChatContextType)?.service?.postMessage(MessageRole.User, this.state.value);
                                this.setState({ value: "" });
                            }}>
                                <SendMessageIcon width={16} height={16} />
                            </MainIconButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
