import { Component, OnInit } from '@angular/core';
import { ForU } from '@models/forYou.model';
import { CheckFavCatService } from '@services/check-fav-cat.service';
import { Router } from "@angular/router";
import { GetDataService } from '@services/get-data.service';
import { CategoryProductsService } from '@services/category-products.service';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from '@services/category.service';


@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.scss']
})
export class ForYouComponent implements OnInit {
  forU1: any;
  forU2: any;
  forU1Image: string;
  forU2Image: string;
  moreBtn1$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  moreBtn2$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  howManyCat: number;
  favCat: string[];
  favCatName:string[];
  moreProducts1: number = 3;
  moreProducts2: number = 3;
  catNum1: any;
  catNum2: any;
  constructor(
    private checkFavCat: CheckFavCatService,
    private router: Router,
    private getCat: CategoryProductsService,
  ) {
    this.getFavCatFromCookie();
    this.setCatImages();
  }

  ngOnInit() {

  }

  getFavCatFromCookie(){
    this.favCatName= this.checkFavCat.getFavCat();
    this.checkHowManyFavCat();
  }
  checkHowManyFavCat(){
    this.howManyCat = this.checkFavCat.checkCookieData();

    if(this.howManyCat === 0){
      this.router.navigate(['/najnowsze']);
    }
    else if(this.howManyCat === 1){
      this.getFirstFavCat(this.favCatName[0], 3);
      this.getProductsNumber1(this.favCatName[0], null);

    }
    else if(this.howManyCat === 2){
      this.getFirstFavCat(this.favCatName[0], 3);
      this.getSecondFavCat(this.favCatName[1], 3);
      this.getProductsNumber1(this.favCatName[0], this.favCatName[1]);
    }
    else{
    }
  }
  getXProductsFromFirstCat(){
    this.moreProducts1 += 3
    this.hideMoreBtnIfAllProductsHaveBeenShown();
    this.getFirstFavCat(this.favCatName[0] ,this.moreProducts1);
  }
  getXProductsFromSecondCat(){
    this.moreProducts2 += 3
    this.hideMoreBtnIfAllProductsHaveBeenShown();
    this.getFirstFavCat(this.favCatName[1] ,this.moreProducts2);
  }


  getFirstFavCat(category, quantity){
    this.getCat.getProducts(category, quantity).subscribe(
      res =>this.forU1 = res
    );
  }
  getSecondFavCat(category, quantity){
    this.getCat.getProducts(category, quantity).subscribe(
      res => this.forU2 = res
    );
  }

  setCatImages(){
    const catId = this.checkFavCat.getFavCat();
    const firstId = parseInt(catId[0]);
    const secondId = parseInt(catId[1]);
    this.forU1Image = this.setImageFromID(firstId);
    this.forU2Image = this.setImageFromID(secondId);
  }
  setImageFromID(id:number):string{
    if(id === 1){
      return 'samochody.jpg'
    }
    else if(id === 2){
      return 'obuwie.jpg'
    }
    else if(id === 3){
      return 'agdrtv.jpg'
    }
    else if(id === 4){
      return 'zdrowie.jpg'
    }
  }

  getProductsNumber1(catId1, catId2){
    this.getCat.getProductsNumber(catId1).subscribe(
      res=> this.catNum1 = res
    )
    if(catId2 !== null){
      this.getCat.getProductsNumber(catId2).subscribe(
        res=> this.catNum2 = res
      )
    }
  }
  hideMoreBtnIfAllProductsHaveBeenShown(){
    if(this.moreProducts1 >= this.catNum1){
      this.moreBtn1$.next(false)
    }
    if(this.moreProducts2 >= this.catNum2){
      this.moreBtn2$.next(false)
    }
  }

}
