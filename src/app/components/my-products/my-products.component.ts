import {
  Component,
  OnInit
} from '@angular/core';
import {
  MyProductsService
} from '@services/my-products.service';
import {
  InfoModalService
} from '@services/info-modal.service';
import {
  AuthGuardService
} from '@services/auth-guard.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['../my-profile/my-profile.component.scss']
})
export class MyProductsComponent implements OnInit {
  products: any;
  myProductId: number;
  myProductName: string;
  constructor(
    private myProducts: MyProductsService,
    private infoModal: InfoModalService,
    private auth: AuthGuardService
  ) {
    this.getMyProducts();
    this.auth.checkIfUserIfLoggedIn();

  }

  ngOnInit() {}

  getMyProducts() {
    this.myProducts.getMyProducts().subscribe(
      res => this.products = res,
      err => this.infoModal.showErrorModal()
    );
  }

  deleteMyProduct() {
    this.myProducts.deleteMyProducts(this.myProductId).subscribe(
      res => this.checkIfDeleted(res),
      err => this.infoModal.showErrorModal(),
    );
  }
  checkIfDeleted(res) {
    if (res[0] === 'GIT') {
      this.getMyProducts();
    } else if (res[0] === 'BLAD') {
      this.infoModal.setAndShowModal(res[1]);
    }
  }
  setProductIdAndName(id: number, name: string) {
    this.myProductId = id;
    this.myProductName = name;
  }

}
