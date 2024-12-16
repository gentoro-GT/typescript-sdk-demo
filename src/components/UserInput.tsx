import React from "react";
import {MainIconButton} from "./Buttons";
import {SendMessageIcon} from "./Icons";
import {Textarea} from "./Input";
import {ChatContext, ChatContextType} from "../ChatContext.ts";

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
                    placeholder={this.props.message}
                    onChange={(e) => this.setState({ value: e.target.value })}>
                </Textarea>
                <div className="absolute bottom-px right-px p-2 rounded-b-lg bg-white dark:bg-neutral-900">
                    <div className="flex justify-between items-center">
                        <div className="flex items- gap-x-1">
                            <MainIconButton onClick={() => {
                                (this.context as ChatContextType)?.service?.postMessage("user", this.state.value);
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
