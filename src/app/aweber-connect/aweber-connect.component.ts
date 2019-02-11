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
  selector: 'app-aweber-connect',
  templateUrl: './aweber-connect.component.html',
  styleUrls: ['./aweber-connect.component.css']
})
export class AweberConnectComponent implements OnInit {

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

  public ctagString= "";
  public gtagString = "";

  public itemList: item[];
  public dataForTest: any;

  constructor(
    public activeModal: NgbActiveModal,
    private mailService: MailProviderService,
    private modalService:NgbModal
  ) { }
  
  ngOnInit() {
    this.cselectedMailListID="none"; 
    this.gselectedMailListID="none";
    this.ctagString = "";
    this.gtagString = "";
    this.isConnected = false;

    this.mailService.getAweberConnectedState().subscribe(data=>{
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
    this.mailService.getAweberSavedInfo(this.userInfo).subscribe(data=>{
        if (data['success']){
          this.gselectedMailListID = data['glist_id'];
          this.cselectedMailListID = data['clist_id'];
        }
        this.getMailList();
    });
  }

  public getMailList(){
    this.itemList = [];
    this.itemList.push({id:"none",name:"--Don't push to list--"});
    console.log("getMailList " + this.userInfo);
    this.mailService.getAweberList(this.userInfo).subscribe((data:Array<object>)=>{
    var mail_item;
    for( mail_item of data) {
      this.itemList.push({id:mail_item.id, name:mail_item.name});
    }
      console.log(this.itemList);
    });
  }

  public logout(){
    const modalRef = this.modalService.open(ConfirmDlgComponent, {centered: true , backdrop: "static"});
    modalRef.componentInstance.mailProvider = "Aweber";
    modalRef.result.then((data)=>{
      this.mailService.logOutAweber(this.userInfo).subscribe(data =>{
        if (data['success']){
          console.log("called Aweber logout");
          this.isConnected = false;
          this.statusMessage = 'Not Connected';
          this.activeModal.dismiss(true);
        }
      });
    }, (reason)=>{});
  }

  public connect(){
    var vmPop = this;
    popupTools.popup('/aweber/authorize', "aweber Connect", {}, function (err, user) {
      if (err) {
        vmPop.isConnected = false;
        vmPop.statusMessage = 'Not Connected';
      }
      else{
        vmPop.isConnected = true;
        vmPop.statusMessage = 'Connected';
        vmPop.userInfo = user.aweber;
        console.log(vmPop.userInfo);
        vmPop.getSaveData();
      }
    });
  }

  public save() {
    this.mailService.saveAweber(this.userInfo, this.gselectedMailListID, this.cselectedMailListID, this.gtagString, this.ctagString).subscribe(data=>{
      if (data['success']){
          console.log("saved success");
          this.activeModal.close(true);
        }
      else
        console.log("saved failed");
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

    public submit()
    {
      //this.mailService.AweberSubmit(this.userInfo, "", "", this.gselectedMailListID).subscribe(data=>{});
      this.dataForTest = {};
      this.dataForTest = {
        "mailProvider": "aweber",
        "userInfo": this.userInfo,
        "mailListID" : this.gselectedMailListID,
      }
      const modalRef = this.modalService.open(TestMessageComponent, {centered: true , backdrop: "static"});
      modalRef.componentInstance.mailProviderData = this.dataForTest;

    }

}
