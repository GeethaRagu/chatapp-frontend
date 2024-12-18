import { Field, Form, Formik, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearSearch, searchUser } from "../Redux/Slice/userSearch";
import { selectedConversation } from "../Redux/Slice/userConversationSlice";

const SearchInput = () => {
  const dispatch = useDispatch();

  const conversations = useSelector((state) => state.conversationuser.users);
  const messages = useSelector((state) => state.messageuser.messages);

  const search = useSelector((state) => state.searchuser.search);
  //console.log("conversation", conversations);
  //console.log("messages", messages);
  //console.log("search", search);

  const initialValues = {
    searchtext: "",
  };

  const validationschema = Yup.object().shape({
    searchtext: Yup.string().required("Field is empty"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    dispatch(searchUser(values));
    if (!search) return;

    if (search.searchtext.length < 3) {
      return toast.error("Search term must be atleast 3 characters long");
    }
    const conversation = conversations.find((c) =>
      c.username.toLowerCase().includes(search.searchtext.toLowerCase())
    );
   // console.log(conversation);
    if(conversation){
        dispatch(selectedConversation(conversation));
        dispatch(clearSearch());
    }
    else {
        toast.error("No such user found");
    }
    resetForm();
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationschema,
    onSubmit: handleSubmit,
  });
  return (
    // <div>
    //     <form className='flex items-center gap-2'>
    //         <input type="text" placeholder='Search...' className='input input-bordered rounded-full text-black' />
    //         <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
    //         <IoSearchSharp className='w-6 h-6 outline-none'/>
    //         </button>
    //     </form>
    // </div>
    <div>
      <Formik>
        <Form
          className="flex items-center gap-2"
          onSubmit={formik.handleSubmit}
        >
          <Field
            type="text"
            placeholder="Search..."
            className="input input-bordered rounded-full text-black"
            name="searchtext"
            onChange={formik.handleChange}
            value={formik.values.searchtext}
            error={formik.errors.searchtext}
          />
          {formik.errors.searchtext
            ? toast.error(formik.errors.searchtext)
            : null}

          <button
            type="submit"
            className="btn btn-circle bg-sky-500 text-white"
          >
            <IoSearchSharp className="w-6 h-6 outline-none" />
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchInput;
