const jwt = require('jsonwebtoken')
const { Users } = require('../../models');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
  // TODO: urclass의 가이드를 참고하여 GET /accesstokenrequest 구현에 필요한 로직을 작성하세요.
  // console.log(req.headers["authorization"].slice(7,))
  // const userInfo = await Users.findOne({
  //   where: { userId: req.body.userId},
  // });

  if(req.headers["authorization"]===undefined){
    res.status(400).json({"data":null, "message":"invalid access token"})
  }
  else{
 
     const data = jwt.verify((req.headers["authorization"].slice(7,)),process.env.ACCESS_SECRET)

  const userInfo = await Users.findOne({
    where: { userId: data.userId},
  });
  
  if(!userInfo) res.status(400).json({"data":null, "message" : "access token has been tempered"})
  else{

    return res.status(201).json({"data":{"userInfo":{
      "id":userInfo.dataValues.id,
      "userId":userInfo.dataValues.userId,
      "email":userInfo.dataValues.email,
      "createdAt":userInfo.dataValues.createdAt,
      "updatedAt":userInfo.dataValues.updatedAt
    
    }},"message":"ok"})
  }


  }
};
