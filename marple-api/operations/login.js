const bcrypt = require("bcrypt");
const User = require("../models/User");

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });

  if (!user) {
    return null;
  }

  return await bcrypt.compare(password, user.passwordHash);
};

module.exports = login;
