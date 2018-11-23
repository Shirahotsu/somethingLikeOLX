import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RegisterService } from '@services/register.service';
import {Router} from "@angular/router"
import { LogginSessionService } from '@services/loggin-session.service';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  successReg:any;
  emailExist:boolean = false;
  registerForm = this.fb.group({
    firstName:  ['',Validators.required],
    lastName:   ['',Validators.required],
    password:   [12345678, [Validators.required, Validators.minLength(8)]],
    password2:  [12345678, [Validators.required, Validators.minLength(8)]],
    number:     ['', [Validators.required, Validators.minLength(9)]],
    email:      ['', [Validators.required]],
    over16:      ['', [Validators.required]],
    regulamin:      ['', [Validators.required]],
    newsletter:      [false],
  });
  public submitted:boolean = false;
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
      this.router.navigate(['/najnowsze']);
      this.logginSession.loggInUser();
    }
    else if(e==="Podany email jest już zajęty"){
      this.emailExist = true;
    }
    else{
      console.log("NIE DZIAŁA");
    }
  }
  dummyFun(){
    this.logginSession.loggInUser();
  }
  dummyFun2(){
    this.logginSession.loggOutUser();
  }
  dummyFun3(){
    this.logginSession.checkExpDate();
  }
}
