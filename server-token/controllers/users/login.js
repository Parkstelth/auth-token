const { Users } = require('../../models');
const jwt = require('jsonwebtoken')

const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
  // TODO: urclass의 가이드를 참고하여 POST /login 구현에 필요한 로직을 작성하세요.
  const userInfo = await Users.findOne({
    where: { userId: req.body.userId, password: req.body.password },
  });


  if (!userInfo) {
    
   res.status(400).json({"data":null,"message":'not authorized'})
  } else {
   
    const accessToken = jwt.sign({
      "id" : userInfo.dataValues.id,
      "userId" : userInfo.dataValues.userId,
      "email" : userInfo.dataValues.email,
      "createdAt" : userInfo.dataValues.createdAt,
      "updatedAt" : userInfo.dataValues.updatedAt
    },process.env.ACCESS_SECRET,{
      expiresIn : "120m"
    })
    const refreshToken = jwt.sign({
      "id" : userInfo.dataValues.id,
      "userId" : userInfo.dataValues.userId,
      "email" : userInfo.dataValues.email,
      "createdAt" : userInfo.dataValues.createdAt,
      "updatedAt" : userInfo.dataValues.updatedAt
    },process.env.REFRESH_SECRET,{
      expiresIn : "60m"
    })
    const option={
      sameSite: "none",
      secure:true,
      httpOnly:true,
    }
    res.cookie('refreshToken',refreshToken,option)
    res.status(201).json({"data":{"accessToken":accessToken},"message":"ok"})
  
  }
};
