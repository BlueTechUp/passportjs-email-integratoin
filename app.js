const express = require('express'),
 path = require('path'),
 bodyParser = require('body-parser'),
 cors = require('cors'),
 passport = require('passport'),
 session = require('express-session'),
 request = require('request'),
 passportMailchimp = require('passport-mailchimp'),
 passportAweber = require('passport-aweber'),
 passportConstantContract = require('passport-constantcontact'),
 passportOAuth2 = require('passport-oauth2'),
 ActiveCampaign = require('activecampaign'),
 cookieParser = require('cookie-parser'),
 popupTools = require('popup-tools'),
 mongoose = require('mongoose'),
 passportOAuth1 = require('passport-oauth1'),
 passportCampaignMonitor = require('passport-campaignmonitor'),
 MailChimpStrategy = passportMailchimp.Strategy,
 AweberStrategy = passportAweber.Strategy,
 ConstantContactStrategy = passportConstantContract.Strategy,
 CampaignMonitorStrategy = passportCampaignMonitor.Strategy,
 OAuth2Strategy = passportOAuth2.Strategy,
 ConstantContact = require('node-constantcontact');

 var SibApiV3Sdk = require('sib-api-v3-sdk');
 var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

var NodeAweber = require('aweber-api-nodejs');
var $apiKey = 'apikey';
var Mailerlite = require('mailerlite-nodejs-api/index');
var mailerlite = new Mailerlite("e93af08bc1884bce79e626281ce03b2b");
 
var $ML_Subscribers = mailerlite.subscribers;
var $ML_Campaigns = mailerlite.campaigns;
var $ML_lists = mailerlite.lists;

 var Mailchimp = require('mailchimp-api-v3')
 const aweberApi = require('aweber-api');

 var CAMPAIGN_MONITOR_ID='116317';
 var CAMPAIGN_MONITOR_SECRET_KEY='Mm28B8fY3k4uK8g5V9NqVy36xAfYg0L604o4Z59861nQ17n5Zo56GYFjQohT8tay4dub8q39Op4Y0cvz';
 var createsend = require('createsend-node');
 
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname));
app.use(cookieParser());
app.use(cors({origin: 'http://127.0.0.1:4000'}));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ng7crud', { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
mongoose.set("debug", true) ;
//-----------------------------------MongoDB------------------------------------------------
var nameSchema = new mongoose.Schema({
  mailChimp:{
    id:String, 
    token:String, 
    email:String, 
    name:String, 
    api_endpoint:String, 
    connected:Boolean },
  activeCampaign:{
    id:String, 
    username:String, 
    first_name:String, 
    trackid:String, 
    apiurl: String, 
    apikey: String, 
    connected:Boolean},
  aweber:{
    id: String, 
    token: String,
    tokenSecret: String, 
    connected:Boolean},
  constantContact:{
    id: String,
    token: String,
    name: String, 
    expires_in:String, 
    connected:Boolean},
  drip:{
    id: String,         // current setted access token
    token: String,
    connected:Boolean},
  getResponse:{
    id: String ,        // set apikey
    apikey: String,
    connected: Boolean
  },
  contactually:{
    id:String,
    connected:Boolean
  }
 });
var User = mongoose.model("User", nameSchema);
var mailSchema = new mongoose.Schema({
  mailChimp:{
    id: String, 
    token:String, 
    glist_id:String, 
    gskip_double_optin:Boolean, 
    clist_id:String, 
    cskip_double_optin:Boolean},
  activeCampaign:{
    id:String, 
    username:String, 
    trackid:String, 
    apiurl: String, 
    apikey: String, 
    glist_id:String, 
    gform_id:String, 
    clist_id:String, 
    cform_id:String},
  aweber:{
    id: String, 
    token:String,
    tokenSecret:String,
     glist_id:String, 
     gtagstring:String, 
     clist_id:String, 
     ctagstring:String},
  constantContact:{
    id: String, 
    token:String, 
    glist_id:String, 
    clist_id:String},
  drip:{
    id: String, 
    token:String, 
    name: String, 
    gaccountListID:String, 
    caccountListID:String, 
    gcampaignListID:String, 
    ccampaignListID: String, 
    gtagString: String, 
    ctagString:String, 
    goptEvent:String, 
    coptEvent:String,
    gdoubleopt:Boolean,
    cdoubleopt:Boolean
  },
  getResponse:{
    id: String, 
    apikey:String,
    glist_id:String,            // form id
    clist_id:String}
});
var savedInfo = mongoose.model("SavedInfo", mailSchema);

//---------------------------------------------------------------------------------------------------------------------

 aweberConsumerKey = 'AkSCdbUQnRt2Wl5NWB0uA5IY',
 aweberConsumerSecret= '3gsiVoQaRd1FJene29C5rxLFEmfepQNk67QdeLlk',
 aweberAppID = 'ebc8a5c8',
 constantcontactClientId = 'h9wggn63yzd57rkkc9yrf6fa',
 constantcontactClientSecret = 'WfkgZFKYnrg3eZwRJNcXcdAs',

 contactuallyAppId = '44df2b35765ab87bdf8c272a60b413c4cf1b00cbf34e88f02277ff97a4f39478',
 contactuallyClientSecret = 'f9ddf91decc5c65f71965b26cdbb67109b3fc6c6064f7b8092f301531d3a4ae9'

 
app.post('/convertkit/test', function(req, res){
 
  request(options, function (error, response, body) {
  if (response && (response.statusCode === 200 || response.statusCode === 201)) {
    var xml = body;
    var result111 = convert.xml2json(xml, {compact: true, spaces:4});
    console.log(result111);
  }
  console.log(body);
});
})
 
