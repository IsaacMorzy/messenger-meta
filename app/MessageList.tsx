"use client";

import useSWR from "swr";
import { Message } from "../typings";
import fetcher from "../utils/fetchMessages";

function MessageList() {
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  return (
    <div>
      {messages?.map((message) => (
        <div key={message.id}>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
