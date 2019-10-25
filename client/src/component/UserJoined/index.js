import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const UserJoined = () => {
  // name is the variable, setName is a function to set the name, initialized as empty
  const [name, setName] = useState("");
  const [chatRoom, setChatRoom] = useState("");

  return (
    <div className="userJoinedContainer">
      <div className="userJoinedInnerContainer">
        <h3 className="heading">Hey there! Let's talk...</h3>
        <input
          placeholder="Name"
          className="userJoinedInput"
          type="text"
          onChange={event => setName(event.target.value)}
        />
        <input
          placeholder="Chat Room"
          className="userJoinedInput mt-20"
          type="text"
          onChange={event => setChatRoom(event.target.value)}
        />
        <Link
          onClick={event =>
            !name || !chatRoom ? event.preventDefault() : null
          }
          to={`/chat?name=${name}&chatRoom=${chatRoom}`}
        >
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserJoined;
