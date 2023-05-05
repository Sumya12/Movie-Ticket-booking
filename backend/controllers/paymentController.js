const mongoose = require("mongoose");
const Razorpay = require("razorpay");
var crypto = require("crypto");


module.exports.payMoney = async (req, res) => {
  const { amount } = req.body;
  try {
    let instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET });

    var options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send({ data: order });
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.verifyPayment = async (req, res) => {
  try {
    let body =
      req.body.response.razorpay_order_id +
      "|" +
      req.body.response.razorpay_payment_id;

    
    var expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body.toString())
      .digest("hex");
   
    if (expectedSignature === req.body.response.razorpay_signature){
      return res.status(200).send({message:'Sign Valid'});
    }
    res.status(400).send({message:'Sign Invalid'});
    
  } catch (e) {
    res.status(400).send(e);
  }
};
