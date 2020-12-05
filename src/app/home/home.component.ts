import { Component, OnInit } from '@angular/core';

import { ItemService } from '../_services';

@Component({
  selector: '[id=home]',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newCollection:any;
  constructor(private itemService:ItemService) { }

  ngOnInit(): void {
  	this.getCategory('all');
  }

  getCategory(category:string) {
  	this.itemService.getCategory(category)
  	.subscribe(res => {
  		this.newCollection = res;
  	});
  }

}
