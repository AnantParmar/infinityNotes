import React, {useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";
import { doc, setDoc,collection} from "firebase/firestore";
import {db} from "../config"
const AddNote = (props) => {
    const context = useContext(noteContext);
  const {getNotes, uid } = context;
  const[note, setNote] = useState({title: "", description: "", tag: ""});
  const handleClick = async (e) => {
    e.preventDefault();

    const newNotRef = doc(collection(db, "notes"));
    
    setDoc(newNotRef,{
      doc_id: newNotRef.id,
      title: note.title,
      description: note.description,
      tag: note.tag,
      date:new Date(),
      userId : uid
  })

    setNote({title: "", description: "", tag: ""})
    getNotes();
    props.showAlert("Added Successfully", "success")
    
  }
  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <div className="container border border-info border-3 rounded-3 p-3  bg-info bg-gradient my-3">
      <div className="container p-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={5}
            required
            value={note.title}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            minLength={5}
            required
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            minLength={5}
            required
            value={note.tag}
          />
        </div>
        
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
      </div>
    </div>
  );
};

export default AddNote;
