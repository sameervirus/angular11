import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: '[id=product]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

	item:any;
  newColor:any;
  selectedItemSize:any;
  selectedItemColor:any;
  slideConfig = {dots:true}

  constructor(
  	private itemService:ItemService,
  	private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  	this.getItemDetails(74074);
  }

  getItemDetails(id:number): void {
    this.itemService.getItemDetails(id)
      .subscribe(item => {
        this.item = item, 
        this.selectedItemSize = {
          itemId: item.item_id,
          sizeDesc: item.size,
          sizeQty: item.qty
        }
        this.selectedItemColor = {
          desc: item.colorDesc,
          colorId: item.color1_id,
          item_id: item.item_id,
          code: item.colorCode
        }
      });
  }

  onSelectSize(size:any): void {
    this.selectedItemSize = size;
  }

  onSelectColor():void {
    // if(this.item) this.item.slides = this.item.slides;
  }

}
