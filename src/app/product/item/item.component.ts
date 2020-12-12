import { Component, OnInit } from '@angular/core';
import { Product, scrollWindowToTop } from '../../_models';
import { ItemService } from '../../_services';
import { CartService } from '../../_services/cart.service'
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: '[id=product]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

	item:any;
  newColor:any;
  cartQty:number;
  selectedItemSize:any;
  slideConfig = {dots:true, infinite:false}

  constructor(
  	private itemService:ItemService,
  	private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private cartService: CartService
  ) { 
    this.cartQty = 1;
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('item');
  	this.getItemDetails(id);
  }

  getItemDetails(id:number): void {
    this.spinner.show();
    scrollWindowToTop();
    this.itemService.getItemDetails(id)
      .subscribe(item => {        
        this.item = item, 
        this.selectedItemSize = {
          itemId: item.item_id,
          sizeDesc: item.size,
          sizeQty: item.qty
        };
        this.spinner.hide();
      });
  }

  onSelectSize(size:any): void {
    this.selectedItemSize = size;
  }

  onSelectColor():void {
    // if(this.item) this.item.slides = this.item.slides;
  }

  addToCart() {
    this.cartService.addToCart(this.selectedItemSize.sizeQty,
                      this.cartQty,
                      this.selectedItemSize.itemId,
                      this.item.colorDesc,
                      this.item.item_name,
                      this.selectedItemSize.sizeDesc,
                      this.item.slides[0],
                      this.item.rtp);
  }

}
