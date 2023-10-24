import { ServerMessage } from "common";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

interface ServerEventsProviderProps {
  messages: (string | number)[];
}

export const ServerEventsContext = createContext<ServerEventsProviderProps>({
  messages: [],
});

interface ServerEventsProps {
  children: ReactNode;
}

export const ServerEventsProvider: React.FC<ServerEventsProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<(string | number)[]>([]);

  useEffect(() => {
    // Create an EventSource connection to the server's /events endpoint
    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_BASE}/events`
    );

    eventSource.onmessage = (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data) as ServerMessage;
      switch (message.type) {
        case "event1":
          console.log("Got event1:", message.content);
          setMessages((messages) => [...messages, message.content]);
          break;
        case "event2":
          console.log("Got event2:", message.value);
          setMessages((messages) => [...messages, message.value]);
          break;
        default:
          break;
      }
    };

    // Clean up the event source when the component is unmounted
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <ServerEventsContext.Provider
      value={{
        messages,
      }}
    >
      {children}
    </ServerEventsContext.Provider>
  );
};
