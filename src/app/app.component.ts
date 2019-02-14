import { Component } from '@angular/core';
//import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ActiveCampaignConnectComponent } from './active-campaign-connect/active-campaign-connect.component';
import { AweberConnectComponent } from './aweber-connect/aweber-connect.component';
import { ConstantContractConnectComponent } from './constant-contract-connect/constant-contract-connect.component';
import { DripConnectComponent } from './drip-connect/drip-connect.component';
import { GetResponseConnectComponent } from './get-response-connect/get-response-connect.component';
import { MailchimpConnectComponent } from './mailchimp-connect/mailchimp-connect.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment as env } from '../environments/environment';
import  {ZapierComponent} from './zapier/zapier.component';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Mail Provider Component';
  providers = [];
  public env = env;

  connectStatus = "CONNECT"

  constructor(
   // private _loadingBar: SlimLoadingBarService,
    private _router: Router,
    private _bsModalService: NgbModal
  ) {
    this._router.events.subscribe((event: Event) => {
      //this.navigationInterceptor(event);
    });
   
    this.providers.push({ 'name': 'Constant Contact', 'class': 'provider-constant-contact', 'connected': false });
    this.providers.push({ 'name': 'Drip', 'class': 'provider-drip', 'connected': false });
    this.providers.push({ 'name': 'AWeber', 'class': 'provider-aweber', 'connected': false });
    this.providers.push({ 'name': 'MailChimp', 'class': 'provider-mailchimp', 'connected': false });
    this.providers.push({ 'name': 'GetResponse', 'class': 'provider-getresponse', 'connected': false });
    this.providers.push({ 'name': 'ActiveCampaign', 'class': 'provider-activecampaign', 'connected': false });
    this.providers.push({ 'name': 'Zapier', 'class': 'provider-zapier', 'connected': false });
    console.log(this.providers);
  }

  // private navigationInterceptor(event: Event): void {
  //   if (event instanceof NavigationStart) {
  //     this._loadingBar.start();
  //   }
  //   if (event instanceof NavigationEnd) {
  //     this._loadingBar.complete();
  //   }
  //   if (event instanceof NavigationCancel) {
  //     this._loadingBar.stop();
  //   }
  //   if (event instanceof NavigationError) {
  //     this._loadingBar.stop();
  //   }
  // }

  openConnectModal($event) {
    if($event) {
      switch($event.name) {
        case 'Constant Contact':
          const modalConstantContractRef = this._bsModalService.open(ConstantContractConnectComponent, { centered: true, backdrop: "static" });
          modalConstantContractRef.componentInstance.title = 'Connect ' + $event.name;
          console.log(this.providers[0].connected);

        break;
        case 'Drip':
          const modalDripRef = this._bsModalService.open(DripConnectComponent, { centered: true, backdrop: "static" });
          modalDripRef.componentInstance.title = 'Connect ' + $event.name;
        break;
        case 'AWeber':
          const modalAWeberRef = this._bsModalService.open(AweberConnectComponent, { centered: true, backdrop: "static" });
          modalAWeberRef.componentInstance.title = 'Connect ' + $event.name;
        break;
        case 'MailChimp':
          const modalMailchimpRef = this._bsModalService.open(MailchimpConnectComponent, { centered: true, backdrop: "static"});
          modalMailchimpRef.componentInstance.title = 'Connect ' + $event.name;
        break;
        case 'GetResponse':
          const modalGetresponseRef = this._bsModalService.open(GetResponseConnectComponent, { centered: true, backdrop: "static" });
          modalGetresponseRef.componentInstance.title = 'Connect ' + $event.name;
          modalGetresponseRef.componentInstance.id = 10;

          modalGetresponseRef.result.then((result) => {
            this.providers[5].connected = true;
            console.log(result);
          }).catch((error) => {
            console.log(error);
          })
        break;
        case 'ActiveCampaign':
          const modalActivecampaignRef = this._bsModalService.open(ActiveCampaignConnectComponent, { centered: true, backdrop: "static" });
          modalActivecampaignRef.componentInstance.title = 'Connect ' + $event.name;
        break;
        case 'Zapier':
        const modalZapierRef = this._bsModalService.open(ZapierComponent, { centered: true, backdrop: "static" });
        modalZapierRef.componentInstance.title = 'Connect ' + $event.name;
      break;
      }
    }
  }
}
