import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
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
  selector: 'app-get-response-connect',
  templateUrl: './get-response-connect.component.html',
  styleUrls: ['./get-response-connect.component.css']
})
export class GetResponseConnectComponent implements OnInit {

  public env = env;
  public isConnected = false;
  public statusMessage = 'Not Connected';
  connectForm: FormGroup;

  public integrationSettingMessage = 'Global Integration Settings'; // or Popup Integration Settings
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
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.createForm();
  }

  private createForm() {
    this.connectForm = this.formBuilder.group({
      apikey: '',
      url: ''
    })
  }

  private submitForm() {
    console.log("called submitForm");
    this.mailService.connectGetResponse(this.connectForm.value.apikey, this.connectForm.value.url).subscribe(data => {
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

  ngOnInit() {
    this.cselectedMailListID="none"; 
    this.gselectedMailListID="none";
    this.isConnected = false;

    this.mailService.getGetResponseConnectedState().subscribe(data=>{
      if (data['connected']){
        this.userInfo = data['data'];
        this.mailService.connectGetResponse(this.userInfo.apikey,null).subscribe(data=>{
          if(data['success']) {
            this.isConnected = true;
            this.statusMessage = data['message'];
            this.userInfo = data['data'];
            this.getSaveData();
          } else {
            this.statusMessage = 'Not Connected';
          }
        }, error =>{
          console.log(error);
        });
      }
      else{
        this.isConnected = false;
      }
    });
  }

  public getSaveData(){
    this.mailService.getGetResponseSavedInfo(this.userInfo).subscribe(data=>{
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
    this.mailService.getGetResponseList(this.userInfo).subscribe(data=>{
      if (data['success'])
      {
        var lists = data['data'];
        var obj;  
        for (obj in lists){
          this.itemList.push({id:obj, name: lists[obj].name});
        }
        console.log(this.itemList);
      }
    });
  }

  public save() {
    this.mailService.saveGetResponse(this.userInfo, 
      this.gselectedMailListID, 
      this.cselectedMailListID,
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

  public logout(){

    const modalRef = this.modalService.open(ConfirmDlgComponent, {centered: true , backdrop: "static"});
    modalRef.componentInstance.mailProvider = "Getresponse";
    modalRef.result.then((data)=>{
      this.mailService.logOutGetResponse(this.userInfo).subscribe(data =>{
        if (data['success']){
          console.log("called activecampaign logout");
          this.isConnected = false;
          this.statusMessage = 'Not Connected';
          this.connectForm.setValue({'apikey':'', 'url':''});
          this.activeModal.dismiss(true);        }
      });
    }, (reason)=>{    });
}

  submitTest(){
    this.dataForTest = {};
    this.dataForTest = {
      "mailProvider": "getresponse",
      "userInfo": this.userInfo,
      "mailListID" : this.gselectedMailListID,
    }
    const modalRef = this.modalService.open(TestMessageComponent, {centered: true , backdrop: "static"});
    modalRef.componentInstance.mailProviderData = this.dataForTest;
  }
}
