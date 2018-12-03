import { Component, OnInit } from '@angular/core';
import { MyProductsService } from '@services/my-products.service';
import { InfoModalService } from '@services/info-modal.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['../my-profile/my-profile.component.scss']
})
export class MyProductsComponent implements OnInit {
  products:any;
  constructor(
    private myProducts:MyProductsService,
    private infoModal: InfoModalService
  ) {

    myProducts.getMyProducts().subscribe(
      res=> this.products = res,
      err=> infoModal.setAndShowModal('Kurka wodna! Coś poszło nie tak, spróbuj ponownie póżniej'),
      ()=> console.log(this.products)
    );
  }

  ngOnInit() {
  }

}
