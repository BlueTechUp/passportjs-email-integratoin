import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MailProviderService } from '../mail-provider.service';
import { environment as env } from '../../environments/environment';
import { TestMessageComponent} from '../test-message/test-message.component';
import { ConfirmDlgComponent } from '../confirm-dlg/confirm-dlg.component';

interface item{
  id:   String,
  name: String
};

@Component({
  selector: 'app-active-campaign-connect',
  templateUrl: './active-campaign-connect.component.html',
  styleUrls: ['./active-campaign-connect.component.css']
})
export class ActiveCampaignConnectComponent implements OnInit {

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

  public cselectedFormListID="none"; 
  public gselectedFormListID="none";

  public itemList: item[];
  public formList: item[];

  public dataForTest: any;

  connectForm: FormGroup;


  constructor(
    public activeModal: NgbActiveModal,
    private mailService: MailProviderService,
    private formBuilder: FormBuilder,
    private modalService:NgbModal
  ) {
    this.createForm();
  }
  ngOnInit() {
    this.cselectedMailListID="none"; 
    this.gselectedMailListID="none";
    this.cselectedFormListID="none"; 
    this.gselectedFormListID="none";
    this.isConnected = false;
    
    this.getMailList();
    // this.mailService.getActiveCampaignConnectedState().subscribe(data=>{
    //   if (data['connected']){
    //     this.userInfo = data['data'];
    //     this.mailService.connectActiveCampaign(this.userInfo.apikey, this.userInfo.apiurl).subscribe(data => {
    //       if(data['success']) {
    //         this.isConnected = true;
    //         this.statusMessage = data['message'];
    //         this.userInfo = data['data'];
    //         this.getSaveData();
    //       } else {
    //         this.statusMessage = 'Not Connected';
    //       }
    //     }, error => {
    //       console.log(error);
    //     });
    //   }
    //   else{
    //     this.isConnected = false;
    //   }
    // });
  }

  public getSaveData(){
    this.mailService.getActiveCampaignSavedInfo(this.userInfo).subscribe(data=>{
        if (data['success']){
          this.gselectedMailListID = data['glist_id'];
          this.cselectedMailListID = data['clist_id'];
          this.gselectedFormListID = data['gform_id'];
          this.cselectedFormListID = data['cform_id'];
        }
        this.getMailList();

    });
  }
  public getMailList(){
    this.itemList = [];
    this.itemList.push({id:"none",name:"--Don't push to list--"});

    this.mailService.getActiveCampaignList(this.userInfo).subscribe((data:Array<object>)=>{
      var mail_item;
      for( mail_item of data) {
        if (mail_item != null)
          this.itemList.push({id:mail_item.id, name:mail_item.name});
      }
        console.log(this.itemList);
        this.getFormList();
    });
  }
  public getFormList(){
    this.formList = [];
    this.formList.push({id:"none",name:"--Don't push to list--"});

    this.mailService.getActiveCampaignFormList(this.userInfo).subscribe((data:any)=>{
      var mail_item;
      for( mail_item of data) {
        if (mail_item != null)
          this.formList.push({id:mail_item.id, name:mail_item.name});
      }
        console.log(this.formList);
    });
  }
  public logout(){
    const modalRef = this.modalService.open(ConfirmDlgComponent, {centered: true , backdrop: "static"});
    modalRef.componentInstance.mailProvider = "Active Campaign";
    modalRef.result.then((data)=>{
      this.mailService.logOutActiveCampaign(this.userInfo).subscribe(data =>{
        if (data['success']){
          console.log("called activecampaign logout");
          this.isConnected = false;
          this.statusMessage = 'Not Connected';
          this.connectForm.setValue({'apikey':'', 'url':''});
          this.activeModal.dismiss(true);
        }
      });
    }, (reason) =>{
        //on dismiss
    });   
  }

  private createForm() {
    this.connectForm = this.formBuilder.group({
      apikey: '',
      url: ''
    })
  }

  // connect button 
  private submitForm() {
    this.mailService.connectActiveCampaign(this.connectForm.value.apikey, this.connectForm.value.url).subscribe(data => {
      if(data['success']) {
        this.isConnected = true;
        this.statusMessage = data['message'];
        this.userInfo = data['data'];
        this.getSaveData();
      } else {
        this.statusMessage = 'Not Connected';
      }
    }, error => {
      console.log(error);
    });
  }

  public save() {
    
    for (let  i = 0 ; i < this.itemList.length; i++)
    {
        if (this.itemList[i].id === this.gselectedFormListID){
          console.log('hello' + this.itemList[i].name);
        }
    }
    this.mailService.saveActiveCampaign(this.userInfo, 
      this.gselectedMailListID, 
      this.cselectedMailListID,
      this.gselectedFormListID,
      this.cselectedFormListID).subscribe(data=>{
      if (data['success'])
        {
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
    switchSubscribe(value){
      console.log(value);
      if (this.isGlobalIntegrationSetting){
        this.switchG_C(value);
      }
      else{
      }
    }
    public testSubmit(){     
      this.dataForTest = {};
      this.dataForTest = {
        "mailProvider": "active-campaign",
        "userInfo": this.userInfo,
        "mailListID" : this.gselectedMailListID,
        "formListID" : this.gselectedFormListID
      }
      const modalRef = this.modalService.open(TestMessageComponent, {centered: true , backdrop: "static"});
      modalRef.componentInstance.mailProviderData = this.dataForTest;
    }
}