/*******************************************contactually ***************************/
passport.use('contactually', new OAuth2Strategy({
  authorizationURL:   'https://auth.contactually.com/oauth2/authorize',
  tokenURL:           'https://auth.contactually.com/oauth2/token',
  clientID:            contactuallyAppId,
  clientSecret:        contactuallyClientSecret,
  callbackURL:        'http://localhost:4000/contactually/callback'},
  function(accessToken, refreshToken, profile, cb){
    console.log(accessToken);
    // use api
    var data = {

    };
    data.first_name = 'jonas';
    data.last_name = 'hh3h';
    data.email_addresses = [{address: 'hesd@outlook.com'}];

    var options = { method: 'POST',
  url: 'https://api.contactually.com/v2/contacts',
  qs: { upsert: 'true%0A' },
  headers: 
   { 
     Authorization: 'Bearer ' + accessToken,
     'Content-Type': 'application/json',
     Accept: 'application/json' },
  body: { 
    data:data },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

  } 
));

app.get('/contactually/authorize', passport.authenticate('contactually',{scope:['contacts:manage']}));
app.get('/contactually/callback', passport.authenticate('contactually', { failureRedirect: 'http://127.0.0.1:4000/contactually' }),
  function(req, res) {
    // Successul authentication, redirect home.
    console.log("contactually callback function called")
    res.set({ "content-type": "text/html; charset=utf-8" });
    res.end(popupTools.popupResponse(req.user));
});

 //constantcontactClientId = 'h9wggn63yzd57rkkc9yrf6fa',
 //constantcontactClientSecret = 'WfkgZFKYnrg3eZwRJNcXcdAs',

mailchimpClientId = '513494270713';
mailchimpSecretKey = '45123e9e27a4978ce4fb103fbaaaeac887c06c7c9a55d5bae6';
mailchimpApiKey = '9aa98c691aec5776fe625716ddf9942d-us20'

dripClientId = 'eedb38132c481142b5c3216999ae4ee8fe0496d1266c3083dbe75d8b22a9fe78';
dripClientSecret =  '4269caf9532c1f7332106679a442283a2f3ffb486c6b253a41a4f05b0bdf4dd4';
// return code=5a0142cd1f4bd2ee325866e898b154249317a9db16a6fc5067ee4b0844fdb5a6

// *************************************drip *****************************************************

passport.use('drip', new OAuth2Strategy({
  authorizationURL: 'https://www.getdrip.com/oauth/authorize',
  tokenURL: 'https://www.getdrip.com/oauth/token',
  clientID: dripClientId,
  clientSecret: dripClientSecret,
  callbackURL: "http://127.0.0.1:4000/drip/callback",},
  function(accessToken, refreshToken, profile, cb) {
  // console.log("dripOAuth accessToken=" + accessToken);
      var searchQuery = {
      'drip.id':accessToken
    };
    var updates = {
      'drip.connected':true,
      'drip.token':accessToken,
    };
    var options = {
      upsert: true,
      new: true
    };
    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return cb(err);
      } else {
        return cb(null, user);
      }
    });
  }
));
app.post('/drip/authorize', passport.authenticate('drip'));
app.get('/drip/callback', passport.authenticate('drip', { failureRedirect: 'http://127.0.0.1:4000/drip' }),
  function(req, res) {
    // Successul authentication, redirect home.
    console.log("drip callback function called")
    res.set({ "content-type": "text/html; charset=utf-8" });
    res.end(popupTools.popupResponse(req.user));
});



app.post('/drip/getAccountlist', function(req, res){
  console.log("getAccountlist called");
  if (req.body && req.body.user){
    // at drip-nodejs token: token, accountid: must get from listaccount function
    const client = require('drip-nodejs')({ token:req.body.user.id, tokenType:"Bearer", accountId:dripClientId });
    client.listAccounts()
      .then((response) => {
        // Handle `response.body`
        var accounts = response.body.accounts;
        var retData = [];
        if (accounts.length > 0){
          for (i in accounts){
            var accID = accounts[i].id;
            var accName = accounts[i].name;
            var clients = require('drip-nodejs')({ token:req.body.user.id, tokenType:"Bearer", accountId:accID });
            clients.listCampaigns("all")
            .then((response) =>{
              var retDataItem = {
                'accountID': accID,
                'name' : accName,
                'campaigns': response.body.campaigns
              };
              retData.push(retDataItem);
              console.log(retDataItem);
              res.send({success: true, data: retData})
            })
            .catch((error) =>{
              console.log(error);
              res.send({success: false, data:null});
            });
          }
        }
      })
      .catch((error) => {
        // Handle errors
        console.log(error);
        res.send({success: false, data:null});
      });
  }
});
app.post('/drip/save', function (req, res){
  console.log("drip/save callled");
  if (req.body && req.body.user){
    var userinfo = req.body.user;
    var gacclist_id = req.body.gacclist_id;
    var cacclist_id = req.body.cacclist_id;
    var gcamplist_id = req.body.gcamplist_id;
    var ccamplist_id = req.body.ccamplist_id;
    var geventString = req.body.geventString; 
    var ceventString = req.body.ceventString;
    var gtagString = req.body.gtagString;
    var ctagString = req.body.ctagString;
    var gdouble_opt = req.body.gdouble_opt;
    var cdouble_opt = req.body.cdouble_opt
    var searchQuery = {
      'drip.id':userinfo.id
    };
    var updates = {
      'drip.id' : userinfo.id,
      'drip.token':userinfo.token,
      'drip.gaccountListID': gacclist_id,
      'drip.caccountListID': cacclist_id,
      'drip.gcampaignListID':gcamplist_id, 
      'drip.ccampaignListID':ccamplist_id,
      'drip.goptEvent':geventString, 
      'drip.coptEvent':ceventString, 
      'drip.gtagString':gtagString, 
      'drip.ctagString':ctagString, 
      'drip.gdoubleopt':gdouble_opt, 
      'drip.cdoubleopt':cdouble_opt
    };
    var options = {
      upsert: true,
      new: true
    };
    // update the user if s/he exists or add a new user
    savedInfo.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        res.send({success: false});
      } else {
        res.send({success: true})
      }
    });
  }
});

