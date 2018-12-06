import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryProductsService } from '@services/category-products.service';
import { CategoryService } from '@services/category.service';
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
  catId:number

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
      this.dummyData2 = "../../assets/Baner - elektronika.jpg";

      this.getParams();
      // this.getData();

  }

  ngOnInit() {



  }

  getParams(){
    this.route.params.subscribe(
      params => this.nameCat = params['name']
    );
    this.cat.getCatIdFromName(this.nameCat).subscribe(
      res => this.catId = res,
      err =>console.log(err),
      ()=> {
        this.getData();
        this.getProductsNumber();
      }
    );
  }

  getData(){
    this.moreProducts += this.shownItems;
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
      res=>console.log(res)

    )
  }


}
