import React, { useEffect } from "react";
import Message from "./Message";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getmessage, getmessagestart } from "../Redux/Slice/userMessage";
import MessageSkeleton from "./MessageSkeleton";
import { useRef } from "react";

const Messages = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.messageuser.loading);
  //console.log("loading",loading);
  const selectedconversation = useSelector(
    (state) => state.conversationuser.selectedConversation
  );
  const usermessages = useSelector((state) => state.messageuser.messages);
  //console.log("selectedconversation", selectedconversation);
  //console.log("messages", usermessages);
  //console.log("messageslength", usermessages.length);
 
  const lastMessageRef = useRef();

  useEffect(()=>{
    setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({behavior:"smooth"});
    }, 100);
  },[usermessages])

  useEffect(() => {
    fetchData();
  }, [selectedconversation.element ? selectedconversation.element._id : selectedconversation._id]);

  const apiurl = import.meta.env.VITE_API_URLKEY;
  const fetchData = async () => {
    dispatch(getmessagestart());

    await axios
      .get(`${apiurl}/message/${selectedconversation.element ? selectedconversation.element._id : selectedconversation._id}`, {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        //dispatch(displayusers(res.data));
        // console.log("res", res.data);
        dispatch(getmessage(res.data));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        usermessages?.length > 0 &&
        usermessages?.map((element,index) => {
          return (
            <div key={index} ref={lastMessageRef}>
              <Message data={element} />
            </div>
          );
        })}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && usermessages?.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
