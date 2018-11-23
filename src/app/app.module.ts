import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { ClickOutsideModule } from 'ng-click-outside';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { NgPipesModule } from 'ngx-pipes';
import { ReactiveFormsModule } from '@angular/forms';

import { GetDataService } from '@services/get-data.service';
import { CookieService } from 'ngx-cookie-service';
import { CheckFavCatService } from '@services/check-fav-cat.service';

import { FavouriteCategoriesDirective } from '@directives/favourite-categories.directive';

import { AppComponent } from './app.component';
import { MenuComponent } from '@components/menu/menu.component';
import { ForYouComponent } from '@components/for-you/for-you.component';
import { ShopViewComponent } from '@components/shop-view/shop-view.component';
import { CategoryComponent } from '@components/category/category.component';
import { SingleItemComponent } from '@components/single-item/single-item.component';
import { NewestComponent } from './components/newest/newest.component';
import { RegisterFormComponent } from '@components/register-form/register-form.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { AddItemProgressBarComponent } from './components/add-item-progress-bar/add-item-progress-bar.component';

const routes: Routes = [
  {
    path: "",
    component: ForYouComponent,
  },
  //TODO child router
  {
    path: "category/:name",
    component: CategoryComponent
  },
  {
    path: "produkt/:name",
    component: SingleItemComponent
  },
  {
    path: "najnowsze",
    component: NewestComponent
  },
  {
    path: "rejestracja",
    component: RegisterFormComponent
  },
  {
    path: "profil",
    component: MyProfileComponent
  },
  {
    path: "dodaj-przedmiot",
    component: AddItemComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ForYouComponent,
    ShopViewComponent,
    CategoryComponent,
    SingleItemComponent,
    FavouriteCategoriesDirective,
    NewestComponent,
    RegisterFormComponent,
    MyProfileComponent,
    PageNotFoundComponent,
    AddItemComponent,
    AddItemProgressBarComponent,
    ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    ClickOutsideModule,
    NgPipesModule,
    NguiAutoCompleteModule,
    ReactiveFormsModule
  ],
  providers: [
    GetDataService,
    CookieService,
    CheckFavCatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
