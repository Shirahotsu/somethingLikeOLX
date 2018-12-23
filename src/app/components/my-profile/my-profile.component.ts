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
  ActivatedRoute
} from '@angular/router';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    number: ['', [Validators.required, Validators.minLength(9)]],
    email: ['', [Validators.required]],
    passwordChck: ['', [Validators.required, Validators.minLength(8)]],
    city: [''],
    street: [''],
    houseNumber: [''],
    postAdress: [''],
  });
  profileForm2 = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    password2: ['', [Validators.required, Validators.minLength(8)]],
    password3: ['', [Validators.required, Validators.minLength(8)]],
  });
  public isProfil: boolean;
  public submitted: boolean = false;
  activeLink: boolean[] = [false, false, false];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.isProfil = true;
  }

  ngOnInit() {
    this.getRouterName();
  }
  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {

    this.submitted = true;
    if (this.profileForm.invalid || this.profileForm.value.password !== this.profileForm.value.password2) {
      return;
    } else {
      alert("kucze działa");
    }
  }
  toggleProfile() {
    this.isProfil = !this.isProfil;
  }
  activeBtn(e) {
    this.disableActiveLinks();
    this.activeLink[e] = true;
  }
  disableActiveLinks() {
    for (let i = 0; i < 3; i++) {
      this.activeLink[i] = false;
    }
  }
  getRouterName() {
    this.route.url.subscribe(
      res => this.checkRouterName(res[0].path)
    )
  }
  checkRouterName(e) {
    if (e === 'moje-produkty') {
      this.activeBtn(0);
    } else if (e === 'edytuj-profil') {
      this.activeBtn(1);
    } else if (e === 'prośby') {
      this.activeBtn(2);
    }

  }
}
