import { Component, OnInit } from '@angular/core';
import { MyProductsService } from '@services/my-products.service';
import { InfoModalService } from '@services/info-modal.service';
import { NumberValueAccessor } from '@angular/forms/src/directives';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['../my-profile/my-profile.component.scss']
})
export class MyProductsComponent implements OnInit {
  products:any;
  myProductId:number;
  myProductName:string;
  constructor(
    private myProducts:MyProductsService,
    private infoModal: InfoModalService
  ) {
    this.getMyProducts();

  }

  ngOnInit() {
  }

  getMyProducts(){
    this.myProducts.getMyProducts().subscribe(
      res=> this.products = res,
      err=> this.infoModal.showErrorModal(),
      ()=> console.log(this.products)
    );
  }

  deleteMyProduct(){
    this.myProducts.deleteMyProducts(this.myProductId).subscribe(
      res => this.checkIfDeleted(res),
      err => this.infoModal.showErrorModal(),
    );
  }
  checkIfDeleted(res){
    if(res[0] === 'GIT'){
      this.getMyProducts();
    }
    else if(res[0] === 'BLAD'){
      this.infoModal.setAndShowModal(res[1]);
    }
  }
  setProductIdAndName(id:number, name:string){
    this.myProductId = id;
    this.myProductName = name;
    console.log(this.myProductId);
    console.log(this.myProductName);

  }

}
