const mongoose = require("mongoose");
require("../config/db");
const Collection = require("../config/Collection");
const CompanySchema = new mongoose.Schema({
        company_id:{type:Number,required:[true,"id is required , Should be of type String"]},
        company_name:{type:String,required:[true,"name is required , Should be of type Integer"]},
        company_url:{type:String,required:[true,"url is required , Should be of type String"]},
    })
const AdsDesSchema = new mongoose.Schema({
    company_id:{type:Number,required:[true,"id is required , Should be of type String"]},
    primary_text:{type:String},
    headline:{type:String},
    description:{type:String},
    cta:{type:String},
    image_url:{type:String}

})    
const ads =  mongoose.model(Collection.Advertisement_Company,CompanySchema);
const allAds =  mongoose.model(Collection.Advertisement_Description,AdsDesSchema);
module.exports = {
    GetAdvertisement:async function(keyw){
        let response = {};
        console.log(keyw)
        try{
            const result = await allAds.aggregate([
                {
                    $match:{"headline":{$regex:`${keyw}`,$options:"i"}}
                },
                {
                  $lookup:
                    {
                      from: "adcompanies",
                      localField: "company_id",
                      foreignField: "company_id",
                      as: "Company"
                    }
               }
             ]);
            if(result){
                return result;
            }      
        }catch(error){
           response.status = "Failed";
           response.message = "Data Not Found";      
        }
        return response;
    }

    ,
    async getAllAds()
    {
        const res  = {}
        try{
            const all_ads = await allAds.find();
            if(all_ads){
                res.status = "success";
                res.data = all_ads
            }
            else{
                res.status = "failed";
            }
        }
        catch(err){
            res.status = "failed";
        }
        return res;
    }
}