app.post('/drip/getSaveInfo', function(req, res){
  console.log("called drip/getsaveinfo");
  var userInfo = req.body.user;
  mongoose.connection.db.listCollections({name: 'savedinfos'}).next(function(err, collinfo){
    if (collinfo){
      savedInfo.findOne({'drip.id':userInfo.id, 'drip.token': userInfo.token}, function(err, saveinfo){
        if (err){
          res.send({success: false}); // there is no saved information
        }
        if (saveinfo){
          res.send({
            success:      true, 
            gaccountListID: saveinfo.drip.gaccountListID,
            caccountListID:  saveinfo.drip.caccountListID, 
            gcampaignListID:     saveinfo.drip.gcampaignListID,
            ccampaignListID:  saveinfo.drip.ccampaignListID, 
            gdoubleopt:     saveinfo.drip.gdoubleopt,
            cdoubleopt:     saveinfo.drip.cdoubleopt,
            gtagString:     saveinfo.drip.gtagString,
            ctagString:     saveinfo.drip.ctagString,
            goptEvent:      saveinfo.drip.goptEvent,
            coptEvent:      saveinfo.drip.coptEvent,
          });
        }
        else{
          res.send({success: false});
        }
      });
    }
    else{
      res.send({success: false});
    }
  });
})

app.post('/drip/getConnectState', function(req, res){
mongoose.connection.db.listCollections({name: 'users'}).next(function(err, collinfo){
  if (collinfo){
    User.findOne({'drip.connected':true}, function(err, user){
      if (err){
          res.send({connected:false}); // first connected
          }
      if (user){
          res.send({connected: true, data: user.drip})    
          }
    });
  }
  else{
    res.send({connected: false}); // 
  }
  if (err){
    console.log(err);
    res.send({connected: false})
  }
});
});

app.post('/drip/logout', function(req, res){
if (req.body && req.body.user)
{
  var usrData = req.body.user;
  var searchQuery = {
    'drip.id':usrData.id,
    'drip.token':usrData.token
  };
  var updates = {
    'drip.connected': !usrData.connected
  };
  var options = {
  };
  // update the user if s/he exists
  User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
    if(err) {
      res.send({success: false, message:'Connected'});
    } else {
      req.logOut();
      res.send({ success: true, message: 'disConnected' });
    }
  });
} 
});
// OKay
app.post('/drip/dripSubmit', function (req, res){
  if (req.body && req.body.user){
    const client = require('drip-nodejs')({ token: req.body.user.id, tokenType:"Bearer",accountId: req.body.listid });
    const campaignId = req.body.campaignId;
    const payload = {
      subscribers: [{
        email: req.body.email, // get from req... param
        time_zone: "Asia/Kuala_Lumpur",
        custom_fields: {
          name: "Jonas Oliver"
        },
        tags:req.body.tagString,
      }]
    }
    client.subscribeToCampaign(campaignId, payload)
      .then((response) => {
        // Handle `response.body`
        console.log(response.body);
        res.send({success: true});
      })
      .catch((error) => {
        // Handle errors
        console.log(error);
        res.send({success: false, data:error.message});
      });
  }
});
//************************************************************************************************************ */

//********************************************* Mailchimp ******************************************************/

passport.use(new MailChimpStrategy({
    clientID: mailchimpClientId,
    clientSecret: mailchimpSecretKey,
    callbackURL: "http://127.0.0.1:4000/mailchimp/callback/"
    }, function (accessToken, refreshToken, profile, done) {
      var searchQuery = {
        'mailChimp.id':profile.id
      };
      var updates = {
        'mailChimp.connected':true,
        'mailChimp.token':profile.accessToken,
        'mailChimp.email':profile._json.login.email,
        'mailChimp.name' :profile._json.login.login_name,
        'mailChimp.api_endpoint':profile.api_endpoint,
        'mailChimp.dc': profile.dc
      };
      var options = {
        upsert: true,
        new: true
      };
      // update the user if s/he exists or add a new user
      User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
        if(err) {
          return done(err);
        } else {
          return done(null, user);
        }
      });
    }
));

app.get('/mailchimp/authorize', passport.authenticate('mailchimp'));
app.get('/mailchimp/callback', passport.authenticate('mailchimp', { failureRedirect: 'http://127.0.0.1:4000/mailchimp' }),
  function(req, res) {
    // Successul authentication, redirect home.
    console.log(req.metadata);
    res.set({ "content-type": "text/html; charset=utf-8" });
    res.end(popupTools.popupResponse(req.user));
});

var mailchimpApi;
app.post('/mailchimp/list', function(req, res){
  var userinfo = req.body.user;
  if (req.body && req.body.user){
    var apikey = userinfo.token + "-" + "us20";
    mailchimpApi = new Mailchimp(apikey);
    mailchimpApi.get({
      path: 'lists'
    })
    .then(function(result){
      console.log(result);
      res.json(result.lists);
    })
    .catch(function(error){
      console.log(error);
      res.status(500).json(err);
    });
  }else{
    res.send({ success: false});
  }
});

