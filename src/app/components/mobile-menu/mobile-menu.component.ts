import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl('')
  });
  arrayOfStrings:string[] = [
    "this",
    "is",
    "array",
    "of",
    "text",
    "with",
    "long",
    "and long",
    "and long",
    "list"
  ];
  secondKey:number = 0;
  constructor() { }

  ngOnInit() {
  }
  getDataOnSecondChange(){
    this.secondKey++;
    if(this.secondKey === 2){
    }
  }
}
