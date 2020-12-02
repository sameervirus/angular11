import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: '[id=wishpanel]',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(150)
      ]),
      transition('* => void', [
        animate(150, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class WishComponent implements OnInit {

	@Output() closed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closePanel(e:boolean) {  	
  	this.closed.emit(e);
  }

}
