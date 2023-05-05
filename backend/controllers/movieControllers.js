const Movie = require("../models/movieModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const { default: axios } = require("axios");

module.exports.postMovie = async (req, res) => {
   try{
    const movie = new Movie(req.body);
    const createMovieEvent = await movie.save();
    // const user = await User.find();
    // for(i in user){
    //   const IndiUser = await User.findById(user[i]._id);
    //   let obj={
    //     movieId:createMovieEvent._id
    //   }
    //   IndiUser.seatbooked.push(obj);
    //   await IndiUser.save();
    //   // console.log(IndiUser);
    // }
    res.status(201).send(createMovieEvent);

  }catch(e){
    res.status(400).send(e);
  } 
};
// get all side events
module.exports.getAllMovies = async (req, res) => {
  try {
    console.log("[movieEvents: getAllMovies] getting all Movie events");

    const movieEvents = await Movie.find();
    if (movieEvents) {
      console.log("[movieEvents: getAllMovies] all movies retrieved");

      return res.json({
        status: true,
        data: movieEvents,
      });
    } else {
      console.log("[movieEvents: getAllMovies] No movies available!");

      return res.json({
        status: true,
        data: {
          message: "No movies!",
        },
      });
    }
  } catch (err) {
    const message =
      "[movieEvents: getAllMovies] Error while getting all movies " + err;

    console.log("[movieEvents: getAllMovies] Error:", err);

    return res.json({
      status: false,
      data: null,
      error: {
        code: 404,
        message: "Error in getting movies!",
      },
    });
  }
};

// get event with _id = id
module.exports.getMovieById = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    console.log("[movieEvents: getMovieById] req params", req.params);

    var isValid = mongoose.Types.ObjectId.isValid(_id);
    if (!isValid) {
      const message = "[movieEvents: getMovieById] movie id is invalid";

      console.log(message);
      return res.json({
        status: false,
        data: null,
        error: {
          code: 404,
          message: "movie id is invalid",
        },
      });
    }

    console.log("[movieEvents: getMovieById] movie id is valid");
    const movieEvent = await Movie.findById(_id);
    if (!movieEvent) {
      const message = "[movieEvents: getMovieById] movie doesn't exists";

      console.log(message);

      return res.json({
        status: false,
        data: null,
        error: {
          code: 404,
          message: "movie doesn't exist!",
        },
      });
    } else {
      console.log("[movieEvents: getMovieById] movie found");

      return res.json({
        status: true,
        data: {
          data: movieEvent,
          message: "movie found",
        },
      });
    }
  } catch (err) {
    const message =
      "[movieEvents: getMovieById] error while getting movie by id " + err;

    console.log(message);

    return res.json({
      status: false,
      data: null,
      error: {
        code: 500,
        message: "Error in getting movie!",
      },
    });
  }
};

module.exports.bookMovie = async (req, res) => {
  try {
    const {movieId,seatnumber} = req.body;
    let movie = await Movie.findById(movieId);
   
    for(i in seatnumber){
       let obj = {
          seatNumber:seatnumber[i]
       }
       movie.seatBooked.push(obj);
    }
   
    await movie.save(); //saving it to the database
    res.send(movie);
  } catch (err) {
    return res.json({
      status: false,
      data: null,
      error: {
        code: 500,
        message: "Error in getting movie!" + err,
      },
    });
  }
};

module.exports.updateMovie = async (req, res) => {
  try {
    console.log("updatadse movei");
    const {movieId,userId,seatNumber} = req.body;
    let updateMovie;
    for(i in seatNumber){
      updateMovie = await Movie.updateOne({_id:movieId,"seatBooked.seatNumber":seatNumber[i]},
      {$set:{"seatBooked.$.userId":userId,"seatBooked.$.occupied":true}},{new:true}
      )
  
    }
    const findUser = await User.findById(userId);
    let OldArray;
    const bookedobj = findUser.seatbooked;
    for(i in bookedobj){
      if(((bookedobj[i].movieId).toString())===movieId){
        console.log(movieId);
         OldArray=bookedobj[i].booked;
      }
    }
  let len=0;
   for(i in seatNumber){
    OldArray.push(seatNumber[i]);
    len=len+1;
   }
  //  console.log(OldArray)
   const updateUser = await User.updateOne({_id:userId,"seatbooked.movieId":movieId},
      {$set:{"seatbooked.$.movieId":movieId,"seatbooked.$.booked":OldArray}},{new:true}
      )
      console.log("update movei");
      const findMovie = await Movie.findById(movieId);
      console.log(len)
      const data = {
        userEmail:findUser.email,
        seatNumber:seatNumber,
        name:findUser.name,
        mname:findMovie.moviename,
        price:len* (parseInt(findMovie.movietprice)),
        len:len,
        time:findMovie.movietime,
        pic:findMovie.pic
        
      }
      console.log("sending mail");
      //SENDING MAIL
      await axios
      .post("https://brainy-robe-bull.cyclic.app/api/user/email", data)
      .then((res) => {
        console.log(
          "[movieController : updateMovie] after making axios post request to MAILER!",
          res.data
        );
      })
      .catch(function (error) {
        console.log(
          "[movieController : updateMovie] error after making axios post request to MAILER",
          error
        );
      });


    res.send(updateUser + updateMovie);
  } catch (err) {
    return res.json({
      status: false,
      data: null,
      error: {
        code: 500,
        message: "Error in getting movie!" + err,
      },
    });
  }
};

