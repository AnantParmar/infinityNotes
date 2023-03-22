import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

const Login = (props) => {
  const [credentials, setCreadentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [error, setError] = useState("");

  const context = useContext(noteContext);
  const { setUid, setUser } = context;
  let { email, password } = credentials;
  const handleSubmit = async (e) => {
    if (!email || !password) {
      setError("Fill All Fields");
      e.preventDefault();
      return;
    }
    e.preventDefault();
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setSubmitButtonDisabled(false);

        setUid(res.user.uid);

        setUser(res.user.displayName);

        navigate("/");
      })
      .catch((err) => {
        console.log(err)
        navigate("/signup");
        // setSubmitButtonDisabled(false);
        props.showAlert("You Have To SignUp First", "danger")
      });
  };
  const onChange = (e) => {
    setCreadentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container border border-info border-3 rounded-3 p-3 bg-info  bg-gradient">
      <div className="container p-4">
        <h1>Login To Infinity Notes</h1>
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
          <h6 className="text-danger">{error}</h6>
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
