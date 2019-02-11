import { Component, Input } from '@angular/core';

@Component({
  selector: 'switchlabel',
  templateUrl: './switchlabel.component.html',
})
export class SwitchLabelComponent  {
  @Input() on: boolean;
  @Input() topic: string;
  @Input() label: string;
  @Input() className: string;
}
