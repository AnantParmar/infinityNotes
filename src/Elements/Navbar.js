import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config";
import logo from "../logo.png"
const Navbar = (props) => {
  const context = useContext(noteContext);
  const { uid, setUid, user, setUser } = context;
  let navigate = useNavigate();
  const handleLogout = () => {
    setUser("")
    setUid("");
    signOut(auth).then(() => {
      props.showAlert("Thanks For Using", "success");
      navigate("/login");
    }).catch((error) => {
    });
  };
  let location = useLocation();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid ">
          <Link className="navbar-brand" id="logo" to="/">
            <img src={logo} width={"50px"} height={"50px"}/>
            <span id="logoText">INFINITY NOTES</span>
          </Link>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
              <li className="nav-item mx-2">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  <i class="fa-solid fa-house"></i> HOME 
                </Link>
              </li>
              <li className="nav-item max-4">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="about"
                >
                  <i class="fa-solid fa-circle-info"></i> ABOUT
                </Link>
              </li>
              
            </ul>
          </div> 
            
            {!uid ? (
              <form className="d-flex" role="search">
                <Link
                  className={`btn btn-primary mx-1  ${
                    location.pathname === "/login" ? "d-none" : ""
                  }`}
                  to={"/login"}
                  role="button"
                >
                  Login
                </Link>

                <Link
                  className={`btn btn-primary mx-1 ${
                    location.pathname === "/signup" ? "d-none" : ""
                  }`}
                  to={"/signup"}
                  role="button"
                >
                  SignUp
                </Link>
              </form>
            ) : (
              <div id={"logoutDiv"}>
                <button type="button" disabled className={`user btn btn-outline-info mx-2  ${user===""?"d-none":""}`}>{user}</button>
                <Link
                  className="logout btn btn-primary mx-1 my-2"
                  onClick={handleLogout}
                  to={"/login"}
                  role="button"
                >
                  LogOut
                </Link>
              </div>
            )}
          {/* </div> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
