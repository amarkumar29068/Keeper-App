import React, { useState, useEffect, } from "react";
import axios from "axios";
import { recieveMessageRoute } from "../utils/APIRoutes";
import Note from "./Note"
// require("dotenv").config();

function ShowKeeper({handleDltMsg , messages}) {

  console.log("showKeeper");

  const [msgs, setMsgs] = useState([messages]);
  
  useEffect(() =>{
  const fetchData = async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      userId:data._id
    });
    setMsgs(response.data);
  };fetchData();}, [msgs]);

  return (
    <div >
    { msgs.map( keeper => (
        <Note key={keeper._id} keeper={keeper} handleDltMsg={handleDltMsg} />
      ))
    }
    </div>
  )
}

export default ShowKeeper;
























// import React from "react";
// import Note from "./Note";

// const ShowKeeper = ({ keeperList, setKeeperList }) => {

//   return (
//     <div >
//     { keeperList.map( keeper => (
//         <Note key={keeper._id} keeper={keeper} setKeeperList={setKeeperList} />
//       ))
//     }
//     </div>
//   )
// }

// export default ShowKeeper;