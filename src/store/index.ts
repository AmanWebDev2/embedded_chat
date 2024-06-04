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

type Message = {
    type: string;
    content: string;
}

// author | widget-user
export type Conversation = {
    id: string;
    author: {
        type: string;
        firstName: string;
    };
    messages: Message[];
}

interface Store {
    user: User | null;
    currentConversation: Conversation[] | null;
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
        setCurrentConversation: (currentConversation) => set((state) => ({ 
            ...state, 
            currentConversation: state.currentConversation ? [...state.currentConversation, currentConversation] : [currentConversation]
         })),
        setPreviousConversations: (previousConversations) => set((state) => ({ ...state, previousConversations })),
    })
));

