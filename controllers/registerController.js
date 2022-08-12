const User = require("../model/User");
const bcrypt = require("bcrypt");

const generatePassword = () => {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var string_length = 10;
  var randomPassword = "";
  for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomPassword += chars.substring(rnum, rnum + 1);
  }
  return randomPassword;
};

const handleNewUser = async (req, res) => {
  const {
    firstName,
    lastName,
    companyId,
    aadharNumber,
    panNumber,
    mobileNumber,
    address,
  } = req.body;
  if (!firstName || !companyId || !panNumber)
    return res.status(400).json({
      message: "Pan number, first name and company id are required.",
    });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ userId: panNumber }).exec();
  if (duplicate)
    return res
      .status(409)
      .json({ status: false, message: "User already exists." }); //Conflict

  const password = generatePassword();

  const newUser = {
    userId: panNumber,
    firstName: firstName,
    lastName: lastName,
    panNumber: panNumber,
    aadharNumber: aadharNumber,
    mobileNumber: mobileNumber,
    address: address,
    companyId: new Object(companyId),
    password: password,
  };

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = await User.create({
      userId: panNumber,
      firstName: firstName,
      lastName: lastName,
      panNumber: panNumber,
      aadharNumber: aadharNumber,
      mobileNumber: mobileNumber,
      address: address,
      companyId: new Object(companyId),
      password: hashedPwd,
    });

    res
      .status(201)
      .json({ status: true, message: "new user created.", result: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
