import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  GetDataService
} from '@services/get-data.service';
import {
  SingleProductService
} from '@services/single-product.service';
import {
  InfoModalService
} from '@services/info-modal.service';
import {
  RecemoendedCategoriesService
} from '@services/recemoended-categories.service';
import {
  Observable
} from 'rxjs';
import {
  share
} from 'rxjs/operators';
import {
  NumberRequestService
} from '@services/number-request.service';
import {
  UsersProductsService
} from '@services/users-products.service';
import {
  LogginSessionService
} from '@services/loggin-session.service';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss'],
})
export class SingleItemComponent {
  sub: any;
  id: number;
  singleProduct: Observable < {} > ;
  catId: number = 0;
  recomendedProducts: Observable < {} > ;
  userId: number;
  canSeeNumber: boolean = false;
  userNumber: number;
  constructor(
    private route: ActivatedRoute,
    private json: GetDataService,
    private product: SingleProductService,
    private modal: InfoModalService,
    private recCat: RecemoendedCategoriesService,
    private numReq: NumberRequestService,
    private userProducts: UsersProductsService,
    private logininSession: LogginSessionService
  ) {
    this.getParamsFromLink();
  }

  sendNumberRequestIfLoggedIn() {
    this.logininSession.isLoggedIn.subscribe(
      res => {
        if (res === true) {
          this.sendNumberRequest();
        } else {
          this.modal.setAndShowModal('Musisz być zalogowany, by skorzystać z tej funkcji')
        }
      }

    );
  }

  checkIfCanSeeNumber() {
    this.numReq.isRequestAccepted(this.id).subscribe(
      res => {
        if (res === true) {
          this.canSeeNumber = true;
        }
      }
    );
  }

  getParamsFromLink() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getProduct();
    });
  }

  getProduct() {
    this.singleProduct = this.product.getSingleProduct(this.id).pipe(share());
    this.singleProduct.subscribe(
      res => {
        this.checkRes(res);
      },
      err => {
        this.modal.showErrorModal();
        this.modal.navigateUser('najnowsze', 200)
      }
    );
  }
  setUserId(userId) {
    this.userProducts.setUserId(userId)
  }
  checkRes(res) {

    this.catId = res.categoryId;
    this.userId = res.owner.id
    this.userNumber = res.owner.phoneNumber

    if (res === null) {
      this.modal.setAndShowModal('Dany produkt nie istnieje');
      this.modal.navigateUser('najnowsze', 200)
    } else if (res[0] === 'BLAD') {
      this.modal.showErrorModal();
      this.modal.navigateUser('najnowsze', 200)
    } else {
      this.getRecomendedCategories();
      this.setUserId(this.userId);
      this.checkIfCanSeeNumber();
    }


  }

  getRecomendedCategories() {
    this.recomendedProducts = this.recCat.getRecomendedCategories(this.catId, this.id).pipe(share());
    this.recomendedProducts.subscribe(
      res => '',
      err => {
        this.modal.showErrorModal();
        this.modal.navigateUser('najnowsze', 200)
      }
    );
  }

  sendNumberRequest() {
    this.numReq.sendRequestForANumber(this.userId).subscribe(
      res => this.checkNumberRes(res)

    )
  }
  checkNumberRes(res) {
    if (res[0] === 'GIT') {
      this.modal.setAndShowModal('Wysłano prośbę o kontakt');
    } else if (res[0] === 'BLAD') {
      this.modal.setAndShowModal(res[1]);
    } else {
      this.modal.showErrorModal();
    }
  }
}
