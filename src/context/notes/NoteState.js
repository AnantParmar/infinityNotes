import React, { useState } from "react";
import NoteContext from "./noteContext";
import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config";
const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const [uid, setUid] = useState("");
  const [user, setUser] = useState("");

  const getNotes = async () => {
    let arr = [];
    const q = query(collection(db, "notes"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setNotes(arr);
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    
    getNotes();
  };

  const editNote = async (id, title, description, tag) => {
    const noteRef = doc(db, "notes", id);

    await updateDoc(noteRef, {
      title: title,
      description: description,
      tag: tag,
    });
    
    getNotes();
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        uid,
        user,
        setUser,
        setUid,
        deleteNote,
        editNote,
        getNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
