import React, { createContext, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { webSocketService } from '../services/websocket';

interface WebSocketContextType {
  socket: Socket | null;
  connected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  connected: false,
});

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = webSocketService.connect();
    
    socket.on('connect', () => {
      setConnected(true);
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    setSocket(socket);

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket, connected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
