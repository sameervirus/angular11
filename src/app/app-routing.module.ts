import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { AccountComponent } from './header/account/account.component'
import { ItemComponent } from './product/item/item.component'
import { CategoryComponent } from './product/category/category.component'
import { AuthGuard } from './_helpers';

const routes: Routes = [

	{ path: '', component: HomeComponent },
	{ path: 'product/:category', component: CategoryComponent },
	{ path: 'product/:category/:item', component: ItemComponent },
	{ path: 'my-account', component: AccountComponent, canActivate: [AuthGuard] },

	// otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
