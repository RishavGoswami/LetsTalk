import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [chatRoom, setChatRoom] = useState("");
  const END_POINT = "localhost:5000";

  useEffect(() => {
    const { name, chatRoom } = queryString.parse(location.search);

    socket = io(END_POINT);

    setName(name);
    setChatRoom(chatRoom);

    socket.emit("onJoin", { name, chatRoom }, ({ error }) => {
      console.log(error);
    });

    // disconnect the connection when component unmounts 
    return () => {
      socket.emit("disconnect");
      socket.off()
    };

  }, [END_POINT, location.search]);

  return <div>Chat</div>;
};

export default Chat;
