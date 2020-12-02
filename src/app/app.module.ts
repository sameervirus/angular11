import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import your library
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './product/item/item.component';
import { RelatedComponent } from './product/related/related.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { HeaderComponent } from './header/header/header.component';
import { SearchComponent } from './header/search/search.component';
import { CartComponent } from './header/cart/cart.component';
import { WishComponent } from './header/wish/wish.component';
import { AccountComponent } from './header/account/account.component';
import { MenuComponent } from './header/menu/menu.component';
import { LoginComponent } from './header/login/login.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { LanguageComponent } from './components/language/language.component';
import { ResetpassComponent } from './components/resetpass/resetpass.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { CategoryComponent } from './product/category/category.component';
import { HomeComponent } from './home/home.component';
import { RemovewhitespacesPipe } from './custompipe/removewhitespaces.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    RelatedComponent,
    NotificationsComponent,
    HeaderComponent,
    SearchComponent,
    CartComponent,
    WishComponent,
    AccountComponent,
    MenuComponent,
    LoginComponent,
    NewsletterComponent,
    LanguageComponent,
    ResetpassComponent,
    RegistrationComponent,
    CategoryComponent,
    HomeComponent,
    RemovewhitespacesPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // Specify your library as an import
    SlickCarouselModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
