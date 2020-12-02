import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: '[id=registration]',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Output() closed = new EventEmitter<boolean>();
  @Output() changeit = new EventEmitter<string>();

  loading = false;

  constructor() { }

  ngOnInit(): void {
  }

  closePanel(e:boolean) {  	
  	this.closed.emit(e);
  }

  changePanel(p:string) {
  	this.changeit.emit(p);
  }

}
