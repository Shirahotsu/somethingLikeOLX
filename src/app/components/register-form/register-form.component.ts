import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {
  RegisterService
} from '@services/register.service';
import {
  Router
} from "@angular/router"
import {
  LogginSessionService
} from '@services/loggin-session.service';
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
import {
  InfoModalService
} from '@services/info-modal.service';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  animations: [
    trigger(
      'passswordBar', [
        transition(':enter', [
          style({
            opacity: 0
          }),
          animate('600ms', style({
            opacity: 1
          }))
        ]),
        transition(':leave', [
          style({
            opacity: 1
          }),
          animate('600ms', style({
            opacity: 0
          }))
        ])
      ]
    )
  ]
})
export class RegisterFormComponent implements OnInit {
  successReg: any;
  emailExist: boolean = false;
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password2: ['', [Validators.required, Validators.minLength(8)]],
    place: ['', Validators.required],
    zipCode: ['', Validators.required],
    number: ['', Validators.required],
    email: ['', [Validators.required]],
    over16: ['', [Validators.required]],
    regulamin: ['', [Validators.required]],
    newsletter: [false],
  });
  public submitted: boolean = false;
  strength: number[] = [0, 0, 0, 0];
  allStrength: number = 0;
  state1: string = 'inactive'
  state2: string = 'inactive'
  state3: string = 'inactive'
  state4: string = 'inactive'
  numberLen: boolean = false;



  constructor(private fb: FormBuilder,
    private register: RegisterService,
    private router: Router,
    private logginSession: LogginSessionService,
    private infoModal: InfoModalService
  ) {}

  ngOnInit() {}
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // TODO: Use EventEmitter with form value
    if (this.registerForm.invalid || this.registerForm.value.password !== this.registerForm.value.password2) {
      return;
    }
    const numerLen = this.f.number.value.toString().length;
    if (numerLen !== 9) {
      this.numberLen = true;
      return;
    } else {
      this.sendRegisterRequest();
    }
  }
  sendRegisterRequest() {
    this.register.sendRegisterForm(this.registerForm.value).subscribe(
      res => this.checkRegisterResponse(res),
      err => this.infoModal.setAndShowModal('Kurka wodna! Coś poszło nie tak, spróbuj ponownie póżniej')

    );
  }
  checkRegisterResponse(e) {
    if (e[0] === 'GIT') {
      this.logginSession.logInUserLocal(e[2]);
      this.router.navigate(['/najnowsze']);
    } else if (e[0] === "BLAD" && e[1] === "Podany email jest już zajęty") {
      this.emailExist = true;
    } else if (e[0] === "BLAD") {
      this.infoModal.setAndShowModal(e[1])
    } else this.infoModal.setAndShowModal('Kurka wodna! Coś poszło nie tak, spróbuj ponownie póżniej');
  }
  checkPasswordStrength(e) {
    let val = e.target.value;
    val = String(val);
    //If password contains both lower and uppercase characters, increase strength value.
    if (val.length > 7) {
      this.strength[3] = 1;
      if (val.match(/([A-Z])/)) {
        this.strength[0] = 1;
      } else this.strength[0] = 0;

      //If it has numbers and characters, increase this.strength value.
      if (val.match(/([0-9])/)) {
        this.strength[1] = 1;
      } else this.strength[1] = 0;

      //If it has one special character, increase this.strength value.
      if (val.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
        this.strength[2] = 1;
      } else this.strength[2] = 0;
    } else this.resetAllStrength();
    this.sumAllStrength();
  }

  resetAllStrength() {
    this.strength[0] = 0
    this.strength[1] = 0
    this.strength[2] = 0
    this.strength[3] = 0
    this.sumAllStrength();
  }
  sumAllStrength() {
    this.allStrength = this.strength[0] + this.strength[1] + this.strength[2] + this.strength[3];
  }

}
