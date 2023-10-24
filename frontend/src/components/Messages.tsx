import { useContext } from "react";
import { ServerEventsContext } from "../providers/ServerEvents";

export default function () {
  const { messages } = useContext(ServerEventsContext);

  return (
    <div className="w-full p-2 min-h-[48px] grow">
      {messages.map((message, index) => {
        return (
          <div key={index} className="flex flex-col gap-1">
            <p>{message}</p>
          </div>
        );
      })}
    </div>
  );
}
