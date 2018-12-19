import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '@services/get-data.service';
import { SingleProductService } from '@services/single-product.service';
import { InfoModalService } from '@services/info-modal.service';
import { RecemoendedCategoriesService } from '@services/recemoended-categories.service';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss'],
})
export class SingleItemComponent{
  sub: any;
  id:number;
  singleProduct:Observable<{}>;
  catId:number = 0;
  recomendedProducts:Observable<{}>;
  constructor(
    private route: ActivatedRoute,
    private json:GetDataService,
    private product: SingleProductService,
    private modal: InfoModalService,
    private recCat: RecemoendedCategoriesService
  ) {
    this.getParamsFromLink();
  }

  getParamsFromLink(){
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getProduct();
    });
  }

  getProduct(){
    this.singleProduct = this.product.getSingleProduct(this.id).pipe(share());
    this.singleProduct.subscribe(
        res => this.checkRes(res),
        err => {
          this.modal.showErrorModal();
          this.modal.navigateUser('najnowsze', 200)
        }
    );
  }
  checkRes(res){
    this.catId = res.categoryId;
    if(res===null){
      this.modal.setAndShowModal('Dany produkt nie istnieje');
      this.modal.navigateUser('najnowsze', 200)
    }
    else if(res[0]==='BLAD'){
      this.modal.showErrorModal();
      this.modal.navigateUser('najnowsze', 200)
    }
    this.getRecomendedCategories();

  }

  getRecomendedCategories(){
    this.recomendedProducts =  this.recCat.getRecomendedCategories(this.catId,this.id).pipe(share());
    this.recomendedProducts.subscribe(
      res => '',
      err => {
        this.modal.showErrorModal();
        this.modal.navigateUser('najnowsze', 200)
      }
  );
  }

}
