import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { SearchService } from '@services/search.service';
import { Router } from '@angular/router';

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
  @ViewChildren('searchInput')searchInp : QueryList<any>;
  wideBtns: boolean = false;
  hints: boolean = false;
  canUseCursor: boolean = true
  canStartAnimation: boolean = true;
  searchBtn2: boolean = false;
  state:string= 'inactive';
  searchForm = new FormGroup({
    search: new FormControl('')
  });
  arrayOfStrings:any;

  constructor
  (
    private search: SearchService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  changState(){
    this.state = "active";
    this.searchBtn2 = true;
    if(this.canStartAnimation === true){
      setTimeout(()=>{
        this.wideBtns = true;
      }, 100)
    }
    this.canStartAnimation= true;
  }

  hideSearchBar(){
    this.wideBtns = false;
    setTimeout(()=>{
      this.state = "inactive";
    }, 100)
  }

  getDataOnSecondChange(event){
    let val = event.target.value;
    if(val.length > 2){
      this.hints = true;
      this.search.getSearchResult(val).subscribe(
        res => this.checkDataRes(res),
        err => this.arrayOfStrings = ['Podaj prawidłową nazwę produktu']
      );
    }
    else {
      this.arrayOfStrings = null;
      this.hints = false;
    }
  }

  setHintValue(hint:string){
    this.canStartAnimation = false;
    this.cantUseCursor();
    this.router.navigate(['/wyszukaj/'+hint]);
  }

  checkDataRes(res){
    if(res.length === 0){
      this.arrayOfStrings = ['Brak wyników'];
    }
    else this.arrayOfStrings = res
  }
  cantUseCursor(){
    this.canUseCursor= false
  }
  setCursorOnInputField(){
    if(this.canUseCursor === true){
      setTimeout(()=>{
        console.log('xDDDDD');
        this.searchInp.first.nativeElement.focus();
      },200);
    }
    this.canUseCursor= true;
  }

}
