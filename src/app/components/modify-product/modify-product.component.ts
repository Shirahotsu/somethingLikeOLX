import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {
  ModifyProductService
} from '@services/modify-product.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  InfoModalService
} from '@services/info-modal.service';
import {
  AuthGuardService
} from '@services/auth-guard.service';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['../my-profile/my-profile.component.scss']
})
export class ModifyProductComponent implements OnInit {
  id: number;
  productForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private mdProduct: ModifyProductService,
    private router: Router,
    private infoModal: InfoModalService,
    private auth: AuthGuardService
  ) {
    this.auth.checkIfUserIfLoggedIn();
    this.getProductsIdFromLink();
    mdProduct.getProduct(this.id).subscribe(
      res => this.checkIfProductIsUers(res),
      err => this.ifError()
    );
  }

  ngOnInit() {}

  getProductsIdFromLink() {
    this.route.params.subscribe(
      params => this.id = +params['id']
    )
  }
  checkIfProductIsUers(e) {
    if (e[0] === 'BLAD') {
      this.infoModal.navigateUser('moje-produkty', 100)
    }
    if (e[0] === 'GIT') {
      this.infoModal.setAndShowModal('Pomyślnie zmieniono dane');
      this.infoModal.navigateUser('moje-produkty', 1000);
    } else {
      this.setFormValues(e)
    }
  }
  setFormValues(e) {
    this.productForm.patchValue({
      name: e.name
    });
    this.productForm.patchValue({
      price: e.price
    });
    this.productForm.patchValue({
      description: e.description
    });
  }
  ifError() {
    this.infoModal.showErrorModal();
    this.infoModal.navigateUser('moje-produkty', 3000);
  }

  onSubmit() {
    this.mdProduct.sendModifiedProduct(this.productForm.value, this.id).subscribe(
      res => this.checkIfProductIsUers(res),
      err => this.ifError()
    )
  }
}
