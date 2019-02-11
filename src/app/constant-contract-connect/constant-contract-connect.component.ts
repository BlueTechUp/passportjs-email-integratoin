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
  selector: 'app-constant-contract-connect',
  templateUrl: './constant-contract-connect.component.html',
  styleUrls: ['./constant-contract-connect.component.css']
})
export class ConstantContractConnectComponent implements OnInit {

  public env = env;
  public isConnected = false;
  public statusMessage = 'Not Connected';

  public integrationSettingMessage = 'Popup Integration Settings'; // or Popup Integration Settings
  public isGlobalIntegrationSetting = true;
  public integrationlabel = "GLOBAL";


  public userInfo: any = {};

    // for save database
  public cselectedMailListID="none"; 
  public gselectedMailListID="none";

  public itemList: item[];
  public dataForTest: any;

  constructor(
    public activeModal: NgbActiveModal,
    private mailService: MailProviderService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.cselectedMailListID="none"; 
    this.gselectedMailListID="none";
    this.isConnected = false;
    
    this.mailService.getConstantContactConnectedState().subscribe(data=>{
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
    this.mailService.getConstantContactSavedInfo(this.userInfo).subscribe(data=>{
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

    this.mailService.getConstantContactList(this.userInfo).subscribe(data=>{
      if (data['success']){
        var mail_item;
        var lists = data['data'];
        for( mail_item in lists) {
          this.itemList.push({id:lists[mail_item].id, name: lists[mail_item].name});
        }
      console.log(this.itemList);
      }
    });
  }

  public logout(){
    const modalRef = this.modalService.open(ConfirmDlgComponent, {centered: true , backdrop: "static"});
    modalRef.componentInstance.mailProvider = "Constant Contact";
    modalRef.result.then((data)=>{
      this.mailService.logOutConstantContact(this.userInfo).subscribe(data =>{
        if (data['success']){
          console.log("called constantcontact logout");
          this.isConnected = false;
          this.statusMessage = 'Not Connected';
          this.activeModal.dismiss(true);
        }
      });
    }, (reason)=>{
    });
   
  }
  public connect(){
    var vmPop = this;
    popupTools.popup('/constantcontact/authorize', "Constantcontact Connect", {}, function (err, user) {
      if (err) {
        vmPop.isConnected = false;
        vmPop.statusMessage = 'Not Connected';
      }
      else{
        vmPop.isConnected = true;
        vmPop.statusMessage = 'Connected';
        vmPop.userInfo = user.constantContact;
        vmPop.getSaveData();
      }
    });
  }
  public save() {
    this.mailService.saveConstantContact(this.userInfo, this.gselectedMailListID, this.cselectedMailListID).subscribe(data=>{
      if (data['success'])
        console.log("saved success");
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
    submitTest()
    {

      this.dataForTest = {};
      this.dataForTest = {
        "mailProvider": "constant contact",
        "userInfo": this.userInfo,
        "mailListID" : this.gselectedMailListID,
      }
      const modalRef = this.modalService.open(TestMessageComponent, {centered: true , backdrop: "static"});
      modalRef.componentInstance.mailProviderData = this.dataForTest;

      //this.modalService.open(TestMessageComponent, {centered: true, backdrop:"static"});
      // this.mailService.constantContactSubmit(this.userInfo, "", "", this.gselectedMailListID).subscribe(data=>{

      // })
    }
}
