const mongoose = require("mongoose");
const movieSchema = mongoose.Schema(
  {
    moviename: { type: String, required: true },
    movietprice: { type: String, required: true },
    movietime: { type: String, required: true },
    moviepic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    moviedescription: { type: String},
    seatBooked: [
      {
        userId: {
          type:String,
          default:"neha" 
        },
        seatNumber: {
          type: Number,
          default: 0,
        },
        occupied: {
          type: Boolean,
          default: false,
        }
      },
    ]

  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
