import {createContext} from "react";

export type MessageRole = "user" | "gentoro";

export interface Message {
    id: number;
    role: MessageRole;
    message: string;
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
