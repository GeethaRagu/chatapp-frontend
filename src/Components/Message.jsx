import React from "react";
import { RxAvatar } from "react-icons/rx";
import { useSelector } from "react-redux";
import { extractTime } from "../Utils/extractTime";
const Message = ({data}) => {
  //console.log(data);
  const selectedconversation = useSelector(
    (state) => state.conversationuser.selectedConversation
  );
  const currentuser = useSelector((state) => state.user.currentuser);
  //console.log(currentuser.user._id);
  const fromMe = data.senderId === currentuser.user._id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? currentuser.user.profilepic : (selectedconversation.element ? selectedconversation.element.profilepic : selectedconversation.profilepic);
  const bubbleBgColor = fromMe ? 'bg-blue-500' : "";

  const formattedTime = extractTime(data.createdAt);
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-5 rounded-full">
          {/* <RxAvatar /> */}
          <img src={profilePic}/>
        </div>
      </div>
      <div class={`chat-bubble text-white ${bubbleBgColor}`}>
        {data.message}
      </div>
      <div class="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