app.post('/mailchimp/save', function (req, res){
    if (req.body && req.body.user){
      var userinfo = req.body.user;
      var glist_id = req.body.glist_id;
      var gskip_double_optin = req.body.gskip_double_optin;
      var clist_id = req.body.clist_id;
      var cskip_double_optin = req.body.cskip_double_optin;
      var searchQuery = {
        'mailChimp.id':userinfo.id
      };
      var updates = {
        'mailChimp.token':userinfo.token,
        'mailChimp.glist_id':glist_id,
        'mailChimp.gskip_double_optin' : gskip_double_optin,
        'mailChimp.clist_id':clist_id,
        'mailChimp.cskip_double_optin' : cskip_double_optin,
      };
      var options = {
        upsert: true,
        new: true
      };
      // update the user if s/he exists or add a new user
      savedInfo.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
        if(err) {
          res.send({success: false});
        } else {
          res.send({success: true})
        }
      });
    }
});

app.post('/mailchimp/getSaveInfo', function(req, res){
  var userInfo = req.body.user;
  mongoose.connection.db.listCollections({name: 'savedinfos'}).next(function(err, collinfo){
    if (collinfo){
      savedInfo.findOne({'mailChimp.id':userInfo.id, 'mailChimp.token': userInfo.token}, function(err, saveinfo){
        if (err){
          res.send({success: false}); // there is no saved information
        }
        if (saveinfo){
          res.send({
            success:      true, 
            gdouble_opt:  saveinfo.mailChimp.gskip_double_optin, 
            glist_id:     saveinfo.mailChimp.glist_id,
            cdouble_opt:  saveinfo.mailChimp.cskip_double_optin, 
            clist_id:     saveinfo.mailChimp.clist_id
          });
        }
        else{
          res.send({success: false});
        }
      });
    }
    else{
      res.send({success: false});
    }
  });
})

app.post('/mailchimp/getConnectState', function(req, res){
  mongoose.connection.db.listCollections({name: 'users'}).next(function(err, collinfo){
    if (collinfo){
      User.findOne({'mailChimp.connected':true}, function(err, user){
        if (err){
            res.send({connected:false}); // first connected
            }
        if (user){
            res.send({connected: true, data: user.mailChimp})    
            }
      });
    }
    else{
      res.send({connected: false}); // 
    }
    if (err){
      console.log(err);
      res.send({connected: false})
    }
  });
});

app.post('/mailchimp/logout', function(req, res){
  if (req.body && req.body.user)
  {
    var usrData = req.body.user;
    var searchQuery = {
      'mailChimp.id':usrData.id,
      'mailChimp.token':usrData.token
    };
    var updates = {
      'mailChimp.connected': !usrData.connected
    };
    var options = {
    };
    // update the user if s/he exists
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        res.send({success: false, message:'Connected'});
      } else {
        req.logOut();
        res.send({ success: true, message: 'disConnected' });
      }
    });
  } 
});
 // OK 
app.post('/mailchimp/mailchimpSubmit', function (req, res){
  console.log('mailchimp submit function called');
  if (req.body && req.body.user){
    var userinfo = req.body.user;
    var listid =  req.body.listid;
    var email = req.body.email;
    mailchimpApi.get({
      path:'lists/' + listid + '/members'
    })
    .then(function(result){
      //console.log(result);
      mailchimpApi.post('lists/' + listid + '/members', {
        email_address : email,
        status: 'subscribed'
      })
      .then(function(result){
        //console.log(result);
        res.send({success:true})
      })
      .catch(function(error){
        //console.log(error);
        res.send({success:false, data:error.message});
      });
    })
    .catch(function(error){
      //console.log(error);
      res.send({success:false, data:error.message});
    });
  }else{
    res.send({ success: false, data:"unknown error"});
  }
});
app.get('/aweber/authorize',  passport.authenticate('aweber'));


//****************************************************** AWeber ********************************************************


passport.use(new AweberStrategy({
  consumerKey: aweberConsumerKey,
  consumerSecret: aweberConsumerSecret,
  callbackURL: "http://localhost:4000/aweber/callback",
  passReqToCallback: true
},function(req, token, tokenSecret, profile, done) {
  console.log(req);console.log(req.params.orgid);
  var accountid = "";
  const aw = new aweberApi(aweberConsumerKey, aweberConsumerSecret, {
    token: token,
    tokenSecret : tokenSecret
  });
  
  aw.get("https://api.aweber.com/1.0/accounts")
  .then(function(result){
    console.log(result);
    if (result.entries.length){
      accountid = result.entries[0].id;
    }
    var searchQuery = {
      'aweber.id': accountid
    }
    var updates = {
      'aweber.token': token,
      'aweber.connected':true,
      'aweber.tokenSecret':tokenSecret
    };
    var options = {
      upsert: true,
      new: true
    };
        // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } 
      else {
        return done(null, user);
      }
    });
  })
  .catch(function(err){
    console.log(error);
    return done(erro);
  })
   }
));



app.get('/aweber/callback', passport.authenticate('aweber', { failureRedirect: 'http://127.0.0.1:4000/aweber' }),
  function(req, res) {
    // Successul authentication, redirect home.
    console.log(req);
    res.set({ "content-type": "text/html; charset=utf-8" });
    res.end(popupTools.popupResponse(req.user));
});

app.post('/aweber/list', function(req, res){
  console.log('called /aweber/list');
  if (req.body && req.body.user){
    var userinfo = req.body.user;
    const aw = new aweberApi(aweberConsumerKey, aweberConsumerSecret, {
        token: userinfo.token,
        tokenSecret : userinfo.tokenSecret
  });
  aw.get("https://api.aweber.com/1.0/accounts/" + userinfo.id + "/lists")
      .then(function(result){
        console.log(result);
        res.json(result.entries);
      })
      .catch(function(err){
        console.log(err);
        res.status(500).json(err);
      })
  }   
});

