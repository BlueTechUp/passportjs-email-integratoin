import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'togglelabel',
  templateUrl: './togglelabel.component.html',
})
export class ToggleLabelComponent  {
  @Input() on: boolean;
  @Input() topic: string;
  @Input() label: string;
  @Output() toggled: EventEmitter<boolean> = new EventEmitter();

  onClick() {
    this.on = !this.on;
    this.toggled.emit(this.on);
  }
}
