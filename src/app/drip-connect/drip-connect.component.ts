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
  selector: 'app-drip-connect',
  templateUrl: './drip-connect.component.html',
  styleUrls: ['./drip-connect.component.css']
})
export class DripConnectComponent implements OnInit {

  public env = env;
  public isConnected = true;
  public statusMessage = 'Not Connected';

  public integrationSettingMessage = 'Global Integration Settings'; // or Popup Integration Settings
  public isGlobalIntegrationSetting = true;
  public integrationlabel = "GLOBAL";

  public userInfo: any = {};

    // for save database
    public cselectedAccountListID="none"; 
    public gselectedAccountListID="none";

    public cselectedCampaignListID= "none";
    public gselectedCampaignListID= "none"

    public ceventString = "";
    public geventString = "";

    public ctagString = ""; // comma separated
    public gtagString = ""; // comma separated

    
    public cdoubleOpt = false;
    public gdoubleOpt = false;
  
    public accountList: item[];
    public campaignList: item[];
    public dataForTest: any;

  constructor(
    public activeModal: NgbActiveModal,
    private mailService: MailProviderService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.cselectedAccountListID="none"; 
    this.gselectedAccountListID="none";
    this.cselectedCampaignListID="none"; 
    this.gselectedCampaignListID="none";
    this.isConnected = false;

    // this.mailService.getDripConnectedState().subscribe(data=>{
    //   if (data['connected']){
    //     this.isConnected = true;
    //     this.statusMessage = 'Connected';
    //     this.userInfo = data['data'];
    //     this.getSaveData();
    //   }
    //   else{
    //     this.isConnected = false;
    //   }
    // });
  }

  public connect(){
    var vmPop = this;
    vmPop.isConnected = false;
    
    popupTools.popup('/contactually/authorize', "campaignmonitor Connect", {}, function (err, user) {
      if (err) {
        vmPop.isConnected = false;
        vmPop.statusMessage = 'Not Connected';
      }
      else{
        vmPop.isConnected = true;
        vmPop.statusMessage = 'Connected';
        vmPop.userInfo = user.drip;
        console.log("login user info= ");
        console.log(user);
     //   vmPop.getSaveData();
      
        }
    });

    // popupTools.popupWithPost('/campaignmonitor/authorize', {orgid:'ccc'}, 'drip connect', {},function(err, user) {
    //   if (err) {
    //     console.log(err);
    //     vmPop.isConnected = false;
    //     vmPop.statusMessage = 'Not Connected';
    //   }
    //   else{
    //     vmPop.isConnected = true;
    //     vmPop.statusMessage = 'Connected';
    //     vmPop.userInfo = user.aweber;
    //     console.log(vmPop.userInfo);
    //     //vmPop.getSaveData();
    //     //vmPop.getMailList();
    //   }
    // });
  }
  getAccountList()
  {
    this.accountList = [];
    this.accountList.push({id:"none",name:"--Select an account--"});
    this.campaignList = [];
    this.campaignList.push({id:"none", name:"--Don't pust to campaign"});
    console.log("getAccountList called");
    this.mailService.getDripAccountList(this.userInfo).subscribe(data=>{
      if (data['success']){
        var item;
          for (item of data['data']){
            this.accountList.push({id: item.accountID, name: item.name});
            var citem;
            for (citem of item['campaigns']){
              this.campaignList.push({id: citem.id, name: citem.name});
            }
          }
      }
        console.log(data);
    });
  }
  public getSaveData(){
    this.mailService.getDripSavedInfo(this.userInfo).subscribe(data=>{
        if (data['success']){
          this.gselectedAccountListID = data['gaccountListID'];
          this.cselectedAccountListID = data['caccountListID'];
          this.gselectedCampaignListID = data['gcampaignListID'];
          this.cselectedAccountListID = data['ccampaignListID'];
          this.gdoubleOpt = data['gdoubleopt'];
          this.cdoubleOpt = data['cdoubleopt'];
          this.gtagString = data['gtagString'];
          this.ctagString = data['ctagString'];
          this.geventString = data['goptEvent'];
          this.ceventString = data['coptEvent'];
        }
        this.getAccountList();
    });
  }

  public logout()
  {
    const modalRef = this.modalService.open(ConfirmDlgComponent, {centered: true , backdrop: "static"});
    modalRef.componentInstance.mailProvider = "Drip";
    modalRef.result.then((data)=>{
      this.mailService.logOutDrip(this.userInfo).subscribe(data =>{
        if (data['success']){
          console.log("called drip logout");
          this.isConnected = false;
          this.statusMessage = 'Not Connected';
          this.activeModal.dismiss(true);
        }
      });
    }, (reason)=>{    });
  }
  public save()
  {
    this.mailService.saveDrip(
      this.userInfo, 
      this.gselectedAccountListID,
      this.cselectedAccountListID,
      this.gselectedAccountListID == "none" ? "none" : this.gselectedCampaignListID ,
      this.cselectedAccountListID == "none" ? "none" : this.cselectedCampaignListID ,
      this.geventString,
      this.ceventString,
      this.gtagString,this.ctagString,
      this.gdoubleOpt,this.cdoubleOpt
       ).subscribe(data=>{
      if (data['success'])
        {
          console.log("saved success");
          this.activeModal.close(true);
        }
      else
        console.log("saved failed");
    });
  }
  public testSubmit()
  {
    this.dataForTest = {};
    this.dataForTest = {
      "mailProvider": "drip",
      "userInfo": this.userInfo,
      "mailListID" : this.gselectedAccountListID,
      "formListID" : this.gselectedCampaignListID,
      "eventString" : this.geventString,
      "tagString" : this.gtagString
    }
    const modalRef = this.modalService.open(TestMessageComponent, {centered: true , backdrop: "static"});
    modalRef.componentInstance.mailProviderData = this.dataForTest;
      //this.modalService.open(TestMessageComponent, {centered: true, backdrop:"static"});
    //this.mailService.dripSubmit(this.userInfo, "", "", this.gselectedAccountListID, this.gselectedCampaignListID, this.geventString,this.gtagString).subscribe(data=>{

    //});
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
}