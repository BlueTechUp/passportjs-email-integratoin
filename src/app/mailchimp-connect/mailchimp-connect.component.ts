import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment as env } from '../../environments/environment';
import { MailProviderService } from '../mail-provider.service';
import * as popupTools from '../../../node_modules/popup-tools';
import { TestMessageComponent} from '../test-message/test-message.component';
import { ConfirmDlgComponent } from '../confirm-dlg/confirm-dlg.component';

interface item{
  id:   String,
  name: String
};
@Component({
  selector: 'app-mailchimp-connect',
  templateUrl: './mailchimp-connect.component.html',
  styleUrls: ['./mailchimp-connect.component.css']
})

export class MailchimpConnectComponent implements OnInit {
 
  public env = env;
  public isConnected = false;
  public statusMessage = 'Not Connected';
  
  public integrationSettingMessage = 'Global Integration Settings'; // or Popup Integration Settings
  public isGlobalIntegrationSetting = true;
  public integrationlabel = "GLOBAL";

  public userInfo: any = {};
  
  // for save database
  public cselectedMailListID="none"; 
  public gselectedMailListID="none";
  
  public cdoubleOpt = false;
  public gdoubleOpt = false;

  public itemList: item[];
  public dataForTest: any;

  constructor(
    public activeModal: NgbActiveModal,
    private mailService: MailProviderService,
    private modalService:NgbModal
  ) {}

  ngOnInit() {
    this.cselectedMailListID="none"; 
    this.gselectedMailListID="none";
    this.isConnected = false;
    
    this.mailService.getMailChimpConnectedState().subscribe(data=>{
      if (data['connected']){
        this.isConnected = true;
        this.statusMessage = 'Connected';
        this.userInfo = data['data'];
        this.getSaveData();
      }
      else{
        this.isConnected = false;
      }
    });
  }
  public getSaveData(){
    this.mailService.getMailChimpSavedInfo(this.userInfo).subscribe(data=>{
        if (data['success']){
          this.gdoubleOpt = data['gdouble_opt'];
          this.gselectedMailListID = data['glist_id'];
          this.cdoubleOpt = data['cdouble_opt'];
          this.cselectedMailListID = data['clist_id'];
        }
        this.getMailList();
    });
  }
  public getMailList(){
    this.itemList = [];
    this.itemList.push({id:"none",name:"--Don't push to list--"});

    this.mailService.getMailChimpList(this.userInfo).subscribe((data:Array<object>)=>{
    var mail_item;
    for( mail_item of data) {
      this.itemList.push({id:mail_item.id, name:mail_item.name});
    }
      console.log(this.itemList);
    });
  }

  switchG_C(value) {
  console.log(value);
    this.isGlobalIntegrationSetting = value;
    if (value){
      this.integrationSettingMessage='Global Integration Settings';
      this.integrationlabel = "GLOBAL";
      }
    else{
      this.integrationSettingMessage='Popup Integration Settings';
      this.integrationlabel = "CAMPAIGN";
    }
  }
  switchSubscribe(value){
    console.log(value);
    if (this.isGlobalIntegrationSetting){
      this.gdoubleOpt = value;
      this.switchG_C(value);
    }
    else{
      this.cdoubleOpt = value;
    }
  }
  public logout(){

    const modalRef = this.modalService.open(ConfirmDlgComponent, {centered: true , backdrop: "static"});
    modalRef.componentInstance.mailProvider = "Mailchimp";
    modalRef.result.then((data)=>{
      this.mailService.logOutMailChimp(this.userInfo).subscribe(data =>{
        if (data['success']){
          console.log("called mailchimp logout");
          this.isConnected = false;
          this.statusMessage = 'Not Connected';
          this.activeModal.dismiss(true);
        }
      });
    }, (reason)=>{ });
  }
  public connect(){
    var vmPop = this;
    popupTools.popup('/mailchimp/authorize', "MailChimp Connect", {}, function (err, user) {
      if (err) {
        vmPop.isConnected = false;
        vmPop.statusMessage = 'Not Connected';
      }
      else{
        vmPop.isConnected = true;
        vmPop.statusMessage = 'Connected';
        vmPop.userInfo = user.mailChimp;
        vmPop.getSaveData();
      }
    });
  }
  public save() {
    this.mailService.saveMailChimp(this.userInfo, this.gselectedMailListID, this.gdoubleOpt, this.cselectedMailListID, this.cdoubleOpt ).subscribe(data=>{
      if (data['success'])
        {
          console.log("saved success");
          this.activeModal.dismiss(true);
        }
      else
        console.log("saved failed");
    });
  }

  public testSubmit(){
   
    this.dataForTest = {};
    this.dataForTest = {
      "mailProvider": "mailchimp",
      "userInfo": this.userInfo,
      "mailListID" : this.gselectedMailListID,
    }
    const modalRef = this.modalService.open(TestMessageComponent, {centered: true , backdrop: "static"});
    modalRef.componentInstance.mailProviderData = this.dataForTest;
  }
}