app.post('/aweber/save', function (req, res){
  if (req.body && req.body.user){
    var userinfo = req.body.user;
    var glist_id = req.body.glist_id;
    var clist_id = req.body.clist_id;
    var gtagstring = req.body.gtagstring;
    var ctagstring = req.body.ctagstring;
    
    var searchQuery = {
      'aweber.id':userinfo.id
    };
    var updates = {
      'aweber.token': userinfo.token,
      'aweber.tokenSecret':userinfo.tokenSecret,
      'aweber.glist_id':glist_id,
      'aweber.clist_id':clist_id,
      'aweber.gtagstring':gtagstring,
      'aweber.ctagstring':ctagstring,
    };
    var options = {
      upsert: true,
      new: true
    };
    // update the user if s/he exists or add a new user
    savedInfo.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        res.send({success: false});
      } else {
        res.send({success: true})
      }
    });
  }
});

app.post('/aweber/getSaveInfo', function(req, res){
  var userInfo = req.body.user;
  mongoose.connection.db.listCollections({name: 'savedinfos'}).next(function(err, collinfo){
    if (collinfo){
      savedInfo.findOne({'aweber.id':userInfo.id, 'aweber.tokenSecret': userInfo.tokenSecret}, function(err, saveinfo){
        if (err){
          res.send({success: false}); // there is no saved information
        }
        if (saveinfo){
          res.send({
            success:      true, 
            glist_id:     saveinfo.aweber.glist_id,
            clist_id:     saveinfo.aweber.clist_id,
            gtagstring:   saveinfo.aweber.gtagstring,
            ctagstring:   saveinfo.aweber.ctagstring
          });
        }
        else{
          res.send({success: false});
        }
      });
    }
    else{
      res.send({success: false});
    }
  });
});
app.post('/aweber/getConnectState', function(req, res){
  mongoose.connection.db.listCollections({name: 'users'}).next(function(err, collinfo){
    if (collinfo){
      User.findOne({'aweber.connected':true}, function(err, user){
        if (err){
            res.send({connected:false}); // first connected
            }
        if (user){
            res.send({connected: true, data: user.aweber})    
            }
      });
    }
    else{
      res.send({connected: false}); // 
    }
    if (err){
      console.log(err);
      res.send({connected: false})
    }
  });
});

app.post('/aweber/logout', function(req, res){
  if (req.body && req.body.user)
  {
    var usrData = req.body.user;
    var searchQuery = {
      'aweber.id':usrData.id,
      'aweber.tokenSecret':usrData.tokenSecret
    };
    var updates = {
      'aweber.connected': !usrData.connected
    };
    var options = {
    };
    // update the user if s/he exists
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        res.send({success: false, message:'Connected'});
      } else {
        req.logOut();
        res.send({ success: true, message: 'disConnected' });
      }
    });
  } 
});

const crypto = require('crypto');
const OAuth = require('oauth-1.0a');

// accountid, listid, subscriber, orgid, email, 
app.post('/aweber/aweberSubmit', function (req, res){
  if (req.body && req.body.user){
    var userinfo = req.body.user;
    const aw = new aweberApi(aweberConsumerKey, aweberConsumerSecret, {
        token: userinfo.token,
        tokenSecret : userinfo.tokenSecret
      });
      var acid = userinfo.id;
      var lid = req.body.listid;

      const custom_fields = {
        "tags": "fred, anne, greg",
        "name": "gregor"
      }
      var cc = JSON.stringify(custom_fields);
      const payload = {
        email:req.body.email,
         custom_fields:cc
        //"strict_custom_fields": "false",
      };

       aw.get("https://api.aweber.com/1.0/accounts/" + acid + "/lists/" + lid + "/subscribers?ws.op=find&email=" + payload.email)
       .then(function(result){
         if (result.entries.length){
           var sbId = result.entries[0].id;
          aw.patch("https://api.aweber.com/1.0/accounts/" + acid + "/lists/" + lid + "/subscribers/" + sbId , {data:payload})
          .then(function(result){
            console.log(result);
          })
          .catch(function(err){
            console.log(err);
          })
         }else{
          aw.post("https://api.aweber.com/1.0/accounts/" + acid + "/lists/" + lid + "/subscribers?ws.op=create", { data:payload})
          .then(function(result){
            console.log(result);
          })
          .catch(function(err){
            console.log(err);
          })
         }
      })
       .catch(function(err){
           console.log(err);
      })

  }
});

// **************************************************************** Constant Contract *********************************************

passport.use(new ConstantContactStrategy({
  clientID: constantcontactClientId,
  clientSecret: constantcontactClientSecret,
  callbackURL: "http://127.0.0.1:4000/constantcontact/callback"
}, function (accessToken, refreshToken, profile, done) {

  console.log("profile.user_name" + profile._json.user_name);

  var searchQuery = {
    'constantContact.id':profile._json.client_id
  };
  var updates = {
    'constantContact.connected':true,
    'constantContact.token':profile.accessToken,
    'constantContact.name' :profile._json.user_name,
    'constantContact.expires_in':profile._json.expires_in
  };
  var options = {
    upsert: true,
    new: true
  };
  // update the user if s/he exists or add a new user
  User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
    if(err) {
      return done(err);
    } else {
      return done(null, user);
    }
  });
}
));

