import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MailProviderService } from '../mail-provider.service';
import { environment as env } from '../../environments/environment';

@Component({
  selector: 'app-test-message',
  templateUrl: './test-message.component.html',
  styleUrls: ['./test-message.component.css']
})
export class TestMessageComponent implements OnInit {

  @Input() mailProviderData: any;

  
  public provoiderName;
  public userInfo;
  public listid;
  public formid;
  public email;
  public tag;
  public eventSubscriber;
  public env = env;
  public testResult : String;
  testForm: FormGroup;
  constructor( 
    public activeModal: NgbActiveModal,
    private mailService: MailProviderService,
    private formBuilder: FormBuilder) { 
      this.createForm();
    }

  ngOnInit() {
    if (this.mailProviderData){
      this.provoiderName = this.mailProviderData.mailProvider;
      this.userInfo = this.mailProviderData.userInfo;
      this.listid = this.mailProviderData.mailListID;
      this.formid = this.mailProviderData.formListID;
      if (this.provoiderName == "drip"){
        this.tag = this.mailProviderData.tagString;
        this.eventSubscriber = this.mailProviderData.eventString;
      }
      this.testResult = "";
    }
  }
  private createForm() {
    this.testForm = this.formBuilder.group({
      email: ''
    })
    
  }
  private submitForm() {
    this.testResult = "";
    this.email = this.testForm.value.email;
    if (this.provoiderName == "active-campaign"){ // submit for active campaign
      this.mailService.activeCampaignSubmit(this.mailProviderData.userInfo, "","",this.listid, this.formid, this.email).subscribe(data=>{
        if (data['success']){
          this.activeModal.close(true);
        }
        else{
          this.testResult = data['data'];
        }
      });
    }
    else if(this.provoiderName == "drip"){
      this.mailService.dripSubmit(this.mailProviderData.userInfo, "","",this.listid, this.formid, this.eventSubscriber,this.tag,this.email).subscribe(data=>{
        if (data['success']){
          this.activeModal.close(true);
        }
        else{
          this.testResult = data['data'];
        }
      });
    }
    else if (this.provoiderName == "mailchimp"){
      this.mailService.mailchimpSubmit(this.mailProviderData.userInfo,"","",this.listid, this.email).subscribe(data=>{
        if (data['success']){
          this.activeModal.close(true);
        }
        else{
          this.testResult = data['data'];
        }
      })
    }
    else if (this.provoiderName == "getresponse"){
      this.mailService.getResponseSubmit(this.mailProviderData.userInfo,"","",this.listid, this.email).subscribe(data=>{
        if (data['success']){
          this.activeModal.close(true);
        }
        else{
          this.testResult = data['data'];
        }
      })
    }
    else if (this.provoiderName == "constant contact"){
      this.mailService.constantContactSubmit(this.mailProviderData.userInfo,"","",this.listid, this.email).subscribe(data=>{
        if (data['success']){
          this.activeModal.close(true);
        }
        else{
          this.testResult = data['data'];
        }
      })
    }
    else if (this.provoiderName == "aweber"){
      this.mailService.AweberSubmit(this.mailProviderData.userInfo,"","",this.listid, this.email).subscribe(data=>{
        if (data['success']){
          this.activeModal.close(true);
        }
        else{
          this.testResult = data['data'];
        }
      })
    }
  }

}
