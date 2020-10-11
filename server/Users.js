let Users = [];

const addUser = (userData) => {
  const existingUser =  Users.find((user) => user.name === userData.name && user.room === userData.room )
  if (existingUser) return {error: 'User exists'}
  Users.push(userData);
  return {user: userData}
};

const removeUser = (id) => {
  const index = Users.findIndex((user) => user.id === id); // returnd index if found -1 if not found
  console.log(index)
  if (index !== -1) {
    const {name, room} = Users.splice(index, 1)[0]
    return {name, room}
  }
  else return "no such user";
};

module.exports = { addUser, removeUser };
