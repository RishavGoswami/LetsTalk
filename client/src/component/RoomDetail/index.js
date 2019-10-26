import React from "react";

// styles
import "./styles.css";

// util
import {
  capitalization,
  getDate,
  getTime,
  getInitials
} from "../../utils/functions";

const RoomDetail = ({ users }) => (
  <div className="roomDetailContainer">
    <h2>
      Chat Room
      <span role="img" aria-label="emoji" className="pl-10">
        💬
      </span>
    </h2>
    {users ? (
      <div className="wrapper">
        <div className="alignCenter box">
          <h3 className="participants">{users.length}</h3>
          <h3>Currently active</h3>
        </div>
        <div className="alignCenter box">
          <h3 className="dateAndTime">{getDate()}</h3>
          <h3 className="dateAndTime">{getTime()}</h3>
          <h4 className="startTime">Start time</h4>
        </div>
        <div className="leaveChatRoom">
          <a href="/" className="leaveButton">
            Leave
          </a>
        </div>
        <div className="activeContainer">
          <h3>Participants</h3>
          <h3>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                <div className="initials">{getInitials(name)}</div>
                {capitalization(name)}
                <img
                  alt="Online Icon"
                  src={
                    "https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/onlineIcon.png"
                  }
                />
              </div>
            ))}
          </h3>
        </div>
      </div>
    ) : null}
  </div>
);

export default RoomDetail;
