const express=require('express');
const router=express.Router();
const { registerUser,authUser,allUsers ,getUser}=require('../controllers/userControllers');
const {sendMail} = require('../controllers/mailController');
const {protect} =require("../middleware/authMiddleware");

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post('/login',authUser);
router.get('/:id',protect,getUser);
router.post('/email',sendMail);
module.exports=router;
