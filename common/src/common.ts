export type Event1Message = {
  content: string;
};

export type Event2Message = {
  value: number;
};

export type ServerMessage =
  | ({
      type: "event1";
    } & Event1Message)
  | ({
      type: "event2";
    } & Event2Message);
