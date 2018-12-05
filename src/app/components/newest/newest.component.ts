import { Component, OnInit } from '@angular/core';
import { NewestProductsService } from '@services/newest-products.service';

@Component({
  selector: 'app-newest',
  templateUrl: './newest.component.html',
  styleUrls: ['./newest.component.scss']
})
export class NewestComponent implements OnInit {
  products:any;
  shownItems:number = 3;
  moreProducts: number = 0;

  constructor(
    private newestProducts: NewestProductsService
  ) {
    this.getNewestProducts();

  }

  ngOnInit() {
  }

  getNewestProducts(){
    this.moreProducts += this.shownItems;
    console.log(this.moreProducts)
    this.newestProducts.getProducts(this.moreProducts ).subscribe(
      res => this.products = res
    )
  }

}
