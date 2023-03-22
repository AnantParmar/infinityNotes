import React, { useState } from "react";
import NoteContext from "./noteContext";
import {doc,updateDoc,deleteDoc, collection, query, where,getDocs } from "firebase/firestore";
import { db } from "../../config";
const NoteState = (props)=> {
  const host = "";
    const [notes, setNotes] = useState([])
    const [uid,setUid] = useState("");
    const [user,setUser] = useState("");

    // Get All Notes
    const getNotes = async ()=>{
      // API CALL
      let arr = []
      const q = query(collection(db, "notes"),where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arr.push(doc.data())
      });
      
      setNotes(arr);

    }

      // Delete A Note

      const deleteNote = async (id)=>{
        await deleteDoc(doc(db, "notes", id));
        getNotes();
      }
      
      // Edit A note
      const editNote = async (id, title, description, tag)=>{
        // API CALL

        console.log("edit")
        const washingtonRef = doc(db, "notes", id);

        await updateDoc(washingtonRef, {
        title: title,
        description:description,
        tag:tag
        });
        getNotes();

      }

    return (                                          
        <NoteContext.Provider value={{notes,uid,user,  setUser,setUid,deleteNote, editNote, getNotes}}>
        {props.children}
        </NoteContext.Provider>
    )
} 

export default NoteState;