app.get('/constantcontact/authorize', passport.authenticate('constantcontact'));
app.get('/constantcontact/callback', passport.authenticate('constantcontact', { failureRedirect: 'http://127.0.0.1:4000/constantcontact' }),
  function(req, res) {
    // Successul authentication, redirect home.
    res.set({ "content-type": "text/html; charset=utf-8" });
    res.end(popupTools.popupResponse(req.user));
});
var cc;
app.post('/constantcontact/list', function(req, res){
  console.log('constantcontact/list called');
  if (req.body && req.body.user){
    var userinfo = req.body.user;
    cc = new ConstantContact({
      apiKey:constantcontactClientId,
      accessToken:userinfo.token
    });

    let creq = cc.lists.find({});
    creq
      .catch((err)=>{
          console.log(err);
          res.send({success: false});
      })
      .then((result)=>{
          console.log(result);
          res.send({success: true, data:result})
      });

  }
});

app.post('/constantcontact/save', function (req, res){
  if (req.body && req.body.user){
    var userinfo = req.body.user;
    var glist_id = req.body.glist_id;
    var clist_id = req.body.clist_id;
    
    var searchQuery = {
      'constantContact.id':userinfo.id
    };
    var updates = {
      'constantContact.token':userinfo.token,
      'constantContact.glist_id':glist_id,
      'constantContact.clist_id':clist_id,
    };
    var options = {
      upsert: true,
      new: true
    };
    // update the user if s/he exists or add a new user
    savedInfo.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        res.send({success: false});
      } else {
        res.send({success: true})
      }
    });
  }
});

app.post('/constantcontact/getSaveInfo', function(req, res){
  var userInfo = req.body.user;
  mongoose.connection.db.listCollections({name: 'savedinfos'}).next(function(err, collinfo){
    if (collinfo){
      savedInfo.findOne({'constantContact.id':userInfo.id, 'constantContact.token': userInfo.token}, function(err, saveinfo){
        if (err){
          res.send({success: false}); // there is no saved information
        }
        if (saveinfo){
          res.send({
            success:      true, 
            glist_id:     saveinfo.constantContact.glist_id,
            clist_id:     saveinfo.constantContact.clist_id
          });
        }
        else{
          res.send({success: false});
        }
      });
    }
    else{
      res.send({success: false});
    }
  });
})

app.post('/constantcontact/getConnectState', function(req, res){
  mongoose.connection.db.listCollections({name: 'users'}).next(function(err, collinfo){
    if (collinfo){
      User.findOne({'constantContact.connected':true}, function(err, user){
        if (err){
            res.send({connected:false}); // first connected
            }
        if (user){
            res.send({connected: true, data: user.constantContact})    
            }
      });
    }
    else{
      res.send({connected: false}); // 
    }
    if (err){
      console.log(err);
      res.send({connected: false})
    }
  });
});

app.post('/constantcontact/logout', function(req, res){
  if (req.body && req.body.user)
  {
    var usrData = req.body.user;
    var searchQuery = {
      'constantContact.id':usrData.id,
      'constantContact.token':usrData.token
    };
    var updates = { 
      'constantContact.connected': !usrData.connected
    };
    var options = {
    };
    // update the user if s/he exists
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        res.send({success: false, message:'Connected'});
      } else {
        req.logOut();
        res.send({ success: true, message: 'disConnected' });
      }
    });
  } 
});

app.post('/constantcontact/constantcontactSubmit', function (req, res){
    if (req.body && req.body.user){
      var listid = req.body.listid;
      var firstName = "Jonas";
      var lastName = "Olive1";
      var email = req.body.email;

      var key = req.body.user.id;
      var token = req.body.user.token;
      data = {
        custom_fields:[]
      }
      data.lists = [{"id":listid}];
      data.email_addresses = [{'email_address': email}];

    var condition;
    var options = { method: 'GET',
    url: 'https://api.constantcontact.com/v2/contacts',
    qs: 
    { email: email,
      status: 'ALL',
      limit: '50',
      api_key: key,
      access_token: token },
      headers: 
    { 
      'Content-Type': 'application/json' } };
      
    request(options, function (error, response, body) {
      if (error){
        console.log(error);
      }else{
        var ret = JSON.parse(body);
        if (ret.results.length){ // update
         var contactId = ret.results[0].id;
        condition = {
          method: 'PUT',
          url: 'https://api.constantcontact.com/v2/contacts/' + contactId,
          qs: 
          { api_key: key,
            action_by: 'ACTION_BY_OWNER',
            access_token: token },
          headers: 
          { 
            'Content-Type': 'application/json' },
          body: data, 
          json: true
        };
          
        }else{ // create
          condition = {
            method: 'POST',
            url: 'https://api.constantcontact.com/v2/contacts',
            qs: 
            { 
              action_by: 'ACTION_BY_OWNER',
              api_key: key,
              access_token: token 
            },
            headers: 
            { 
              'Content-Type': 'application/json' },
            body: data,
            json: true 
          };
        }
        request(condition, function (error, response, body) {
          if (error) throw new Error(error);
          console.log(body);
        });
      }
      console.log(body);
    });
    }
});

var GetResponseApi;

//******************************************************************************************************* */

//********************************************* Getresponse ************************************************
app.post('/getresponse/authorize', function (req, res) {
  console.log("called getresponse authorize");
  if (req.body && req.body.apikey){
    var userApikey = req.body.apikey;
    GetResponseApi = require('getresponse-nodejs-api')(userApikey);
    GetResponseApi.ping(function(result){
      if (result.data.result.ping == "pong"){
        console.log(result.data.result.ping);
        var searchQuery = {
          'getResponse.id':userApikey
        };
        var updates = {
          'getResponse.id':           userApikey,
          'getResponse.connected':    true,
          'getResponse.apikey':       userApikey,
        };
        var options = {
          upsert: true,
          new: true
        };
        User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
          if(err) {
            res.send({ success: false, message: 'Not Connected' });
          } else {
            res.send({ success: true, message: 'Connected', data:user.getResponse });
          }
        });
      }
      else{
        res.send({ success: false, message: 'Not Connected' });
      }
    });
  }
  else{
    res.send({ success: false, message: 'Error' });
  }
});

