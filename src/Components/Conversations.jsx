import React from "react";
import Conversation from "./Conversation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  displayusers,
  selectedConversation,
} from "../Redux/Slice/userConversationSlice";
import axios from "axios";
import { getRandomEmoji } from "../Utils/emojis";

const Conversations = () => {
  const dispatch = useDispatch();
  const userconversation = useSelector((state) => state.conversationuser.users);
  const selectedconversation = useSelector(
    (state) => state.conversationuser.selectedConversation
  );
  // console.log("users:", userconversation);

 // console.log("selectedconversation", selectedconversation);
  useEffect(() => {
    fetchData();
  }, []);

  const apiurl = import.meta.env.VITE_API_URLKEY;

  const fetchData = async () => {
    await axios
      .get(`${apiurl}/user/getusers`, {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        dispatch(displayusers(res.data));
        //console.log("res", res.data);
      })
      .catch((error) => console.log(error));
  };

  const setSelectedConversation = (conversation) => {
    dispatch(selectedConversation(conversation));
  };
  return (
    <div className="py-2 flex flex-col overflow-auto text-white">
      {userconversation.map((element, index) => {
        // return (
        //   <Conversation
        //     key={element._id}
        //     conversation={element}
        //     lastindex={index === userconversation.length - 1}
        //   />
        // );
        return (
          <div>
            <div
              className={`flex gap-2 items-center hover:bg-sky-500 rounded p-3 py-5 cursor-pointer
            ${
              selectedconversation != null
                ? // ? selectedconversation.element?._id  === element._id
                  //   ? "bg-sky-500"
                  //   : ""
                  selectedconversation.element
                  ? selectedconversation.element._id === element._id
                    ? "bg-sky-500"
                    : ""
                  : selectedconversation._id === element._id
                  ? "bg-sky-500"
                  : ""
                : ""
            }
            `}
              onClick={() => setSelectedConversation({ element })}
            >
              <div className="avatar online">
                <div className="w-5 rounded-full">
                  <img src={element.profilepic} alt="user avatar" />
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                  <p className="font-bold text-white">{element.username}</p>
                  <span className="text-xl">{getRandomEmoji()}</span>
                </div>
              </div>
            </div>
            {!(index === userconversation.length - 1) && (
              <div className="divider divider-accent my-0 py-0 h-1"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Conversations;
