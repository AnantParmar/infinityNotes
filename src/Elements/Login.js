import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

const Login = (props) => {
  const [credentials, setCreadentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const context = useContext(noteContext);
  const { setUid, setUser } = context;
  let { email, password } = credentials;
  const handleSubmit = async (e) => {
    if (!email || !password) {
      props.showAlert("Fill All Fields", "danger");
      return;
    }
    e.preventDefault();
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setSubmitButtonDisabled(false);
        localStorage.setItem("token", res.user.accessToken);
        setUid(res.user.uid);
        console.log(res.user.displayName);
        setUser(res.user.displayName);

        // console.log(localStorage.getItem("token"));
        const user = res.user;
        // console.log(res);
        navigate("/");
      })
      .catch((error) => {
        setSubmitButtonDisabled(false);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // props.showAlert(error.message, "danger")
        console.log(error);
      });
  };
  const onChange = (e) => {
    setCreadentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container border border-info border-3 rounded-3 p-3 bg-info  bg-gradient">
      <div className="container p-4">
        <h1>Login To iNoteBook</h1>
        <form onSubmit={handleSubmit} className="form-floating my-3">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
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
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button
            disabled={submitButtonDisabled ? "disabled" : ""}
            className="btn btn-primary"
          >
            Login
          </button>

          <h6 className="my-3">
            Don't Have Account? <Link to={"/signup"}>SignUp</Link>{" "}
          </h6>
        </form>
      </div>
    </div>
  );
};

export default Login;
