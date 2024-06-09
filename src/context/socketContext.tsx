import { createContext } from 'react';
import socketio, { Socket } from 'socket.io-client';

interface SocketContextType extends Socket {}

export const socket = socketio('http://localhost:3030');
export const SocketContext = createContext<SocketContextType | null>(null);

