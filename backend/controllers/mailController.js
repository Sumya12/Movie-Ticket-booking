const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const sendMail = (req, res) => {

    const { userEmail,seatNumber,len,name,mname,time,pic,price } = req.body;
    console.log(process.env.EMAIL)
    console.log(process.env.PASSWORD)
    let config = {
        service : 'gmail',
        auth : {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "MovieBooking",
            link : 'https://brainy-robe-bull.cyclic.app/'
        }
    })

    let response = {
        body: {
            name : name,
            intro: `You have successfully booked  ${len} tickets for the movie ${mname}!`,
            table : {
                data : [
                    {
                        movie : `${mname}`,
                        timings: `${time}`,
                        price : `${price}`,
                    }
                ]
            },
            outro: `seat Numbers are ${seatNumber}`,
            
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : process.env.EMAIL,
        to : userEmail,
        subject: `Successfull booked tickets for ${mname}`,
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("getBill Successfully...!");
}
module.exports = {
   sendMail
}