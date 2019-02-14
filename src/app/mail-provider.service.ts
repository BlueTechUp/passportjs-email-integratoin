import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment as env } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MailProviderService {

  constructor(
    private http: HttpClient
  ) { }

//-------------------aweber--------------------------
getAweberConnectedState(){
  return this.http.post(env.baserServerURL + '/aweber/getConnectState',{});
}
getAweberList(loginUser: any){
  console.log("getAweberList Service called" + loginUser);
  return this.http.post(env.baserServerURL + '/aweber/list/', {'user': loginUser})
}

logOutAweber(loginUser: any){
  return this.http.post(env.baserServerURL + '/aweber/logout', {'user': loginUser})
}

saveAweber(loginUser: any, glist_id:String,  clist_id:String, gtagstring:String, ctagstring:String){
  return this.http.post(env.baserServerURL + '/aweber/save', {
    'user': loginUser,
    'glist_id': glist_id,
    'clist_id': clist_id,
  });
}

getAweberSavedInfo(loginUser: any){ 
  return this.http.post(env.baserServerURL + '/aweber/getSaveInfo', {'user': loginUser});
}

AweberSubmit(loginUser: any, orgID: String, formJSON: String, listID: String, email:String){
  return this.http.post(env.baserServerURL + '/aweber/aweberSubmit', {
          'user': loginUser,
          'orgID': orgID,
          'formJSON': formJSON,
          'listid': listID,
          'email':email
  });
}
//-------------------constant contract---------------
  getConstantContactConnectedState(){
    return this.http.post(env.baserServerURL + '/constantcontact/getConnectState',{});
  }
  getConstantContactList(loginUser: any){
    return this.http.post(env.baserServerURL + '/constantcontact/list/', {'user': loginUser})
  }

  logOutConstantContact(loginUser: any){
    return this.http.post(env.baserServerURL + '/constantcontact/logout/', {'user': loginUser})
  }
  
  saveConstantContact(loginUser: any, glist_id:String,  clist_id:String){
    return this.http.post(env.baserServerURL + '/constantcontact/save/', {
      'user': loginUser,
      'glist_id': glist_id,
      'clist_id': clist_id,
    });
  }

  getConstantContactSavedInfo(loginUser: any){ 
    return this.http.post(env.baserServerURL + '/constantcontact/getSaveInfo', {'user': loginUser});
  }

  constantContactSubmit(loginUser: any, orgID: String, formJSON: String, listid:String, email:String){
    return this.http.post(env.baserServerURL + '/constantcontact/constantcontactSubmit', {
            'user': loginUser,
            'orgID': orgID,
            'formJSON': formJSON,
            'listid': listid,
            'email' : email
    });
  }
//-------------------drip---------------------------

getDripAccountList(loginUser: any){
  return this.http.post(env.baserServerURL + '/drip/getAccountlist', {'user': loginUser})
}
getDripConnectedState(){
  return this.http.post(env.baserServerURL + '/drip/getConnectState',{});
}

logOutDrip(loginUser: any){
  return this.http.post(env.baserServerURL + '/drip/logout/', {'user': loginUser})
}

saveDrip(loginUser: any, 
  gacclist_id:String,
  cacclist_id:String,
  gcamplist_id:String, 
  ccamplist_id:String,
  geventString:String, 
  ceventString:String, 
  gtagString:String, 
  ctagString:String, 
  gdouble_opt:Boolean, 
  cdouble_opt:Boolean ){
  return this.http.post(env.baserServerURL + '/drip/save/', {
    'user': loginUser,
    'gacclist_id': gacclist_id,
    'cacclist_id': cacclist_id,
     'gcamplist_id':gcamplist_id, 
     'ccamplist_id':ccamplist_id,
     'geventString':geventString, 
     'ceventString':ceventString, 
     'gtagString':gtagString, 
     'ctagString':ctagString, 
     'gdouble_opt':gdouble_opt, 
     'cdouble_opt':cdouble_opt
  });
}

getDripSavedInfo(loginUser: any){ 
  return this.http.post(env.baserServerURL + '/drip/getSaveInfo', {'user': loginUser});
}
dripSubmit(loginUser: any, orgID: String, formJSON: String, listID: String, campaignId: String, eventString: String, tagString: String, email:String){
  return this.http.post(env.baserServerURL + '/drip/dripSubmit', {
          'user': loginUser,
          'orgID': orgID,
          'formJSON': formJSON,
          'listid': listID,
          'campaignId': campaignId,
          'eventString': eventString,
          'tagString': tagString,
          'email':email
  });
}

//------------------ getresponse --------------------

  connectGetResponse(apikey: any, url: any) {
        return this.http.post(env.baserServerURL + '/getresponse/authorize/', {
          'apikey': apikey,
          'url': url
    })
  }
  getGetResponseConnectedState(){
    return this.http.post(env.baserServerURL + '/getresponse/getConnectState',{});
  }
  getGetResponseList(loginUser: any){
    return this.http.post(env.baserServerURL + '/getresponse/getmailingList/', {'user': loginUser})
  }

  logOutGetResponse(loginUser: any){
    return this.http.post(env.baserServerURL + '/getresponse/logout/', {'user': loginUser})
  }
  saveGetResponse(loginUser: any, glist_id:String, clist_id:String){
    return this.http.post(env.baserServerURL + '/getresponse/save/', {'user': loginUser,'glist_id': glist_id,'clist_id': clist_id});
  }

  getGetResponseSavedInfo(loginUser: any){ 
    return this.http.post(env.baserServerURL + '/getresponse/getSaveInfo/', {'user': loginUser});
  }

  getResponseSubmit(loginUser: any, orgID: String, formJSON: String, formid: String, email: String){
    return this.http.post(env.baserServerURL + '/getresponse/getresponseSubmit/',{'user':loginUser,'orgID':orgID,'formJSON':formJSON,'formid':formid, 'email':email});
  }

//------------------- active campaign------------------------

  connectActiveCampaign(apikey: any, url: any) {
    return this.http.post(env.baserServerURL + '/activecampaign/authorize/', {
      'apikey': apikey,
      'url': url
    })
  }
  getActiveCampaignConnectedState(){
    return this.http.post(env.baserServerURL + '/activecampaign/getConnectState',{});
  }
  getActiveCampaignList(loginUser: any){
    return this.http.post(env.baserServerURL + '/activecampaign/list/', {'user': loginUser})
  }
  getActiveCampaignFormList(loginUser: any){
    return this.http.post(env.baserServerURL + '/activecampaign/formlist/', {'user': loginUser})
  }

  logOutActiveCampaign(loginUser: any){
    return this.http.post(env.baserServerURL + '/activecampaign/logout/', {'user': loginUser})
  }
  saveActiveCampaign(loginUser: any, 
                     glist_id:String,
                     clist_id:String,
                     gform_id:String,
                     cform_id:String){
    return this.http.post(env.baserServerURL + '/activecampaign/save/', {
      'user': loginUser,
      'glist_id': glist_id,
      'clist_id': clist_id,
      'gform_id': gform_id,
      'cform_id': cform_id
    });
  }

  getActiveCampaignSavedInfo(loginUser: any){ 
    return this.http.post(env.baserServerURL + '/activecampaign/getSaveInfo', {'user': loginUser});
  }

  activeCampaignSubmit(loginUser: any, orgID: String, formJSON: String, list_id:String, form_id:String, email:String){
    return this.http.post(env.baserServerURL + '/activecampaign/activecampaignSubmit', {
            'user': loginUser,
            'orgID': orgID,
            'formJSON': formJSON,
            'listid': list_id,
            'formid': form_id,
            'email' : email
    });
  }
  testActiveCampagin(apikey: any, url: any) {
    return this.http.post(env.baserServerURL + '/activecampaign/test/', {
      'apikey': '1305441e0335ca1c61d8742d6b9fe52b2c8faea2225aa5d044f8cddc1913b9d8755c9f3e',
      'url': 'https://alex-smit555.api-us1.com'
    })
  }
  
//--------------------- MailChimp ----------------------------------

  getMailChimpList(loginUser: any){
    return this.http.post(env.baserServerURL + '/mailchimp/list/', {'user': loginUser})
  }

  logOutMailChimp(loginUser: any){
    return this.http.post(env.baserServerURL + '/mailchimp/logout/', {'user': loginUser})
  }
  
  saveMailChimp(loginUser: any, glist_id:String, gskip_double_optin:Boolean, clist_id:String, cskip_double_optin:Boolean){
    return this.http.post(env.baserServerURL + '/mailchimp/save/', {
      'user': loginUser,
      'glist_id': glist_id,
      'gskip_double_optin': gskip_double_optin,
      'clist_id': clist_id,
      'cskip_double_optin': cskip_double_optin
    });
  }

  getMailChimpConnectedState(){
    return this.http.post(env.baserServerURL + '/mailchimp/getConnectState',{});
  }

  getMailChimpSavedInfo(loginUser: any){ 
    return this.http.post(env.baserServerURL + '/mailchimp/getSaveInfo', {'user': loginUser});
  }

  mailchimpSubmit(loginUser: any, orgID: String, formJSON: String, listid:String, email:String){
    return this.http.post(env.baserServerURL + '/mailchimp/mailchimpSubmit', {
            'user': loginUser,
            'orgID': orgID,
            'formJSON': formJSON,
            'listid': listid,
            'email':email
    });
  }

  connectTest(apikey: any, url: any){
    return this.http.post(env.baserServerURL + '/drip/authorize', {
      'apikey': apikey,
      'url': url
    })
  }

  testsubmit(){
    return this.http.post(env.baserServerURL + '/convertkit/test',{});
  }
}
