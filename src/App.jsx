import React from "react";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const App = () => {
  const currentuser = useSelector((state) => state.user.currentuser);
  //console.log(currentuser);
  return (
   <div>
    <div>
    <ToastContainer></ToastContainer>
    </div>
    <div className="flex p-4 h-screen items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={currentuser ? <Home/> : <SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={currentuser ? <Navigate to = "/" />  : <SignIn />} />
          <Route path="/signup" element={currentuser ? <Navigate to = "/" />  : <SignUp />} />
          <Route path="*" element="" />
        </Routes>
      </BrowserRouter>
    </div>
   </div>
  );
};

export default App;
