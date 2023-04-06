import React, { useState } from "react";
import {useNavigate, Link} from 'react-router-dom'
import {createUserWithEmailAndPassword, updateProfile,sendEmailVerification} from 'firebase/auth'
import { collection, doc, setDoc} from "firebase/firestore";
import { auth , db, } from "../config";

const SignUp = (props) => {
  const [credentials, setCreadentials] = useState({name: "",email: "", password: "", cpassword: ""})
  let navigate = useNavigate();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [error, setError] = useState("");
  
  
  const handleSubmit = async (e) => {
    const {name, email, password, cpassword} = credentials;
    if (!email || !password || !name || !cpassword) {
      setError("Fill All Fields");
      e.preventDefault();
      return;
    }
    if(password!==cpassword)
    {
      setError("Passwords not Matched");
      e.preventDefault();
      return;
    }

    e.preventDefault();
   
    setSubmitButtonDisabled(true);

    createUserWithEmailAndPassword(auth, email, password)
    .then((res)=> {
      auth.languageCode = 'en';
      sendEmailVerification(auth.currentUser)
      .then(() => {
        alert('Email Sent For Verification')
        window.open('https://mail.google.com/mail/');
      })
      .catch((err)=>{
        props.showAlert(err.code, "danger")
      })
      .then(()=>{

        const newUserRef = doc(collection(db, "users"));
        setDoc(newUserRef,{
          name: name, 
          email: email,
          date: new Date(),
          userId : res.user.uid,
          doc_id : newUserRef.id
        })
        .catch((err)=>{
          props.showAlert(err.code, "danger")
        })
      })
      .catch((err)=>{
        props.showAlert(err.code, "danger")
      })
      props.showAlert("Successfully SignUp", "success")
      setSubmitButtonDisabled(false);
      const user = res.user;
      updateProfile(user, {
        displayName: name
      })
      navigate("/login");
    }).catch((err)=>{
      props.showAlert(err.code, "danger")
      setSubmitButtonDisabled(false);
      navigate("/signup")
      return;
    })

    
  }
const onChange = (e) => {
    setCreadentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <div className="container formDiv border border-info border-3 rounded-3 p-3  bg-transparent">
      <div className="container p-4">
      <h1>SignUp To Explore Infinity Notes</h1>
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
        <h6 className="text-danger">{error}</h6>
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
