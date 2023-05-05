const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../config/generateToken");
const mongoose = require("mongoose");
const Movie = require("../models/movieModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const movies = await Movie.find();
  let seatbooked=[];
  for(i in movies){
    let obj={
      movieId:movies[i]._id
    }
    seatbooked.push(obj);
  }
  const user = await User.create({
    name,
    email,
    password,
    seatbooked
  });
  
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
 
  // const func = await user.matchPassword(password);
  // console.log(func)
  // console.log(user)
  try{
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
    
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
          });
      }else{
        return res.send("error");
      }

  }catch(err){
     return res.send(err.message);
  }
  
});
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  });

  const getUser = asyncHandler(async (req, res) => {
    try {
      const _id = req.params.id;
      var isValid = mongoose.Types.ObjectId.isValid(_id);
      if (!isValid) {
        return res.json({
          status: false,
          data: null,
          error: {
            code: 404,
            message: "user id is invalid",
          },
        });
      }
      const userEvent = await User.findById(_id);
      if (!userEvent) {
        const message = "user doesn't exists";
        return res.json({
          status: false,
          data: null,
          error: {
            code: 404,
            message: "user doesn't exist!",
          },
        });
      } else {
        console.log("user found");
        return res.json({
          status: true,
          data: {
            data: userEvent,
            message: "user found",
          },
        });
      }
    } catch (err) {
      return res.json({
        status: false,
        data: null,
        error: {
          code: 500,
          message: "Error in getting User!" + err,
        },
      });
    }
  });
module.exports = { registerUser,authUser,allUsers ,getUser};
