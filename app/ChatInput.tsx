"use client";

import { FormEvent, useState } from "react";
import useSWR from "swr";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import fetcher from "../utils/fetchMessages";

function ChatInput() {
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher); //fetch messages and store them in cache

  // console.log(messages);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    const messageToSend = input;

    setInput("");

    const id = uuid(); //generate a random id

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: "zack morzy",
      profilePic: "https://picsum.photos/100",
      email: "morzyzack@gmail.com",
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      }).then((res) => res.json());

      return [data.message, ...messages!];
    };

    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError:true,
    }); //update cache with new message
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 w-full px-10 py-5 space-x-2 border-t border-gray-100"
    >
      <input
        type="text"
        value={input} //value assigned to piece of state
        onChange={(e) => setInput(e.target.value)} //for each input,event that is passed to setInput is called
        placeholder="Enter a Messsage here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!input} //disable submit button if input is empty
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
