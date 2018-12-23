import {
  Component,
  OnInit
} from '@angular/core';
import {
  UsersProductsService
} from '@services/users-products.service';

@Component({
  selector: 'app-users-items',
  templateUrl: './users-items.component.html',
  styleUrls: ['./users-items.component.scss']
})
export class UsersItemsComponent implements OnInit {
  items: any;
  constructor(
    private userProducts: UsersProductsService
  ) {}

  ngOnInit() {

  }
  getUsersProducts() {
    this.userProducts.getUsersProducts().subscribe(
      res => res.subscribe(
        res => this.items = res
      )
    );
  }

}
