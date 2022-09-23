const express = require("express");
const myads = require("../model/Myads");
const querystring = require("querystring");
const url = require("url")
const router = express.Router();
router.get("/ads", async (request,response)=>{
    const x = await querystring.parse(url.parse(request.url).query);
    myads.GetAdvertisement(x.keyword).then((result)=>{
        response.json(result);
    })
    
})
router.get("/getAllAds", async (request,response)=>{
  const res =  await myads.getAllAds()
  response.json(res)
    
})
module.exports = router;