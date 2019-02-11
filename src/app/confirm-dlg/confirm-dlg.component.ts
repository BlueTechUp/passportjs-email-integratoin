import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment as env } from '../../environments/environment';

@Component({
  selector: 'app-confirm-dlg',
  templateUrl: './confirm-dlg.component.html',
  styleUrls: ['./confirm-dlg.component.css']
})
export class ConfirmDlgComponent implements OnInit {

  @Input() mailProvider :any;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    
  }
  public agree()
  {
    this.activeModal.close(true);
  }
  public disagree()
  {
    this.activeModal.dismiss(true);
  }
}
