import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class Message {
  content: string;
  style: string;
  dismissed: any;
  button1:object;
  button2:object;

  constructor(content:string, style:string, dismissed:any, button1?:object, button2?:object) {
    this.content = content
    this.style = style || 'info'
    this.dismissed =  dismissed
    this.button1 = button1 || {}
    this.button2 = button2 || {}
  }

}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
	private message = new Subject<Message>();

	message$ = this.message.asObservable();

  constructor() { }

  sendMessages(content:string, style:string, dismissed:boolean, button1?:object, button2?:object) {
  	this.message.next(new Message(content, style, dismissed, button1, button2));
  }

}
