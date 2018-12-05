import { Component, OnInit } from '@angular/core';
import { ForU } from '@models/forYou.model';
import { CheckFavCatService } from '@services/check-fav-cat.service';
import { Router } from "@angular/router";
import { GetDataService } from '@services/get-data.service';
import { CategoryProductsService } from '@services/category-products.service';


@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.scss']
})
export class ForYouComponent implements OnInit {
  forU1: any;
  forU2: any;
  howManyCat: number;
  favCat: string[];
  favCatName:string[];
  constructor(
    private checkFavCat: CheckFavCatService,
    private router: Router,
    private jsonData: GetDataService,
    private getCat: CategoryProductsService
  ) {
    this.getFavCatFromCookie();
  }

  ngOnInit() {

  }

  getFavCatFromCookie(){
    this.favCatName= this.checkFavCat.getFavCat();
    this.checkHowManyFavCat();
    console.log(this.checkFavCat.getFavCat());

  }
  checkHowManyFavCat(){
    this.howManyCat = this.checkFavCat.checkCookieData();
    console.log(this.howManyCat);

    if(this.howManyCat === 0){
      this.router.navigate(['/najnowsze']);
    }
    else if(this.howManyCat === 1){
      this.getFirstFavCat(this.favCatName[0]);
      console.log('jedna kategoria');

    }
    else if(this.howManyCat === 2){
      this.getFirstFavCat(this.favCatName[0]);
      this.getSecondFavCat(this.favCatName[1]);
      console.log('dwie kategoria');
    }
    else{
      console.log(this.favCatName[0]);
      console.log(this.favCatName[1]);

    }
  }


  getFirstFavCat(e){
    this.getCat.getProducts(e, 3).subscribe(
      res => this.forU1 = res
    );
  }
  getSecondFavCat(e){
    this.getCat.getProducts(e, 3).subscribe(
      res => this.forU2 = res
    );
  }


}
