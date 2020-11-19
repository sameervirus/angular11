import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Product } from '../../models/Product';

@Component({
  selector: '[id=related]',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.css']
})
export class RelatedComponent implements OnInit {
	relateds:any;
  @Input() item:Product;
  constructor(private itemService:ItemService) { }

  ngOnInit(): void {

  	this.getRelatedItem(this.item.dept_id,this.item.item_id);  	

  }

  getRelatedItem(category:string,id:number): void {
	this.itemService.getRelatedItem(category,id)
	  .subscribe(res => {
	    this.relateds = {
	    	item_id: res.item_id,
	    	item_name: res.item_name,
	    	rtp: res.rtp,
	    	msrp:res.msrp,
	    	image:res.image
	    }
	  }		    
	);
  }

}
