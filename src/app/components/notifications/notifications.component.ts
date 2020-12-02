import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NotificationService } from '../../_services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: '[id=notifications]',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate(150)
      ]),
      transition('* => void', [
        animate(150, style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class NotificationsComponent implements OnInit {
	
  @Input() message: any; style: any; dismissed: any; button1: any; button2: any;

	hasNotofication:boolean = false;
	subscription: Subscription;
  
  constructor(private notificationService: NotificationService) { 

		this.subscription = notificationService.message$.subscribe(message => {
			this.message = message.content;
      this.style = message.style;
      this.button1 = message.button1;
      this.button2 = message.button2;
			this.hasNotofication = true;
			this.checkDismiss(message.dismissed);
		});
  }

  ngOnInit(): void {

  }

  checkDismiss(dismissed:boolean) {
    console.log(dismissed);
  	if(dismissed) {
  		setTimeout(()=>{                           
			      this.hasNotofication = false;
			 }, 5000);  		
  	}
  }

}
