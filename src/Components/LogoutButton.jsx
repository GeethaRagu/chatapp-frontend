import React from 'react';
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signOutSuccess } from '../Redux/Slice/userSlice';
import { clearConversation } from '../Redux/Slice/userConversationSlice';
import { clearmessage } from '../Redux/Slice/userMessage';

const LogoutButton = () => {
   /**React hooks**/
  const dispatch = useDispatch();
  const navigate = useNavigate();
    /**Log Out**/
  const handleSignout = () => {
    dispatch(signOutSuccess());
    dispatch(clearConversation());
    dispatch(clearmessage());
    localStorage.removeItem("Token");
    navigate("/");
  };
    return (
        <div className='mt-auto'>
          <div className="divider divider-info"></div>
            <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={handleSignout}/>
        </div>
    );
};

export default LogoutButton;