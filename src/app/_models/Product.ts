export interface Product {
  item_name: string;
  item_id: number;
  gender_id: number;
  size: string;
  departName: string;
  intlDesc: string;
  material?: string;
  materialAr?: string;
  description?: string;
  descriptionAr?: string;
  long_desc: string;
  dept_id: string;
  msrp: string;
  rtp: string;
  color1_id: string;
  colorDesc: string;
  season_id: string;
  systemPrice: string;
  qty: number;
  slides?:any;
  colorCode?:string;
}

export interface Item {
  item_name: string;
  item_id: number;
  msrp: string;
  rtp: string;
  image:string;
  category:string;
}

export function scrollWindowToTop(){
  let scrollToTop = window.setInterval(() => {
    let pos = window.pageYOffset;
    if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
    } else {
        window.clearInterval(scrollToTop);
    }
  }, 16);
}


export class AddToCartClass {

  constructor(    
    private itemQty:number,
    private requestQty:number,
    private itemId:number,
    private colorDesc:string,
    private itemName:string,
    private sizeDesc:string,
    private image:string,
    private rtp:string,
    private localStorageService: any,
    private notificationService: any,
    ) {
    this.itemQty = itemQty;
    this.requestQty = requestQty;
    this.itemId = itemId;
    this.colorDesc = colorDesc;
    this.itemName = itemName;
    this.sizeDesc = sizeDesc;
    this.image = image;
    this.rtp = rtp;
  }

  addToCart() {

    let ok = 1;
    
    if(Number(this.requestQty) > Number(this.itemQty)) {
      this.wormNoQty();
      ok = 0;
    }
    
    let cart = this.localStorageService.get('cart');
    let haveThis = 0;
    
    if(cart && cart.items != undefined && ok == 1) {
      for (var i = 0; i < cart.items.length; ++i) {
        if(this.itemId == cart.items[i].item_id) {
          if(Number(this.requestQty) + Number(cart.items[i].qty) > Number(this.itemQty)) {
            this.wormNoQty();
            ok = 0;
          }
          else {
            cart.items[i].qty = Number(this.requestQty) + Number(cart.items[i].qty);
            cart.qty = Number(cart.qty) + Number(this.requestQty);
          }
          haveThis = 1;
        }
      }
    }

    if(haveThis == 0) {
      let item:any = 
        {
          'item_id' : this.itemId,
          'colorDesc' : this.colorDesc,
          'item_name': this.itemName,
          'sizeDesc' : this.sizeDesc,
          'image': this.image,
          'qty': this.requestQty,
          'qtys': this.itemQty,
          'rtp': this.rtp
        };

      if(cart && cart.items != undefined) {
        cart.qty = Number(cart.qty) + Number(this.requestQty);
        cart.items.push(item);
      } else {
        cart = {items:[item],qty:this.requestQty};
      }
    }

    if(ok == 1) {
      this.localStorageService.set('cart', cart);
      this.wormAdd();
    }
  }


  wormAdd() {
    this.notificationService.sendMessages(
      `Item ${ this.itemId } Added to you Cart`,
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