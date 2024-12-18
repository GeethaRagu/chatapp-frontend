import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import { useSelector } from "react-redux";
const Messagecontainer = () => {
  const selectedconversation = useSelector((state) => state.conversationuser.selectedConversation);
 
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedconversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/*Header*/}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text text-white">To: </span>
            <span className="text-white font-bold">{selectedconversation.element?.username}{selectedconversation?.username}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default Messagecontainer;

const NoChatSelected = () => {
  const currentuser = useSelector((state) => state.user.currentuser);
  //console.log(currentuser);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-white font-semibold flex flex-col items-center gap-2">
        <p>Welcome 🤝 {currentuser.newUser?currentuser.newUser.username : currentuser.user.username} </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
