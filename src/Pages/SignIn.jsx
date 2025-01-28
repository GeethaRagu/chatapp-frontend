import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signInFailure, signInStart, signInSuccess } from "../Redux/Slice/userSlice";
import { useCookies } from 'react-cookie';

const SignIn = () => {
   /*React Hooks**/
   const navigate = useNavigate();
   const dispatch = useDispatch();
 
   /**Redux state **/
 
   const { loading } = useSelector((state) => state.user);
   const { error } = useSelector((state) => state.user);
   const currentuser = useSelector((state) => state.user.currentuser);

   const [cookies, setCookie] = useCookies(['jwt']);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationschema = Yup.object().shape({
    email: Yup.string().required("Field is empty"),
    password: Yup.string().required("Field is empty"),
  });
  //console.log(currentuser);
  //Call signup API on form submit
  const apiurl = import.meta.env.VITE_API_URLKEY;
  const handleSubmit = async (values) => {
    //console.log(values);
    try {
      dispatch(signInStart());
      const response = await fetch(`${apiurl}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
     // console.log(data);
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      if (response.ok) {
        localStorage.setItem("Token", data.token);
        
        setCookie("jwt", data.token);
        dispatch(signInSuccess(data));
       
          navigate("/");
        
      }
      else{
        return dispatch(signInFailure(data.message));
      }
    } catch (error) {
     
     
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignIn
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <Formik initialValues={initialValues}
                validationSchema={validationschema}
                onSubmit={handleSubmit}>
          <Form>
            <div className="mt-5">
              <label className="pr-10  text-white">Email :</label>
              <Field
                type="email"
                name="email"
                placeholder="name@gmail.com"
                 className="w-full input input-bordered h-10  text-black"
              />
              <ErrorMessage
                name="email"
                component="h6"
                className="error_message"
              />
            </div>
            <div className="mt-5">
              <label className="pr-3  text-white">Password :</label>
              <Field
                type="password"
                name="password"
                placeholder="*******"
                 className="w-full input input-bordered h-10  text-black"
              />
              <ErrorMessage
                name="password"
                component="h6"
                className="error_message"
              />
            </div>
            <Link
              to="/signup"
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
            >
              {"Don't"} have an account?
            </Link>
            <div>
              <button className="btn btn-block btn-sm mt-2" type="submit">SignIn</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
