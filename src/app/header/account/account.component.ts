import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AccountService } from '../../_services/';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
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
export class AccountComponent implements OnInit {
  
  user:any;
  loginUser:any;

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    this.accountService.getUserDetails(this.loginUser.email).subscribe((res) => this.user = res);
  }

  changeView(e:string) {

  }

  editDetails(e:string) {

  }

}
