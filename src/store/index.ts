import create from 'zustand'
import { devtools } from 'zustand/middleware';

type User = {
    id: number;
    name: string;
    email: string;
    avatar: string;
}

/**
 * Message type can 
 * 1. type "image", url: "https://example.com/image.jpg"
 * 2. type "text", content: "Hello"
 */

export type Message = {
    author: {
        type: string;
        firstName: string;
    };
    type: string;
    content: string;
}

// author | widget-user
export type Conversation = {
    id: string;
    messages: Message[];
}

interface Store {
    user: User | null;
    currentConversation: Conversation | null;
    previousConversations: Conversation[];
    currentTab: string;
    setCurrentTab: (currentTab: string) => void;
    setUser: (user: any) => void;
    setCurrentConversation: (currentConversation: Conversation) => void;
    setPreviousConversations: (previousConversations: Conversation[]) => void;

}

const initialState:Store = {
    user: null,
    currentConversation: null,
    previousConversations: [

    ],
    currentTab: 'HOME',
    setCurrentTab: () => {},
    setUser: () => {},
    setCurrentConversation: () => {},
    setPreviousConversations: () => {},
};

export const useChatStore = create<Store>()(devtools(
    (set) => ({
        ...initialState,
        setCurrentTab: (currentTab) => set((state) => ({ ...state, currentTab })),
        setUser: (user) => set((state) => ({ ...state, user })),
        setCurrentConversation: (currentConversation) => set((state)=>{
            return { ...state, currentConversation:{...currentConversation, 
                messages: [...state.currentConversation?.messages || [], ...currentConversation.messages] }}
        
        }),
        setPreviousConversations: (previousConversations) => set((state) => ({ ...state, previousConversations })),
    })
));

// HELPER
/**
 * Currenlty every time we add message to current conversation we are adding new id to it
 * When we click on new conversation a new id conversation is created
 */