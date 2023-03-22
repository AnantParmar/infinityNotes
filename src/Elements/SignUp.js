import React, { useState } from "react";
import {useNavigate, Link} from 'react-router-dom'
import {createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from "../config";
const SignUp = (props) => {
  const [credentials, setCreadentials] = useState({name: "",email: "", password: "", cpassword: ""})
  let navigate = useNavigate();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const {name, email, password} = credentials;
    setSubmitButtonDisabled(true);

    createUserWithEmailAndPassword(auth, email, password).then((res)=>{
      setSubmitButtonDisabled(false);
      // console.log(res);
      const user = res.user;
      updateProfile(user, {
        displayName: name
      })
      console.log(user)
    }).catch((err)=>{
      console.log("Error-",err)
      setSubmitButtonDisabled(false);
    })
    
    navigate("/login");
  }
const onChange = (e) => {
    setCreadentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <div className="container border border-info border-3 rounded-3 p-3  bg-info bg-gradient">
      <div className="container p-4">
      <h1>SignUp To Explore iNoteBook</h1>
      <form onSubmit={handleSubmit} className="my-2">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange} minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange} minLength={5} required
          />
        </div>

        <button disabled={submitButtonDisabled?"disabled":""} type="submit" className="btn btn-primary" id="signInBtn">
          SignUp
        </button>
        <h6 className="my-3">Already Have Account? <Link to={"/login"}>Login</Link> </h6>
      </form>
      </div>
    </div>
  );
};

export default SignUp;
