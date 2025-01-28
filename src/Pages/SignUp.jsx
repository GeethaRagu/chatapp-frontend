import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../Redux/Slice/userSlice";

const SignUp = () => {
  /*React Hooks**/
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**Redux state **/

  const { loading } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.user);
  const currentuser = useSelector((state) => state.user.currentuser);

  //console.log("currentuser", currentuser);
  const apiurl = import.meta.env.VITE_API_URLKEY;

  const initialValues = {
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  };

  const validationschema = Yup.object().shape({
    email: Yup.string().required("Field is empty"),
    username: Yup.string().required("Field is empty"),
    password: Yup.string().required("Field is empty"),
    confirmpassword: Yup.string().required("Field is empty"),
    gender: Yup.string().required("Field is empty"),
  });

  const handleSubmit = async (values) => {
   // console.log(values);
    try {
      dispatch(signUpStart());
      const response = await fetch(`${apiurl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      //console.log(data);
      if (data.success === false) {
        
        return dispatch(signUpFailure(data.message));
      }
      if (response.ok) {
       
        localStorage.setItem("Token", data.token);
        dispatch(signUpSuccess(data));
        navigate("/");
      }
      else{
        return dispatch(signUpFailure(data.message));
      }
    } catch (error) {
      //console.log(error.message);
      dispatch(signUpFailure(error));
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationschema,
    onSubmit: handleSubmit,
  });
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignUp
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <Formik>
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">Email</span>
              </label>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full input input-bordered h-10  text-black"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
              />
              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Username
                </span>
              </label>
              <Field
                type="text"
                name="username"
                placeholder="Enter Username"
                className="w-full input input-bordered h-10 text-black"
                onChange={formik.handleChange}
                value={formik.values.username}
                error={formik.errors.username}
              />
              {formik.errors.username ? (
                <div>{formik.errors.username}</div>
              ) : null}
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Password
                </span>
              </label>
              <Field
                type="password"
                name="password"
                placeholder="Enter Password"
                className="w-full input input-bordered h-10  text-black"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
              />
              {formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Confirm Password
                </span>
              </label>
              <Field
                type="password"
                name="confirmpassword"
                placeholder="Enter Password"
                className="w-full input input-bordered h-10  text-black"
                onChange={formik.handleChange}
                value={formik.values.confirmpassword}
                error={formik.errors.confirmpassword}
              />
              {formik.errors.confirmpassword ? (
                <div>{formik.errors.confirmpassword}</div>
              ) : null}
            </div>
            {/*Gender */}
            {/* <Gendercheckbox /> */}

            <fieldset
              id="radioGroup"
              label="One of these please"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.radioGroup}
              error={formik.errors.radioGroup}
            >
              <input
                type="radio"
                name="gender"
                id="radioOption1"
                label="Choose this option"
                value="Male"
                className="radio radio-primary w-4 h-4 mt-4"
              />
              <span className="p-2  text-white">Male</span>
              <input
                type="radio"
                name="gender"
                id="radioOption2"
                label="Or choose this one"
                value="Female"
                className="radio radio-primary w-4 h-4 mt-4"
              /> 
              <span className="p-2  text-white">Female</span>
            </fieldset>

            {formik.touched.gender && formik.errors.gender ? (
              <div>{formik.errors.gender}</div>
            ) : null}
            <div  className="mt-2 mb-2">
            <Link
              to="/signin"
              className="text-amber-100"
            >
              Already have an account?
            </Link>
            </div>
           
            <div>
              <button type="submit" className="btn btn-block btn-sm mt-2">
                SignUp
              </button>
            </div>
          </Form>
        </Formik>
        {/* <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Fullname</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-white">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          {/*Gender */}
        {/* <Gendercheckbox/>
          <Link
            to="/signin"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2">SignUp</button>
          </div>
        </form>  */}
      </div>
    </div>
  );
};

export default SignUp;
