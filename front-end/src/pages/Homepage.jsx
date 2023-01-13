import React, { useEffect, useState, } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import CreateArea from "../components/CreateArea"
import ShowKeeper from "../components/ShowKeeper"
import Footer from "../components/Footer"
import {sendMessageRoute , recieveMessageRoute , deleteMessageRoute ,logoutRoute } from "../utils/APIRoutes"
import { BiPowerOff } from "react-icons/bi";

function Homepage() {
  
  const navigate = useNavigate();
 
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  console.log("1");
  
  useEffect(() => { const fetchData=async () => {

    console.log("upper");

    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {

      console.log("before Namvigatw");
      navigate("/login");
      console.log("after Namvigatw");
    } else {
      console.log("before setting");
      setCurrentUser( JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
      console.log("after setting");
    }
  };fetchData();},[]);
  

  console.log("2");
  
  
  useEffect(() =>{
    const fetchData = async () => {
    console.log("before messages");
      const response = await axios.post(recieveMessageRoute, {
        userId: currentUser._id
      });
      console.log("after messages set");
      setMessages(response.data);
    };fetchData();},[currentUser]);

  
  console.log("3");
  
    const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
   
    await axios.post(sendMessageRoute, {
      userId: data._id,
      title: msg.title,
      description: msg.description
    });
 
    const msgs = [...messages];
    msgs.push(msg);
    setMessages(msgs);
  };
  

  console.log("4");

  const handleDltMsg =  async (id) => {
    
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    
    await axios.post(deleteMessageRoute , {
      msgId:id
    })

  setMessages(messages.filter((temp) => temp._id !== id));
}
  
console.log("5");


const handleLogout = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };


  console.log("6");
  
  return (
    <div className="App">
      <Header />
      {/* <h2 className="username">{JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)).username}</h2> */}
      <BiPowerOff 
      style={{
        height:"2.75rem" , 
        width:"2.75rem" , 
        border:"solid" , 
        color:"white",
        position:"absolute",
        top:"1.4rem",
        right:"4%",
        borderRadius:"7%",
        cursor:"pointer",
        }} 
      onClick={handleLogout}
        />
      <CreateArea handleSendMsg={handleSendMsg} />
      <ShowKeeper messages={messages} handleDltMsg={handleDltMsg}/>
      <Footer />
    </div>
  );
}

export default Homepage;





  // useEffect(() => {
  //   if (currentUser) {
  //     socket.current = io(host);
  //     socket.current.emit("add-user", currentUser._id);
  //   }
  // }, [currentUser]);

  
  // useEffect(() => { const fetchData = async () => {
  //   if (currentUser) {
  //     if (currentUser.isAvatarImageSet) {
  //       const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //       setContacts(data.data);
  //     }else {
  //       navigate("/setAvatar");
  //     }
  //   }
  // };fetchData();}, [currentUser]);


  // const handleChatChange = (chat) => {
  //   setCurrentChat(chat);
  // };





















// import Header from "../components/Header"
// import ShowKeeper from "../components/ShowKeeper"
// import CreateArea from "../components/CreateArea"
// import { useState, useEffect  } from "react"
// import axios from "axios"
// import Footer from "../components/Footer"

// function Homepage() {

//   const [ keeperList, setKeeperList ] = useState([])

//   useEffect(() => {
//     axios.get("http://localhost:3001/api/getAll")
//     .then(res => setKeeperList(res.data))
//   }, [])

//   return (
//     <div className="App">
//       <Header />
//       <CreateArea keeperList={keeperList} setKeeperList={setKeeperList} />
//       <ShowKeeper keeperList={keeperList} setKeeperList={setKeeperList} />
//       <Footer />
//     </div>
//   );
// }

// export default Homepage;
