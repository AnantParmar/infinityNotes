import React from "react";

import Notes from "./Notes";
const Home = (props) => {
  const {showAlert} = props;
  return (
    <>
      {/* <AddNote/> */}
      <Notes showAlert={showAlert}/>
    </>
  );
};

export default Home;
