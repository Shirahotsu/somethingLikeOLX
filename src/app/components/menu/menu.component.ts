import { Component, OnInit } from '@angular/core';
import {MenuItem} from '@models/menuItem.model';
import { CheckFavCatService } from '@services/check-fav-cat.service';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';
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
import { InfoModalComponent } from '@components/info-modal/info-modal.component';
import { InfoModalService } from '@services/info-modal.service';

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
  loginForm = this.fb.group({
    password:   ['', Validators.required],
    email:      ['', Validators.required],
  });

  menuItem: MenuItem[];
  isMenuOpened: boolean;
  menuState: string;
  menuBtnsState: string;
  wideBtns: boolean;
  searchBtn2: boolean;
  isMenuAnimationActive: boolean;
  state: string;
  isLogingIn:boolean;
  model= "";
  secondKey:number;
  d:boolean;
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
  howManyCat: number;
  isThereFavCat: boolean;
  isPassword:boolean = false;
  isEmail:boolean = false;
  isLogged;
  submitted:boolean = false;
  loginMessage:string = ' ';






  constructor(
    private fb: FormBuilder,
    private checkFavCat:CheckFavCatService,
    private logginSession: LogginSessionService,
    private infoModal:InfoModalService
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
  toggleLoginForm(){
    this.isLogingIn = !this.isLogingIn
  }
  hideLoginForm(){
    this.isLogingIn = false

  }
  // test
  getData(){
    this.logginSession.getAllCat();
  }
  logoutUser(){
    this.logginSession.loggOutUser();
  }
  onSubmit(){
    if(this.checkIfLoginNotEmpty()){
      this.logginSession.sendloginReq(this.loginForm.value.email, this.loginForm.value.password).subscribe(res=>this.checkIfErrorInResponse(res));
      console.log('submit')
    }
    else{
      this.submitted = true;
      this.pleaseComplateAllFieldsMessage('Wypełnij wszystkie pola')
    }
  }
  checkIfErrorInResponse(e){
    if(e[0] == "Podaj prawidłowy email lub hasło"){
      this.pleaseComplateAllFieldsMessage('Podaj prawidłowy Email lub hasło');
    }
    else if(e[0] == 'GIT'){
      console.log('eh');
      this.logginSession.logInUserLocal(e[1]);
      this.hideLoginForm();
    }
    else{
      this.infoModal.setAndShowModal('Kurka wodna! Coś poszło nie tak, spróbuj ponownie póżniej')
    }
  }
  pleaseComplateAllFieldsMessage(e){
    this.loginMessage = e;
  }
  checkEmail(e){
    let val = e.target.value;
    if(val !== ''){
      this.isEmail = true;
    }
    else this.isEmail = false;
  }
  checkPassword(e){
    let val = e.target.value;
    if(val !== ''){
      this.isPassword = true;
    }
    else this.isPassword = false;
  }
  checkIfLoginNotEmpty():boolean{
    if(this.isEmail && this.isPassword){
      return true;
    }
    else false;
  }
}
