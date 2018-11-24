import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['../my-profile/my-profile.component.scss']
})
export class MyProductsComponent implements OnInit {
  products:any[];
  constructor() {
    this.products = [
      'super fajowe buciki',
      'całkiem dobra matka pijaczka',
      'dotknięcie siusiaczkiem',
      'jakieś guwno z bazaru',
      'majtasy mojej dziewczyny',
      'witaminy dla chłopczyka i dziewczyny',
      'śmiejżeliki',
      'jakies tam fajowe zabawki',
      'radio samochodowe bluconnect',
      'ćwiczenia z angilskiego',
      'mundur psa policyjnego',
      'super duper mega extra dynks'
    ]
  }

  ngOnInit() {
  }

}
