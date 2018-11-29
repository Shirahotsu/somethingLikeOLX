import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RegisterService } from '@services/register.service';
import {Router} from "@angular/router"
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
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  animations: [
    trigger(
      'passswordBar', [
        transition(':enter', [
          style({opacity: 0}),
          animate('600ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('600ms', style({ opacity: 0}))
        ])
      ]
    )
  ]
})
export class RegisterFormComponent implements OnInit {
  successReg:any;
  emailExist:boolean = false;
  registerForm = this.fb.group({
    firstName:  ['',Validators.required],
    lastName:   ['',Validators.required],
    password:   ['', [Validators.required, Validators.minLength(8)]],
    password2:  ['', [Validators.required, Validators.minLength(8)]],
    number:     ['', [Validators.required, Validators.minLength(9)]],
    email:      ['', [Validators.required]],
    over16:      ['', [Validators.required]],
    regulamin:      ['', [Validators.required]],
    newsletter:      [false],
  });
  public submitted:boolean = false;
  strength:number[] = [0,0,0,0];
  allStrength:number = 0;
  state1:string = 'inactive'
  state2:string = 'inactive'
  state3:string = 'inactive'
  state4:string = 'inactive'



  constructor(private fb: FormBuilder,
    private register:RegisterService,
    private router: Router,
    private logginSession: LogginSessionService,
    ) {
  }

  ngOnInit() {
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // TODO: Use EventEmitter with form value
    if (this.registerForm.invalid || this.registerForm.value.password !== this.registerForm.value.password2) {
      return;
  }
  else{
    this.sendRegisterRequest();
  }
  }
  sendRegisterRequest(){
    this.register.sendRegisterForm(this.registerForm.value).subscribe(
      res =>this.checkRegisterResponse(res)

    );
    // console.log(this.successReg);
  }
  checkRegisterResponse(e){
    if(e==='Zarejestrowano'){
      // this.logginSession.loggInUser();
      this.router.navigate(['/najnowsze']);
    }
    else if(e==="Podany email jest już zajęty"){
      this.emailExist = true;
    }
    else{
      console.log("NIE DZIAŁA");
    }
  }
  checkPasswordStrength(e){
    let val =  e.target.value;
    val = String(val);
    //If password contains both lower and uppercase characters, increase strength value.
    if (val.length > 8) {
      this.strength[3]= 1;
      if (val.match(/([A-Z])/)) {
          this.strength[0]= 1;
      }
      else this.strength[0]= 0;

      //If it has numbers and characters, increase this.strength value.
      if (val.match(/([0-9])/)) {
          this.strength[1]= 1;
      }
      else this.strength[1]= 0;

      //If it has one special character, increase this.strength value.
      if (val.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
          this.strength[2]= 1;
      }
      else this.strength[2]= 0;
  }
  else this.resetAllStrength();
  this.sumAllStrength();
  }

  resetAllStrength(){
    this.strength[0] = 0
    this.strength[1] = 0
    this.strength[2] = 0
    this.strength[3] = 0
    this.sumAllStrength();
  }
  sumAllStrength(){
    this.allStrength = this.strength[0] + this.strength[1] + this.strength[2] + this.strength[3];
  }

}
