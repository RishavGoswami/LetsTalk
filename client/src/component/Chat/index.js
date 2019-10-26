import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

// style
import "./styles.css";

// component
import ChatHeader from "../ChatHeader/";
import Input from "../Input/";
import Messages from "../Messages/";
import RoomDetail from "../RoomDetail/";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [chatRoom, setChatRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const END_POINT = "localhost:5000";

  useEffect(() => {
    const { name, chatRoom } = queryString.parse(location.search);

    socket = io(END_POINT);

    setName(name);
    setChatRoom(chatRoom);

    socket.emit("onJoin", { name, chatRoom }, () => {});

    // disconnect the connection when component unmounts
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [END_POINT, location.search]);

  useEffect(() => {
    socket.on("adminMessage", message => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <ChatHeader chatRoom={chatRoom} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
        />
      </div>
      <RoomDetail users={users} />
    </div>
  );
};

export default Chat;