app.post('/getresponse/getmailingList', function(req, res){
  console.log("called getresponse getmailingList");
  if (req.body && req.body.user){
    GetResponseApi.getCampaigns(null, null, function(result){
      if (result.error == null){
        res.send({success: true, data:result.data.result});
      }else{
        res.send({success: false});
      }
    });
  }
  else{
    res.send({success: false});
  }
});

app.post('/getresponse/save', function(req,res){
  if (req.body && req.body.user){
    var userinfo = req.body.user;
    var glist_id = req.body.glist_id;
    var clist_id = req.body.clist_id;
    
    var searchQuery = {
      'getResponse.id':       userinfo.id,
      'getResponse.apikey':   userinfo.apikey
    };
    var updates = {
      'getResponse.glist_id':   glist_id,
      'getResponse.clist_id':   clist_id
    };
    var options = {
      upsert: true,
      new: true
    };
    // update the user if s/he exists or add a new user
    savedInfo.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        res.send({success: false});
      } else {
        res.send({success: true})
      }
    });
  }
});

app.post('/getresponse/getSaveInfo', function(req, res){
  var userInfo = req.body.user;
  mongoose.connection.db.listCollections({name: 'savedinfos'}).next(function(err, collinfo){
    if (collinfo){
      savedInfo.findOne({'getResponse.id':userInfo.id, 'getResponse.apikey': userInfo.apikey}, function(err, saveinfo){
        if (err){
          res.send({success: false}); // there is no saved information
        }
        if (saveinfo){
          res.send({
            success:      true, 
            glist_id:     saveinfo.getResponse.glist_id,
            clist_id:     saveinfo.getResponse.clist_id
          });
        }
        else{
          res.send({success: false});
        }
      });
    }
    else{
      res.send({success: false});
    }
  });
});

app.post('/getresponse/getConnectState', function(req, res){
  mongoose.connection.db.listCollections({name: 'users'}).next(function(err, collinfo){
    if (collinfo){
      User.findOne({'getResponse.connected':true}, function(err, user){
        if (err){
            res.send({connected:false}); 
            }
        if (user){
            res.send({connected: true, data: user.getResponse})    
            }
      });
    }
    else{
      res.send({connected: false}); // 
    }
    if (err){
      console.log(err);
      res.send({connected: false})
    }
  });
});

app.post('/getresponse/logout', function(req, res){
  if (req.body && req.body.user)
  {
    var usrData = req.body.user;
    var searchQuery = {
      'getResponse.id':usrData.id,
      'getResponse.apikey':usrData.apikey
    };
    var updates = {
      'getResponse.connected': !usrData.connected
    };
    var options = {
    };
    // update the user if s/he exists
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        res.send({success: false, message:'Connected'});
      } else {
        req.logOut();
        res.send({ success: true, message: 'disConnected' });
      }
    });
  } 
});


app.post('/getresponse/getresponseSubmit/', function(req, res){
  console.log("called /getresponse/getresponseSubmit");
  if (req.body && req.body.user){
    var campaginid = req.body.formid;
    var name = "Tester";
    var email = req.body.email;
    var action = "";

    GetResponseApi.addContact(campaginid, name, email,action,"","", function(result){
      if (result.success){
        if (result.data.result)
          res.send({success: true});
        if (result.data.error)
          res.send({success: false, data:result.data.error.message})
      }
      else{
        res.send({success: false, data:'unknown error'});
      }
    });
  }  
});
//*********************************************************************************************************************** */

//*************************************************** ActiveCampaign *****************************************************

