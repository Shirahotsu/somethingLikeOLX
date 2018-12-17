import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.scss']
})
export class SearchItemsComponent implements OnInit {
  searchPhrase:string;
  constructor(
    private route:ActivatedRoute
  ) {

   }

  ngOnInit() {
  }

  getParams(){
    this.route.params.subscribe(
      params => this.searchPhrase = params['name']
    )
  }
}
