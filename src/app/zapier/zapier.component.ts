import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment as env } from '../../environments/environment';

@Component({
  selector: 'app-zapier',
  templateUrl: './zapier.component.html',
  styleUrls: ['./zapier.component.css']
})
export class ZapierComponent implements OnInit {
  public isConnected = false;
  public statusMessage = 'Not Connected';
  public env = env;

  tableHeaders = ['Header 1', 'Header 2', 'Header 3'];
  tableRows = [
    ['Cell', 'Cell', 'Cell'],
    ['Cell', 'Cell', 'Cell'],
    ['Cell', 'Cell', 'Cell']
  ];


  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  public logout(){
  }
  public connect(){
  }
  public save(){

  }

}
