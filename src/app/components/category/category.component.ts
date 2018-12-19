import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryProductsService } from '@services/category-products.service';
import { CategoryService } from '@services/category.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  shownItems:number = 3;
  nameCat: string;
  products: any;
  dummyData2:any;
  moreProducts: number = 0;
  catId: number;
  catNum: any;
  moreBtn$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  categoryImages: any[] = [
    {
      name: 'Samochody',
      image:'../../../assets/samochody.jpg'
    },
    {
      name: 'Obuwie',
      image:'../../../assets/obuwie.jpg'
    },
    {
      name: 'AGD/RTV',
      image:'../../../assets/agdrtv.jpg'
    },
    {
      name: 'Zdrowie',
      image:'../../../assets/zdrowie.jpg'
    }
  ];
  categoryImage:string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryProducts: CategoryProductsService,
    private cat: CategoryService
    ) {
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
      };
      this.moreProducts = 0;
      this.getParams();
  }

  ngOnInit() {



  }

  getParams(){
    this.route.params.subscribe(
      params => {
        this.nameCat = params['name'];
        this.getCatImage();
      }

    );

    this.cat.getCatIdFromName(this.nameCat).subscribe(
      res => this.catId = res,
      err =>console.log(err),
      ()=> {
        this.getProductsNumber();
        this.getData();
      }
    );
  }

  getData(){
    this.moreProducts += this.shownItems;
    this.hideMoreBtnIfAllProductsHaveBeenShown();
    console.log(this.moreProducts );
    console.log(this.catNum);

    this.categoryProducts.getProducts(this.catId, this.moreProducts).subscribe(
      res => this.products = res,
      err => console.log(err),
      ()=>{
        this.trimContent();
      }
    )
  }
  trimContent(){
    this.products.forEach(element => {
      if(element.description.length > 250){
        element.description = element.description.substring(0, 250)+'...';
      }
      element.created = element.created.substring(0, 10);

    });
  }

  getProductsNumber(){
    this.categoryProducts.getProductsNumber(this.catId).subscribe(
      res=> {
        this.catNum = res;
        console.log(res);

      }

    )
  }

  hideMoreBtnIfAllProductsHaveBeenShown(){
    if(this.moreProducts >= this.catNum){
      this.moreBtn$.next(false)
    }
  }

  getCatImage(){
    this.categoryImages.forEach(e => {
      if(e.name === this.nameCat){
        this.categoryImage = e.image
      }
    });
  }
}
