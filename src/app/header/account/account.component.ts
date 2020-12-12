import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  currentView: string = 'profile';
  orders:any;
  order:any;
  totalOrders:number;
  activeEdit = false;


  constructor(private route: ActivatedRoute, private accountService:AccountService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
    params => {
      if(params['page']) {
        let page = params['page'];      
        this.changeView(page);      
      }

      if(params['order']) {
        this.getOrder(params['order']);
      }    
    });    
  }

  getUserData() {
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    this.accountService.getUserDetails(this.loginUser.email).subscribe((res) => {
      this.user = res;
      localStorage.setItem('userDetails', JSON.stringify(res));
      if(this.currentView == 'orders') this.getOrders();
    });
  }

  changeView(e:string) {
    if(localStorage.getItem('userDetails')) {
      this.user = JSON.parse(localStorage.getItem('userDetails'));
      if(e == 'orders') this.getOrders();
    } else {
      this.getUserData();
    }
    // 
    this.currentView = e;
  }

  getOrders() {
    this.accountService.getUserOrders(this.user.id).subscribe((res) => {
      this.orders = res;
    });
  }

  getOrder(code:string) {
    this.accountService.getUserOrder(code).subscribe((res) => {
      this.order = res;
      this.currentView = 'order';
    });
  }

  editDetails(e:string) {

  }

  ConvertString(value){
    return parseFloat(value)
  }

}
