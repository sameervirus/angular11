import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ItemService } from '../../_services/item.service';
import { Product, Item, scrollWindowToTop } from '../../_models';

@Component({
  selector: '[id=related]',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.css']
})
export class RelatedComponent implements OnInit {
  relateds:any;
  @Input() item:any;
  @Output() getItemDetailsFromChild: EventEmitter<any> = new EventEmitter();

  constructor(private itemService:ItemService) { }

  ngOnInit(): void {

  	this.getRelatedItem(this.item.dept_id,this.item.item_id);  	

  }

  getRelatedItem(category:string,id:number): void {
	this.itemService.getRelatedItem(category,id)
	  .subscribe(res => this.relateds = res);
  }

  clickRelated(id:number): void {  	
    this.getItemDetailsFromChild.next(id);
    scrollWindowToTop();
  }

}
