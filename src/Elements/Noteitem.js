import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const { title, description, updateNote, id, tag } = props;
  const context = useContext(noteContext);
  const {deleteNote } = context;
  const read = (id) => {
    let card = document.getElementById(id)
    if(card.classList.contains("read"))
    {
      card.classList.remove("read")
    }
    else{
      card.classList.add("read")
    }
  }
  return (
    <div className="col-md-3 my-3 cardStyle" id={id} >
      <div className="card bg-dark h-100 text-white" >
        <div className="card-body">
        <span className="position-absolute top-0 start-100 badge rounded-pill bg-danger" style={{transform: "translate(-99%,-50%)"}}>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(id); props.showAlert("Deleted Successfully", "success")}} ></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(id,title,description,tag);props.showAlert("Updated Successfully", "success")}}></i>
          <i className="fa-brands fa-readme" onClick={()=>{read(id)}}></i>
          
        </span>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
          {description}
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
