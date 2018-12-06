import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

@Component({
  selector: 'app-autocomplate',
  templateUrl: './autocomplate.component.html',
  styleUrls: ['./autocomplate.component.scss'],
  animations: [
    trigger("searchPanel", [
      state(
        "inactive",
        style({
          width: '60px',
          borderRadius: '50%'
        })
      ),
      state(
        "active",
        style({
          width: '500px',
          borderRadius: '100px'
        })
      ),
      transition("inactive => active", animate("100ms ease-in")),
      transition("active => inactive", animate("100ms ease-out"))
    ]),
  ]
})
export class AutocomplateComponent implements OnInit {
  wideBtns: boolean = false;
  searchBtn2: boolean = false;
  state:string= 'inactive';
  searchForm = new FormGroup({
    search: new FormControl('')
  });
  arrayOfStrings:string[] = [
    "this",
    "is",
    "array",
    "array2",
    "array3",
    "array4",
    "array5",
    "of",
    "text",
    "with",
    "long",
    "and long",
    "and long",
    "list"
  ];
  secondKey:number = 0;

  constructor(
  ) { }

  ngOnInit() {
  }

  changState(){
    this.state = "active";
    this.searchBtn2 = true;
    setTimeout(()=>{
      this.wideBtns = true;
    }, 100)
  }
  onClickedOutside(){
    this.wideBtns = false;
    setTimeout(()=>{
      this.state = "inactive";
    }, 100)
  }
  getDataOnSecondChange(){
    this.secondKey++;
    if(this.secondKey === 2){
    }
  }
}
