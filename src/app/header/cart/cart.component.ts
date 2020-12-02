import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LocalStorageService } from '../../_services/local-storage.service';
import { ItemService } from '../../_services/item.service';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: '[id=cartpanel]',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
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
export class CartComponent implements OnInit {

  cart:any;
  localItems:any;
  totalItems:number = 0;
  loading:boolean = false;

  @Output() closed = new EventEmitter<boolean>();

  constructor(
    private localStorageService: LocalStorageService,
    private itemService: ItemService,
    private notificationService: NotificationService,
    ) { }

  ngOnInit(): void {
    
    this.getInit();
  }

  getInit() {
    this.localItems = this.localStorageService.get('cart');
    if(this.localItems && this.localItems.items != undefined) {
      let ids = this.localItems.items.map((item:any) => {
        return item.item_id;
      });
      this.getData(ids);      
    }
  }

  closePanel(e:boolean) {  	
  	this.closed.emit(e);
  }

  getData(ids:[]) {
    this.loading = true;
    this.itemService.cartData(ids).subscribe((res) => {      
      this.cart = this.margeArray(res,this.localItems);
      this.totalItems = this.total();
      this.loading = false;      
    });
  }

  margeArray(res:any,locals:any) {

    let margeArray:any = [];
    res.forEach(function(item:any){
      margeArray[item.item_id] = item;
    });

    // map new array based on each subscription
    let result = locals.items.map(function(sub:any){
      let user = margeArray[sub.item_id];

      if(user){
        // if(user.qtys == 0) sub.qty = 0;
        for(var key in user){
          sub[key] = user[key]
        }
      }
      return sub;
    });

    return result;
  }

  total()
  {
    return this.cart.reduce((sum:any,x:any)=>
      ({qty:1, rtp:sum.rtp+x.qty*x.rtp}), {qty:1,rtp:0}
    ).rtp;
  }

  changeQty(id:number, input:any, qtys:number, old:number) {
    if(Number(input.value) > Number(qtys)) {
      this.notificationService.sendMessages(
        `Item ${ id } has only ${qtys} piece`,
        'error', 
        true, 
        {'text':'Ok'}
      );
      input.value = old;
    } else {
      this.updateCart(id,input.value)
    }    
  }

  updateCart(id:number, qty:number) {
    let diff = 0;
    this.localItems.items.forEach((item:any,index:any,object:any) => {
      if(item.item_id == id) {
        diff = qty - item.qty;
        item.qty = qty;
      }
    });
    this.localItems.qty = this.localItems.qty + diff;    
    this.localStorageService.set('cart', this.localItems);
    this.getInit();
  }

  removeItem(id:number) {
    let diff = 0;
    this.localItems.items.forEach((item:any,index:any,object:any) => {
      if(item.item_id == id) {        
        diff = item.qty;
        object.splice(index, 1);
      }
    });
    this.localItems.qty = Number(this.localItems.qty) - Number(diff);
    if(this.localItems.items.length == 0) {
      this.localStorageService.remove('cart');
      this.cart = undefined;
    } else {
      this.localStorageService.set('cart', this.localItems);
      this.getInit();
    }
    
  }

}
