import { Component, OnInit } from '@angular/core';
import {MenuItem} from '@models/menuItem.model';
import { CheckFavCatService } from '@services/check-fav-cat.service';
import { FormGroup, FormControl } from '@angular/forms';
import { LogginSessionService } from '@services/loggin-session.service';


import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  query,
  stagger
} from "@angular/animations";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
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
export class MenuComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl('')
  });
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  public menuItem: MenuItem[];
  public isMenuOpened: boolean;
  public menuState: string;
  public menuBtnsState: string;
  public wideBtns: boolean;
  public searchBtn2: boolean;
  public isMenuAnimationActive: boolean;
  public state: string;
  public isLogingIn:boolean;
  public model= "";
  public secondKey:number;
  isLogged:boolean;
  public  arrayOfStrings:string[] = [
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
  public howManyCat: number;
  public isThereFavCat: boolean;






  constructor(
    private checkFavCat:CheckFavCatService,
    private logginSession: LogginSessionService
    )
    {
    this.logginSession.isLoggedIn.subscribe(
      res=> {this.isLogged = res
      console.log(res)
      }
    )
    this.logginSession.setIsLoggedIn();
    this.state = 'inactive';
    this.searchBtn2 = false;
    this.wideBtns = false;
    this.menuBtnsState = 'inactive';
    this.menuState = 'inactive';
    this.isMenuOpened = false;
    this.isMenuAnimationActive = false;
    this.secondKey = 0;
    this.isLogingIn = false;
    this.menuItem = [
    {
      icon: 'anchor',
      link: '/link',
      visible: true,
      cat: 'obuwie'
    },
    {
      icon: 'battery',
      link: '/link',
      visible: true,
      cat: 'agd rtv'
    },
    {
      icon: 'bank',
      link: '/link',
      visible: true,
      cat: 'samochody'
    }
  ]
  }

  ngOnInit() {
    this.checkFavCatBtn();
    setInterval(()=> this.logginSession.checkIfCurrentLogged(), 1200000)
  }
  checkIfUserIsLogged(){
  }
  checkFavCatBtn(){
    this.howManyCat = this.checkFavCat.checkCookieData();
    if(this.howManyCat === 0){
      this.isThereFavCat = false;
    }
    else this.isThereFavCat = true;
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
  myCallback1(e){
    this.model = e;
  }
  getDataOnSecondChange(){
    this.secondKey++;
    if(this.secondKey === 2){
    }
  }
  showLoginForm(){
    this.isLogingIn = true
  }
  hideLoginForm (){
    this.isLogingIn = false

  }
  logoutUser(){
    this.logginSession.loggOutUser();
  }
}
