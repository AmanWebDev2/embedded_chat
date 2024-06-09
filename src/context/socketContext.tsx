import React, { createContext, useContext } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketContextType extends Socket {}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = (): SocketContextType => {
    const socket = useContext(SocketContext);
    if (!socket) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return socket;
};

interface SocketProviderProps {
    url: string;
    options?: any; // Add type for socket options as needed
    children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
    url,
    options,
    children,
}) => {
    const socket = io(url, options);

    return (
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    );
};