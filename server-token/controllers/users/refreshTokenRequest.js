const { Users } = require('../../models');
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
const { compile } = require('morgan');
dotenv.config();
module.exports = async (req, res) => {
  // TODO: urclass의 가이드를 참고하여 GET /refreshtokenrequest 구현에 필요한 로직을 작성하세요.
  let data;
  if(!req.cookies.refreshToken) res.status(400).json({"data":null, "message":"refresh token not provided"})
  else{


  
    try {
      data = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET)
    } catch (error) {
     res.status(400).json({"data":null, "message":"invalid refresh token, please log in again"})
    }


    
 const userInfo = await Users.findOne({
  where: { userId: data.userId},
});

  if(!userInfo){
    console.log("test1x")
    res.status(400).json({"data":null, "message":"invalid refresh token, please log in again"})
  }
  else{
    const accessToken = jwt.sign({
      "id" : userInfo.dataValues.id,
      "userId" : userInfo.dataValues.userId,
      "email" : userInfo.dataValues.email,
      "createdAt" : userInfo.dataValues.createdAt,
      "updatedAt" : userInfo.dataValues.updatedAt
    },process.env.ACCESS_SECRET,{
      expiresIn : "120m"
    })


    
    res.status(201).json({"data":{"accessToken":accessToken,"userInfo":{
      "id":userInfo.dataValues.id,
      "userId":userInfo.dataValues.userId,
      "email":userInfo.dataValues.email,
      "createdAt":userInfo.dataValues.createdAt,
      "updatedAt":userInfo.dataValues.updatedAt
    
    }},"message":"ok"})
  }
  }
};
