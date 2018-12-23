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

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../my-profile/my-profile.component.scss']
})

export class ChangePasswordComponent implements OnInit {
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    number: ['', [Validators.required, Validators.minLength(9)]],
    email: ['', [Validators.required]],
    passwordChck: ['', [Validators.required, Validators.minLength(8)]],
    city: [''],
    postAdress: [''],
  });
  profileForm2 = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    password2: ['', [Validators.required, Validators.minLength(8)]],
    password3: ['', [Validators.required, Validators.minLength(8)]],
  });
  public isProfil: boolean;
  public submitted: boolean = false;
  constructor(private fb: FormBuilder) {
    this.isProfil = true;
  }


  ngOnInit() {}
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

}
