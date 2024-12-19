import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { webSocketService } from '../services/websocket';

export const useWebSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = webSocketService.connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return socketRef.current;
};
