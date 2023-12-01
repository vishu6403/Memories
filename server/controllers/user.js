  import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  
  //req.body gets data from post requests
  const { email, password } = req.body;

  try {
    //check for existing user by email
    const oldUser = await UserModal.findOne({ email });
    //if user is not found in database
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    //this compares the password entered with the existing user password
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    
    //if password is not correct, it doesn't match
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    //if user exists and password matches, get json web token and store all the required info, secret string which only you know, expiration time
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
    
    //returns token, sends results (token)
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};



export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {

    //to find if user already exists
    const oldUser = await UserModal.findOne({ email });

    
    // if email already exists
    if (oldUser) return res.status(400).json({ message: "User already exists" });

    //if user doesn't already exist, create new user
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    //create user, pass all the data
    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
    
    //create token for user
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    //user is the result
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};
