import { Component, OnInit } from '@angular/core';
import { ForU } from '@models/forYou.model';
import { CheckFavCatService } from '@services/check-fav-cat.service';
import { Router } from "@angular/router";
import { GetDataService } from '@services/get-data.service';


@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.scss']
})
export class ForYouComponent implements OnInit {
  public forU: any[];
  public howManyCat: number;
  public favCat: string[];
  public favCatName:string[];
  constructor(
    private checkFavCat: CheckFavCatService,
    private router: Router,
    private jsonData: GetDataService,
  ) {
  }

  ngOnInit() {
    this.howManyCat = this.checkFavCat.checkCookieData();
    if(this.howManyCat === 0){
      this.router.navigate(['/najnowsze']);
    }
    this.favCatName= this.checkFavCat.getFavCat();
    console.log(this.checkFavCat.getFavCat());


    this.jsonData.getLocalData().subscribe(data => {
      this.forU = data;
      // this.forU  = data.filter(item => {
      //   return item.cat === ;
      // });
    })
  }

}
