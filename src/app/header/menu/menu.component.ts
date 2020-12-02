import { Component, OnInit, Renderer2 } from '@angular/core';
import { ItemService } from '../../_services/item.service';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { scrollWindowToTop } from '../../_models';

@Component({
  selector: '[id=menu]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private itemService: ItemService,
    private render:Renderer2) { }

  codec = new HttpUrlEncodingCodec;

  menuLevel = 0;
  categories:any;

  ngOnInit(): void {
    this.getCategoriesNames();
  }

  ngEncode(param: string){
    return this.codec.encodeValue(param);
  }

  closePanel() {    
    this.render.removeClass(document.body,"no-scroll-left");
  }

  openPanel(name:string, level:number) {
    this.menuLevel = level;
    this.render.addClass(document.body,"level"+level)
  }

  changeLevel() {    
    this.render.removeClass(document.body,"level"+this.menuLevel)
    this.menuLevel = this.menuLevel - 1;
  }

  getCategoriesNames() {
    this.itemService.getCategoriesNames().subscribe((res) => {      
      this.categories = res;
    });
  }

  changeCategory(category:string) {
    this.closePanel();
    scrollWindowToTop();
  }

}
