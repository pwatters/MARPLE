const bcrypt = require("bcrypt");
const User = require("./models/User");

const insertUser = async () => {
  try {
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await User.create({ username, passwordHash });
  } catch (err) {
    console.log(`Error inserting user. ${err}`);
  }
};

module.exports = insertUser;
