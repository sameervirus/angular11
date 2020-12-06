import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { scrollWindowToTop } from '../../_models';

import { ItemService } from '../../_services';

@Component({
  selector: '[id=category]',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

	products:any;
  items:any;
	p: number = 1;
	name:any;
  selectedSort:any;
  itemsColors:any;
  itemsSize:any;
  selectedColor:any;
  selectedSize:any;
  selectedPrice:any;
  selectedPriceMin:any;
  selectedPriceMax:any;
  filtered:boolean = false;
  filteredMobile:boolean = false;

  constructor(private route: ActivatedRoute,private itemService:ItemService,private spinner: NgxSpinnerService,) { }

  sortFilters: any[] = [
    { name: 'Sort By', value: '' },
    { name: 'Latest', value: 'item_id' },
    { name: 'Price: Low to high', value: 'rtpAsc' },
    { name: 'Price: High to low', value: 'rtpDes' }
  ];
  
  
  ngOnInit(): void {  	
  	this.route.params.subscribe(
	  params => {
      let category= params['category'];
      this.getCategory(category);
      this.name = category;
	  });
  	
  }

  getCategory(category:string): void {
  	this.spinner.show();
    this.itemService.getCategory(category)
      .subscribe(res => {
        if(res) {
          this.resetFilters();
        	this.products = res; 
          this.items = res;         	
          this.itemsColors = this.colors(res);
          this.itemsSize = this.sizes(res);
        } else {
          this.products = [];
        }
        this.spinner.hide();
      });
  }

  pageChanged(page:number) {
    this.p = page;
    scrollWindowToTop();
  }

  colors(res:any) {
    return res.map(item => item.code).filter((value, index, self) => self.indexOf(value) === index);
  }

  filterColors(color:string) {    
    this.selectedColor = color;
    this.filterItems()
  }

  sizes(res:any) {
    return res.map(item => item.size).filter((value, index, self) => self.indexOf(value) === index);
  }

  filterSizes(size:string) {
    this.selectedSize = size;
    this.filterItems()
  }

  filterPrice(price:string) {
    this.selectedPrice = price;
    switch (price) {
      case "less100": this.selectedPriceMin = undefined; this.selectedPriceMax = 101; break;
      case "less200": this.selectedPriceMin = 100; this.selectedPriceMax = 201; break;
      case "more200": this.selectedPriceMin = 201; this.selectedPriceMax = undefined; break;
      
      default:
        // code...
        break;
    }
    this.filterItems()
  }

  filterItems() {
    this.p = 1;
    this.filtered = true;
    this.products = this.items.filter((value, index, self) => 
      (!this.selectedSize || value.size == this.selectedSize) 
      && (!this.selectedColor || value.code == this.selectedColor)
      && (!this.selectedPriceMin || value.rtp > this.selectedPriceMin)
      && (!this.selectedPriceMax || value.rtp < this.selectedPriceMax)
    )
  }

  onInputChange(e:any) {
    this.selectedSort = e;
    this.sortByField(e);
  }

  resetFilters() {
    this.p = 1;
    this.products = this.items;
    this.filtered = false;
    this.selectedColor = '';
    this.selectedSize = '';
    this.selectedPrice = '';
    this.selectedPriceMin = '';
    this.selectedPriceMax = '';
    this.selectedSort ? this.sortByField(this.selectedSort) : '';
  }

  sortByField(f:any) {
    let high = true;
    this.p = 1;
    let field = 'item_id';
    if(f == 'item_id') {field = 'item_id'; high = true;}
    if(f == 'rtpAsc') {field = 'rtp'; high = false;}
    if(f == 'rtpDes') {field = 'rtp'; high = true;}
    if(high) {
      this.products = this.products.sort((a:any, b:any) => {
        if (Number(a[field]) > Number(b[field]))
          return -1;
        if (Number(a[field]) < Number(b[field]))
          return 1;
        return 0;
      });
    } else {
      this.products = this.products.sort((a:any, b:any) => {
        if (Number(a[field]) < Number(b[field]))
          return -1;
        if (Number(a[field]) > Number(b[field]))
          return 1;
        return 0;
      });
    }    
  }

}
