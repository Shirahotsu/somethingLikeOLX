import { Component, OnInit } from '@angular/core';
import {MenuItem} from '@models/menuItem.model';
import { CheckFavCatService } from '@services/check-fav-cat.service';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';
import { LogginSessionService } from '@services/loggin-session.service';
import { InfoModalService } from '@services/info-modal.service';
import { CategoryService } from '@services/category.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl('')
  });
  loginForm = this.fb.group({
    password:   ['', Validators.required],
    email:      ['', Validators.required],
  });

  menuItem: any;
  isMenuOpened: boolean;
  menuState: string;
  menuBtnsState: string;
  wideBtns: boolean;
  searchBtn2: boolean;
  isMenuAnimationActive: boolean;
  state: string;
  isLogingIn:boolean;
  isMLogingIn:boolean = false;
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
    private infoModal:InfoModalService,
    private cat: CategoryService
    )
    {
    this.logginSession.isLoggedIn.subscribe(
      res=> {this.isLogged = res
      console.log(res)
      }
    )
    this.getAllCategories();
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
  //   this.menuItem = [
  //   {
  //     icon: 'anchor',
  //     link: '/link',
  //     visible: true,
  //     cat: 'AGD_RTV'
  //   },
  //   {
  //     icon: 'battery',
  //     link: '/link',
  //     visible: true,
  //     cat: 'Obuwie'
  //   },
  //   {
  //     icon: 'bank',
  //     link: '/link',
  //     visible: true,
  //     cat: 'Samochody'
  //   },
  //   {
  //     icon: 'battery',
  //     link: '/link',
  //     visible: true,
  //     cat: 'Zdrowie'
  //   }
  // ]
  }

  ngOnInit() {
    this.checkFavCatBtn();
    setInterval(()=> this.logginSession.checkIfCurrentLogged(), 1200000);

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

  myCallback1(e){
    this.model = e;
  }

  toggleLoginForm(){
    this.isLogingIn = !this.isLogingIn;
  }
  toggleMobileLoginForm(){
    this.isMLogingIn = !this.isMLogingIn;
  }
  hideLoginForm(){
    this.isLogingIn = false
  }
  hideMobileLoginForm(){
    this.isMLogingIn = false
  }
  logoutUser(){
    this.logginSession.loggOutUser();
  }
  onSubmit(){
    if(this.checkIfLoginNotEmpty()){
      this.logginSession.sendloginReq(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        res=>this.checkIfErrorInResponse(res),
        error => this.infoModal.setAndShowModal('Kurka wodna! Coś poszło nie tak, spróbuj ponownie póżniej')
        );
      console.log('submit')
    }
    else{
      this.submitted = true;
      this.pleaseComplateAllFieldsMessage('Wypełnij wszystkie pola');
      return false;
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
      this.hideMobileLoginForm();
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

  getAllCategories(){
    this.cat.getAllCategories().subscribe(
      res=> {
        this.menuItem = res;
        console.log(this.menuItem);

      }
    );
  }


}
