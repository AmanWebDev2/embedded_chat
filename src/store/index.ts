import create from 'zustand'
import { devtools } from 'zustand/middleware';

interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
}

interface Store {
    user: User | null;
    currentConversation: any;
    previousConversations: any[];
    currentTab: string;
    setCurrentTab: (currentTab: string) => void;
    setUser: (user: any) => void;
    setCurrentConversation: (currentConversation: any) => void;
    setPreviousConversations: (previousConversations: any[]) => void;

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
        setCurrentConversation: (currentConversation) => set((state) => ({ ...state, currentConversation })),
        setPreviousConversations: (previousConversations) => set((state) => ({ ...state, previousConversations })),
    })
));

