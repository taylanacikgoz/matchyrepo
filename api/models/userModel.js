const User = require("../../data/schema/userSchema");

const getAllUser = async () => {
  const allUsers = await User.find();
  const userNames = await allUsers.map((user) => user.username);
  return userNames;
};

const filteredUsername = async ({ username }) => {
  const filteredValue = await User.findOne({
    username: username,
  });
  return filteredValue;
};

const createUser = async ({ username, email, password }) => {
  const newUser = await User.create({
    username: username,
    email: email,
    password: password,
  });
  return newUser;
};

module.exports = { getAllUser, filteredUsername, createUser };
