import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword , deleteUser} from "firebase/auth";
import {
  doc,
  deleteDoc,
  collection,
  query,
  where, getDocs
} from "firebase/firestore";
import { auth,db } from "../config";

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
        if(!res.user.emailVerified)
        {
          deleteUser(res.user).then(async () => {
            setUid("");
            alert("Your Account Deleted Due To Not Verified Email.")
            navigate("/login");
            const q = query(collection(db, "users"), where("userId", "==", res.user.uid));
            console.log(q)
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot);
            querySnapshot.forEach( async (doc) => {
              await deleteDoc(doc(db, "users", doc.id));
            });
            return;
          }).catch((err) => {
            console.log(err)
            props.showAlert(err.message, "danger")
          });
        } 
        else
        {
          navigate("/");
          setUid(res.user.uid);
          setUser(res.user.displayName);
          props.showAlert("Login Done!", "success")
        }

      })
      .catch((err) => {
        props.showAlert(err.code, "danger")
        navigate("/signup");
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
