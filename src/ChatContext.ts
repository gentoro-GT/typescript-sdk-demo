import {createContext, JSX} from "react";

export enum MessageRole {
    User = "user",
    Gentoro = "gentoro",
};

export interface Message {
    id: () =>  number;
    role: () => MessageRole;
    plainText : () => string;
    render: () => JSX.Element | string;
}

export interface EventListener {
    onNewMessages: (messages: Message []) => void;
    onStateChanged: (state: "ready" | "blocked") => void;
}

export interface ChatServiceType {
    getAllMessages(): Message[];
    postMessage: (role: MessageRole, message: string) => void;
    listenForEvents: (listener: EventListener) => Message[];

}

export interface ChatContextType {
    service: ChatServiceType;
}

export const ChatContext = createContext<ChatContextType | null>(null);
