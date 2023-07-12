import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Elements/Navbar";
import Home from "./Elements/Home";
import About from "./Elements/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./Elements/Alert";
import Login from "./Elements/Login";
import SignUp from "./Elements/SignUp";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert} />
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
          </Routes>
          </div>
          <footer className="position-absolute top-100 start-50 translate-middle-x my-5" style={{fontWeight:"bold", textAlign:"center"}}>Copyright &copy; | All Rights Are Reserved</footer>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
