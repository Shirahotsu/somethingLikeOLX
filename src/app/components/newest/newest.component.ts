import {
  Component,
  OnInit
} from '@angular/core';
import {
  NewestProductsService
} from '@services/newest-products.service';
import {
  BehaviorSubject
} from 'rxjs';

@Component({
  selector: 'app-newest',
  templateUrl: './newest.component.html',
  styleUrls: ['./newest.component.scss']
})
export class NewestComponent implements OnInit {
  products: any;
  shownItems: number = 3;
  moreProducts: number = 0;
  productNum: any;
  moreBtn$: BehaviorSubject < boolean > = new BehaviorSubject < boolean > (true);
  constructor(
    private newestProducts: NewestProductsService
  ) {
    this.getNewestProducts();
    this.getProductsNumber();

  }

  ngOnInit() {

  }

  getNewestProducts() {
    this.moreProducts += this.shownItems;
    this.hideMoreBtnIfAllProductsHaveBeenShown();
    this.newestProducts.getProducts(this.moreProducts).subscribe(
      res => {
        this.products = res;

      },
      err => '',
      () => this.trimContent()
    )
  }
  getProductsNumber() {
    this.newestProducts.getProductsNumber().subscribe(
      res => {
        this.productNum = res;
      }
    )
  }
  hideMoreBtnIfAllProductsHaveBeenShown() {
    if (this.moreProducts >= this.productNum) {
      this.moreBtn$.next(false)
    }
  }

  trimContent() {
    this.products.forEach(element => {
      if (element.description.length > 250) {
        element.description = element.description.substring(0, 250) + '...';
      }
      element.created = element.created.substring(0, 10);

    });
  }

}
