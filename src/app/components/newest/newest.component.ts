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
  txt:string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur aperiam temporibus eveniet nihil magni? Tempore veritatis laborum qui quos esse debitis facere, doloribus, reiciendis distinctio reprehenderit, odit voluptas deserunt ea!Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur aperiam temporibus eveniet nihil magni? Tempore veritatis laborum qui quos esse debitis ';
  constructor(
    private newestProducts: NewestProductsService
  ) {
    this.getNewestProducts();

  }

  ngOnInit() {
    console.log(this.txt.length);

  }

  getNewestProducts(){
    this.moreProducts += this.shownItems;
    console.log(this.moreProducts)
    this.newestProducts.getProducts(this.moreProducts ).subscribe(
      res => {
        this.products = res;

      },
      err=> console.log(err),
      ()=> this.trimContent()


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

}
