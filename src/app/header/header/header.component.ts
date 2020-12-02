import { Component, OnInit, EventEmitter, Output, Renderer2 } from '@angular/core';

import { LocalStorageService } from '../../_services';
import { AuthenticationService } from '../../_services';

@Component({
  selector: '[id=header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

	divSearch = false;
	divCart = false;
	divWish = false;
  menu = false;
  cartQty = 0;
  message = '';
  accountMenu = false;


  @Output() opened = new EventEmitter<string>();

  constructor(
    private render:Renderer2,
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit(): void {

    let cart = this.localStorageService.get('cart');
    if(cart) this.cartQty = cart.qty;

    this.localStorageService.watchStorage().subscribe((res) => {
      if(res.key == 'cart') {
        if(res.value) {
          this.cartQty = res.value.qty;
        } else {
          this.cartQty = 0;
        }
      }
    })
  }

  onClose(close:any) {
  	this.render.removeClass(document.body,"no-scroll-right");
  	this.divSearch = close
  	this.divCart = close
  	this.divWish = close
    this.menu = close
  }

  openModel(e:string) {
    this.opened.emit(e);
  }

  openPanel(panel:string) {
  	this.render.addClass(document.body,"no-scroll-right");
  	switch (panel) {
  		case "search":	this.divSearch = true;	break;
  		case "cart":	this.divCart = true;	break;  		
  		case "wish":	this.divWish = true;	break;  		
  		default:	break;
  	}
  }

  openMenu() {
    this.render.addClass(document.body, "no-scroll-left");
    this.menu = true;
  }

  userMenu() {
    if (this.authenticationService.currentUserValue) { 
      this.accountMenu = true;
    } else {      
      this.openModel('login');
    }
  }

  logout() {
    this.authenticationService.logout();
    location.reload(true);
  }

}
