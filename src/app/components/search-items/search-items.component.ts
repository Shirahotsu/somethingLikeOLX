import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  SearchService
} from '@services/search.service';
import {
  Observable
} from 'rxjs';
import {
  share
} from 'rxjs/operators';

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.scss']
})
export class SearchItemsComponent implements OnInit {
  searchPhrase: string;
  products: Observable < {} > ;
  constructor(
    private route: ActivatedRoute,
    private search: SearchService
  ) {

  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.route.params.subscribe(
      params => {
        this.searchPhrase = params['name'];
        this.getProducts();
      }
    );
  }
  getProducts() {
    this.products = this.search.getProductsFromSearch(this.searchPhrase).pipe(share());
  }
}
