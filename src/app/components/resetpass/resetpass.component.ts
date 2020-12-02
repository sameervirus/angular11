import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[id=reset-div]',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {

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
