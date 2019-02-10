var mongoose = require('mongoose');
var nameSchema = new mongoose.Schema({
    mailChimp:{
        id:String, 
        token:String,       
        email:String, 
        name:String, 
        api_endpoint:String, 
        connected:Boolean },
    activeCampaign:{
        id: String,
        token: String,
        email: String,
        name: String, 
        api_endpoint:String, 
        connected:Boolean},
    aweber:{
        id: String,
        token: String,
        email: String,
        name: String, 
        api_endpoint:String, 
        connected:Boolean},
    constantContact:{
        id: String,
        token: String,
        email: String,
        name: String, 
        api_endpoint:String, 
        connected:Boolean},
    drip:{
        id: String,
        token: String,
        email: String,
        name: String, 
        api_endpoint:String,
        connected:Boolean},
    getResponse:{
        id: String,
        token: String,
        email: String,
        name: String, 
        api_endpoint:String, 
        connected:Boolean},
    });
module.exports = mongoose.model('User', nameSchema);