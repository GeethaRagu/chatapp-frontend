import React from "react";
import { RxAvatar } from "react-icons/rx";
const Conversation = (conversation,lastindex) => {
  console.log(conversation);
  return (
    <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-3 py-5 cursor-pointer">
      <div className="avatar online">
        <div className="w-5 rounded-full">
         <img src={conversation.profilepic}  alt = "user avatar"/>
        </div>
      </div>
      <div className="flex flex-col flex-1">
            <div className="flex gap-3 justify-between">
                <p className="font-bold text-white">{conversation.username}</p>
                <span className="text-xl">😘</span>
            </div>
      </div>
    </div>
  );
};

export default Conversation;
