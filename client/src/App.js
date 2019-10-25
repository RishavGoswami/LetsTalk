import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// components
import UserJoined from "./component/UserJoined";
import Chat from "./component/Chat";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={UserJoined} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
};

export default App;
