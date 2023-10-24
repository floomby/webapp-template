import React from "react";
import { ServerEventsProvider } from "./providers/ServerEvents";
import Poster from "./components/Poster";
import Messages from "./components/Messages";

const App: React.FC = () => {
  return (
    <ServerEventsProvider>
      <React.StrictMode>
        <div className="flex flex-col gap-4 align-start justify-center bg-slate-950 min-h-screen text-white">
          <Poster />
          <div className="m-2 border-[1px] border-slate-400"></div>
          <Messages />
        </div>
      </React.StrictMode>
    </ServerEventsProvider>
  );
};

export default App;
