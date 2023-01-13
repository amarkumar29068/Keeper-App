import React from "react";

function Note({keeper,setKeeperList,handleDltMsg}){

  console.log("Note");

  const deleteChat = (event) => {
    // event.preventDefault();
    handleDltMsg(keeper._id);
  }

  return (
    <div className="note">
          <h1>{keeper.title}</h1>
          <p>{keeper.description}</p>
          <div className="button" onClick={deleteChat}>
          {/* <div className="button" onClick={(keeper)=>handleDltMsg(keeper._id)}> */}
          <i className="fa fa-trash fa-1px" aria-hidden="true" style={{top:"10px",bottom:"10px",left:"11px",right:"11px"}}></i>
          </div>
    </div>
  );
}

export default Note;