var ac;
app.post('/activecampaign/authorize', function (req, res) {
  if(req.body && req.body.apikey && req.body.url) {
    ac = new ActiveCampaign(req.body.url, req.body.apikey);
    ac.credentials_test().then(function(result) {
      if(result.success) {
        var searchQuery = {
          'activeCampaign.id':result.id,
          'activeCampaign.username':result.username,
          'activeCampaign.first_name':result.first_name,
          'activeCampaign.apiurl':result.apiurl,
          'activeCampaign.apikey':result.apikey,
        };
        var updates = {
          'activeCampaign.connected':true,
          'activeCampaign.username':result.username,
          'activeCampaign.first_name':result.first_name,
          'activeCampaign.trackid':result.trackid,
          'activeCampaign.apiurl':result.apiurl,
          'activeCampaign.apikey':result.apikey,
        };
        var options = {
          upsert: true,
          new: true
        };
        // update the user if s/he exists or add a new user
        User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
          if(err) {
            res.send({success: false, message:'Not Connected'});
          } else {
            res.send({success: true, message: 'Connected', data: user.activeCampaign})
          }
        });
      } else {
        res.send({ success: false, message: 'Not Connected' });
      }
    }, function(result) {
      res.send({ success: false, message: 'Error' });
    });
  } else {
    // invalid
    res.send({ success: false, message: 'Invalid parameter' });
  }
});
app.post('/activecampaign/list', function(req, res){
  console.log("/activecampaign/list called");
  if (req.body && req.body.user){
    ac = new ActiveCampaign("https://alex-smit55583110.api-us1.com", "fa107b809123b25178c323db7b24a1c2aafdf9d11ff9f7b0fee9d48120b68f30c8c43047");
    var mailList = ac.api("list/list", {"ids":"all"});
    mailList.then(function(result){
      if (result.success){
        console.log("getMaillist result");
        console.log(result);
        var obj = result;
        var values = Object.keys(obj).map(function (key) { return !isNaN(key) ?  obj[key] : null;});
        console.log(values);
        res.json(values);       
      }
      else{
        res.send({success: false});
      }
    });
  }
  else{
    res.send({ success: false, message: 'Invalid parameter' });
  }
});
app.post('/activecampaign/formlist', function(req, res){
  console.log("called activecampaign formlist");
  if (req.body && req.body.user){
    var formList = ac.api("form/getforms", {});
    formList.then(function(result){
      if (result.success){
        var obj = result;
        var values = Object.keys(obj).map(function (key) { return !isNaN(key) ?  obj[key] : null;});
        console.log(values);
        res.json(values);       
      }
      else{
        res.send({success: false});
      }
    });
  }
  else{
    res.send({ success: false, message: 'Invalid parameter' });
  }
});
//activeCampaign:{id:String, username:String, trackid:String, apiurl: String, apikey: String, glist_id:String, gform_id:String, clist_id:String, cform_id:String},
app.post('/activecampaign/save', function (req, res){
  if (req.body && req.body.user){
    var userinfo = req.body.user;
    var glist_id = req.body.glist_id;
    var clist_id = req.body.clist_id;
    var gform_id = req.body.gform_id;
    var cform_id = req.body.cform_id;
    var searchQuery = {
      'activeCampaign.id':userinfo.id,
      'activeCampaign.username':userinfo.username,
      'activeCampaign.trackid':userinfo.trackid,
      'activeCampaign.apiurl':userinfo.apiurl,
      'activeCampaign.apikey':userinfo.apikey

    };
    var updates = {
      'activeCampaign.id':userinfo.id,
      'activeCampaign.username':userinfo.username,
      'activeCampaign.trackid':userinfo.trackid,
      'activeCampaign.apiurl':userinfo.apiurl,
      'activeCampaign.apikey':userinfo.apikey,
      'activeCampaign.glist_id':glist_id,
      'activeCampaign.clist_id':clist_id,
      'activeCampaign.gform_id':gform_id,
      'activeCampaign.cform_id':cform_id
    };
    var options = {
      upsert: true,
      new: true
    };
    // update the user if s/he exists or add a new user
    savedInfo.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        res.send({success: false});
      } else {
        res.send({success: true})
      }
    });
  }
});

app.post('/activecampaign/getSaveInfo', function(req, res){
  var userInfo = req.body.user;
  mongoose.connection.db.listCollections({name: 'savedinfos'}).next(function(err, collinfo){
    if (collinfo){
      savedInfo.findOne({'activeCampaign.id':userInfo.id, 'activeCampaign.username': userInfo.username}, function(err, saveinfo){
        if (err){
          res.send({success: false}); // there is no saved information
        }
        if (saveinfo){
          res.send({
            success:      true, 
            glist_id:     saveinfo.activeCampaign.glist_id,
            clist_id:     saveinfo.activeCampaign.clist_id,
            gform_id:     saveinfo.activeCampaign.gform_id,
            cform_id:     saveinfo.activeCampaign.cform_id
          });
        }
        else{
          res.send({success: false});
        }
      });
    }
    else{
      res.send({success: false});
    }
  });
})

app.post('/activecampaign/getConnectState', function(req, res){
  mongoose.connection.db.listCollections({name: 'users'}).next(function(err, collinfo){
    if (collinfo){
      User.findOne({'activeCampaign.connected':true}, function(err, user){
        if (err){
            res.send({connected:false}); // first connected
            }
        if (user){
            res.send({connected: true, data: user.activeCampaign})    
            }
      });
    }
    else{
      res.send({connected: false}); // 
    }
    if (err){
      console.log(err);
      res.send({connected: false})
    }
  });
});

app.post('/activecampaign/logout', function(req, res){
  if (req.body && req.body.user)
  {
    var usrData = req.body.user;
    var searchQuery = {
      'activeCampaign.id':usrData.id,
      'activeCampaign.username':usrData.username
    };
    var updates = {
      'activeCampaign.connected': !usrData.connected
    };
    var options = {
    };
    // update the user if s/he exists
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        res.send({success: false, message:'Connected'});
      } else {
        req.logOut();
        res.send({ success: true, message: 'disConnected' });
      }
    });
  } 
});

app.post('/activecampaign/activecampaignSubmit', function (req, res){
  console.log("/activecampaign/activecampaignSubmit called");
  if (req.body && req.body.user){
  var tempform = {
    name:"jonas",
    eamil:"wwww@outlook.com"
  }
  urlpre = req.body.user.apiurl;

  var formdata = {};
  var listid = req.body.listid;
  var formid = req.body.formid;

  formdata.email = req.body.email;
  formdata.json = tempform;
  if (listid && listid !=='none')
    formdata.list = listid;
  if (formid && formid !=='none')
    formdata['p[]'] = formid;


  var options = { 
    method: 'POST',
    url: urlpre + '/admin/api.php',
    qs: 
    { api_key: req.body.user.apikey,
      api_action: 'contact_sync',
      api_output: 'json' },
    headers: 
    {
      'Content-Type': 'application/x-www-form-urlencoded' },
      form: formdata
      };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });
  }
});


//******************************************* other ********************************* */
passport.serializeUser(function(user, done) {
  console.log("called serializeUser");
  //done(null, user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("called deserializeUser");
   User.findById(id, (err, user) => {
     done(null, user.id); 
   });
  //done(null, id)
});

// the "index" route, which serves the Angular app
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'/dist/angular7crud/index.html'))
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next(); }

  // denied. redirect to login
  res.redirect('/')
}
const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});

module.exports = app;