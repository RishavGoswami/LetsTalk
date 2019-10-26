import React from "react";

// styles
import "./styles.css";

// utils
import { capitalization } from "../../utils/functions";

const ChatHeader = ({ chatRoom }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img
        className="onlineIcon"
        src={
          "https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/onlineIcon.png"
        }
        alt="online icon"
      />
      <h3>{capitalization(chatRoom)}</h3>
    </div>
  </div>
);

export default ChatHeader;
