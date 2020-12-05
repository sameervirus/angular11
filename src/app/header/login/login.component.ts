import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../_services/';
import { NotificationService } from '../../_services/';

@Component({
  selector: '[id=login-div]',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: any;
  loading = false;
  submitted = false;
  button_text= 'visibility_off';
  input_type= 'password';
  error = '';

  @Output() closed = new EventEmitter<boolean>();
  @Output() changeit = new EventEmitter<string>();

  constructor(
  	private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
    ) { 
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }
     }

  ngOnInit(): void {

  	this.loginForm = this.formBuilder.group({
        email: ['', Validators.compose([
                   Validators.required,
                   Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                  ])],
        password: ['', Validators.required]
    });

  }

  closePanel(e:boolean) {  	
  	this.closed.emit(e);
  }

  changePanel(p:string) {
  	this.changeit.emit(p);
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  // get return url from route parameters or default to '/'
                  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                  this.closePanel(true);
                  this.router.navigate([returnUrl]);
                  this.notificationService.sendMessages(
                    `You're logged in!`,
                    'success', 
                    true, 
                    {'text':'Ok'}, 
                  );
              },
              error: error => {
                  this.notificationService.sendMessages(
                    error,
                    'error', 
                    true, 
                    {'text':'Ok'}, 
                  );
                  this.error = error;
                  this.loading = false;
              }
          });
  }

  toggle() {	
  	if(this.button_text == 'visibility_off') {
  		this.button_text = 'visibility';
  		this.input_type = 'text';
  	} else {
  		this.button_text = 'visibility_off';
  		this.input_type = 'password';
  	}
  }

}
