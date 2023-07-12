import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import {useNavigate} from 'react-router-dom'
const Notes = (props ) => {

  const context = useContext(noteContext);
  const[note, setNote] = useState({id:"",etitle: "", edescription: "", etag: "default"})
  const { notes, getNotes, editNote, uid } = context;

  let navigate = useNavigate();
  useEffect(() => {
    if(uid)
    {
      getNotes();
    }else {
      navigate("/login");
    }
    // eslint-disable-next-line
  },[]);
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (id,title,description,tag) => {
    ref.current.click();
    setNote({id: id, etitle: title, edescription: description, etag: tag})
    
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
  }

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={()=>{handleClick()}}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-2">
        <h2 style={{display: 'flex', alignItems: 'center', justifyContent: "flex-start"}}>Your Notes <span onClick={getNotes} style={{width: "28px", height: "100%", display: 'inline-block', marginLeft: "20px"}}><i style={{fontSize: "1.5rem"}} class="fa-solid fa-rotate-right"></i></span></h2>
        <div className="row mx-2">
        {notes.length === 0 ? "No Notes to Display":
        
         notes.sort((a,b) => b.date.seconds - a.date.seconds).map(({title, description,tag, doc_id}) => {
       
          return (
            <Noteitem key={doc_id} id={doc_id} title={title} description={description} tag={tag}updateNote={updateNote} showAlert={props.showAlert}></Noteitem>
            
          ); 
        })
        } 
        </div>
      </div>
    </>
  );
};

export default Notes;
