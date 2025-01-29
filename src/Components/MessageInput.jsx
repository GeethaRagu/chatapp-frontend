import { Field, Formik, useFormik, Form } from "formik";
import React from "react";
import { BsSend } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";
import { sendmessage } from "../Redux/Slice/userMessage";

const MessageInput = () => {
  const dispatch = useDispatch();

  const selectedconversation = useSelector(
    (state) => state.conversationuser.selectedConversation
  );
  const messages = useSelector(
    (state) => state.messageuser.messages
  );
  //console.log("selectedconversation", selectedconversation);
  //console.log("messages",messages);

  const initialValues = {
    message: "",
  };

  const validationschema = Yup.object().shape({
    message: Yup.string().required("Field is empty"),
  });

  const apiurl = import.meta.env.VITE_API_URLKEY;
  const handleSubmit = async (values, { resetForm }) => {
    //console.log(values);
    if(!messages) return;
    try {
      const response = await fetch(
        `${apiurl}/message/send/${selectedconversation.element ? selectedconversation.element._id: selectedconversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token")
          },
          withCredentials: true,
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      //console.log(data);
      if (response.ok) {
        
        dispatch(sendmessage(data));
      }
    } catch (error) {
      console.log(error.message);
    }
    resetForm();
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationschema,
    onSubmit: handleSubmit,
  
  });
  return (
    <div>
      <Formik>
        <Form className="px-4 my-3" onSubmit={formik.handleSubmit}>
          <div className="w-full relative">
            <Field
              type="text"
              className="border text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-500 text-white focus:bg-slate-50"
              placeholder="Send a Message"
              name="message"
              onChange={formik.handleChange}
              value={formik.values.message}
              error={formik.errors.message}
            />
            {formik.errors.message ? <div>{formik.errors.message}</div> : null}
            <button
              type="submit"
              className="absolute inset-y-0 end-0 flex items-center pe-3"
            >
              <BsSend />
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default MessageInput;
