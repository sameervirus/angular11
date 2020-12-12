import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService, NotificationService, AuthenticationService } from '../_services';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl:string = 'http://store.msou.com/api/user.php';

  constructor(
  	private localStorageService: LocalStorageService,
  	private notificationService: NotificationService,
  	private authenticationService: AuthenticationService,
    private http: HttpClient
  	) { }

  addToCart(sizeQty,cartQty,itemId,colorDesc,item_name,sizeDesc,image,rtp) {

    let ok = 1;
    
    if(Number(cartQty) > Number(sizeQty)) {
      this.wormNoQty();
      ok = 0;
    }
    
    let cart = this.localStorageService.get('cart');
    let haveThis = 0;
    
    if(cart && cart.items != undefined && ok == 1) {
      for (var i = 0; i < cart.items.length; ++i) {
        if(itemId == cart.items[i].item_id) {
          if(Number(cartQty) + Number(cart.items[i].qty) > Number(sizeQty)) {
            this.wormNoQty();
            ok = 0;
          }
          else {
            cart.items[i].qty = Number(cartQty) + Number(cart.items[i].qty);
            cart.qty = Number(cart.qty) + Number(cartQty);
          }
          haveThis = 1;
        }
      }
    }

    if(haveThis == 0) {
      let item:any = 
        {
          'item_id' : itemId,
          'colorDesc' : colorDesc,
          'item_name': item_name,
          'sizeDesc' : sizeDesc,
          'image': image,
          'qty': cartQty,
          'qtys': sizeQty,
          'rtp': rtp
        };

      if(cart && cart.items != undefined) {
        cart.qty = Number(cart.qty) + Number(cartQty);
        cart.items.push(item);
      } else {
        cart = {items:[item],qty:cartQty};
      }
    }

    if(ok == 1) {
      this.localStorageService.set('cart', cart);
      
      if(this.authenticationService.currentUserValue) { 
        let currentUser = this.localStorageService.get('currentUser');
        let itemsIds = cart.items.map(item => item.item_id);
        this.addToServer(itemsIds, currentUser.id).subscribe();
      }
      this.wormAdd(itemId);
    }
  }

  addToServer(items, id) {
    let action = 'addToCart';
    return this.http.post<any>(this.baseUrl, { action, items, id });
  }

  wormAdd(itemId) {
    this.notificationService.sendMessages(
      `Item ${ itemId } Added to you Cart`,
      'success', 
      true, 
      {'text':'Ok'}, 
      {'text':'Proceed to checkout','link':'checkout'}
    );
  }

  wormNoQty() {
    this.notificationService.sendMessages(
      `The request quantity more than available stock`,
      'error', 
      true, 
      {'text':'Ok'}
    );
  }
}
