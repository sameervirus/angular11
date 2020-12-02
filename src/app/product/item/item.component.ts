import { Component, OnInit } from '@angular/core';
import { Product, AddToCartClass } from '../../_models';
import { ItemService } from '../../_services';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from '../../_services/notification.service';
import { LocalStorageService } from '../../_services/local-storage.service';

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
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService
  ) { 
    this.cartQty = 1;
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('item');
  	this.getItemDetails(id);
  }

  getItemDetails(id:number): void {
    this.spinner.show();
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
    const addClass = new AddToCartClass(
                                      this.selectedItemSize.sizeQty,
                                      this.cartQty,
                                      this.selectedItemSize.itemId,
                                      this.item.colorDesc,
                                      this.item.item_name,
                                      this.selectedItemSize.sizeDesc,
                                      this.item.slides[0],
                                      this.item.rtp,
                                      this.localStorageService,
                                      this.notificationService
                                      );
    addClass.addToCart();
  }

}
