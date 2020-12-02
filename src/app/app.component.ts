import { Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: '[id=app]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'new-website';
  divLogin = false;
  divReset = false;
  divRegister = false;
  divNews = false;
  divLang = false;
  action = '';

  constructor(private render:Renderer2, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {          
        this.action = params['action'];
        if(this.action) this.onOpen(this.action);
    });
  }

  onClose(close:any) {
  	this.render.removeClass(document.body,"no-scroll-modal");
  	this.divLogin = false;
    this.divReset = false;
    this.divRegister = false;
  }

  onOpen(e:string) {
    this.render.addClass(document.body,"no-scroll-modal");
  	switch (e) {
  		case "login": this.divLogin = true; break;
  		
  		default:
  			// code...
  			break;
  	}
  }

  onChange(p:string) {
    switch (p) {
      case "resetpass":
        this.divReset = true;
        this.divLogin = false;
        this.divRegister = false;        
        break;

      case "login":
        this.divLogin = true;
        this.divReset = false;
        this.divRegister = false;
        break;

      case "register":
        this.divRegister = true;
        this.divReset = false;
        this.divLogin = false;
        break;
      
      default:
        // code...
        break;
    }
  }
}
