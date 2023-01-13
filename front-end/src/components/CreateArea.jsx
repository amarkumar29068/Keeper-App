import React, { useState } from "react";

function CreateArea({ handleSendMsg }) {
  
  console.log("CreateArea");

  const [msg, setMsg] = useState({title:"" , description:""});
  const [expanded, setExpanded] = useState(false);

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.title.length >0) {
      handleSendMsg(msg);
      setMsg({title:"" , description:""});
      setExpanded(false);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target
    setMsg({
        ...msg,
        [name]: value
    })
}

const expand = () => {setExpanded(true)}

  return (
    
          <div className="create-note">
              <input
                name="title"
                onChange={handleChange}
                value={msg.title}
                placeholder={expanded ? "Title" : "Take a note..."}
                onClick={expand}
              />
            
              {expanded && (
              <textarea
              name="description"
              onChange={handleChange}
              value={msg.description}
              placeholder="Take a note..."
              rows="3"
              />
              )}
            
              <div className="button" onClick={sendChat}><i className="fa fa-plus fa-2x" aria-hidden="true" style={{right:"4px",left:"4px",top:"2px",bottom:"2px"}}></i></div>
          </div>
      )
    }


      export default CreateArea;

























// import React, { useState} from "react";
// import axios from "axios";

// const CreateArea = ({ setKeeperList }) => {
  
//   const [expanded, setExpanded] = useState(false);

//   const [keeperObj, setKeeperObj] = useState({
//     title: "",
//     description:""
//   })

//   const handleChange = e => {
//     const { name, value } = e.target
//     setKeeperObj({
//         ...keeperObj,
//         [name]: value
//     })
// }
  
// const add = () => {
//   if(keeperObj.title) {
//       axios.post("http://localhost:3001/api/addNew", keeperObj)
//       .then(res => setKeeperList(res.data))
//       setKeeperObj({
//           title: "",
//           description:""
//       })
//       setExpanded(false);
//   }
// }



// const expand = () => {setExpanded(true)}

//   return (
    
//       <div className="create-note">
//           <input
//             name="title"
//             onChange={handleChange}
//             value={keeperObj.title}
//             placeholder={expanded ? "Title" : "Take a note..."}
//             onClick={expand}
//           />
        
//           {expanded && (
//           <textarea
//           name="description"
//           onChange={handleChange}
//           value={keeperObj.description}
//           placeholder="Take a note..."
//           rows="3"
//           />
//           )}
        
//           <div className="button" onClick={add}><i className="fa fa-plus fa-2x" aria-hidden="true" style={{right:"4px",left:"4px",top:"2px",bottom:"2px"}}></i></div>
//       </div>
//   )
// }

// export default CreateArea;
