const users = [];

const addUser = ({ id, name, chatRoom }) => {
  name = name.trim().toLowerCase();
  chatRoom = chatRoom.trim().toLowerCase();

  // check if the user is already logged in
  const isUserAlreadyLoggedIn = users.find(
    user => user.chatRoom === chatRoom && user.name === name
  );

  // if yes, return an error
  if (isUserAlreadyLoggedIn) return { error: "Username is taken!!!" };

  // else create a user and push it to ther user array
  const user = { id, name, chatRoom };

  users.push(user);

  return { user };
};

const removeUser = id => {
  // check if the user is available inside the user list
  const index = users.findIndex(user => user.id === id);

  // if yes, remove it.
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = id => users.find(user => user.id === id);

const getUserInRoom = chatRoom =>
  users.filter(user => user.chatRoom === chatRoom);

const capitalization = string => {
  console.log("string:", string);
  return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUserInRoom,
  capitalization
};
