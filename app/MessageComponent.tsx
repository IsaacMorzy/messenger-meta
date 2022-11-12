import Image from "next/image";
import { Message } from "../typings";

type Props = {
  message: Message;
};

function MessageComponent({ message }: Props) {
  return (
    <div>
      <div>
        <Image
          className="rounded-full mx-2"
          height={10}
          width={10}
          src={message.profilePic}
          alt="Profile Picture"
        />
      </div>
      <div>
        <p className="text-[0.65rem px-[2px] pb-[2px] text-red-400">{message.username}</p>

        <div className="flex items-end">
          <div className="px-3 py-2 rounded-lg w-fit text-white bg-red-400">
            <p>{message.message}</p>
          </div>
          <p>{new Date(message.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageComponent;
