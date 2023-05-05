const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true,maxLength:500 },
    seatbooked:[
      {
        movieId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Movie"
        },
        booked:
          {
            type:[Number],
          }
      }
    ]
  },
  { timestamps: true }
);
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if(this.isModified || this.isNew){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }else{
    next();
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
