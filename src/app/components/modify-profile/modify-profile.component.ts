import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['../my-profile/my-profile.component.scss']
})
export class ModifyProfileComponent implements OnInit {
  profileForm = this.fb.group({
    firstName:  ['',Validators.required],
    lastName:   ['',Validators.required],
    number:     ['', [Validators.required, Validators.minLength(9)]],
    email:      ['', [Validators.required]],
    passwordChck:   ['', [Validators.required, Validators.minLength(8)]],
    city:       [''],
    postAdress: [''],
  });
  profileForm2 = this.fb.group({
    password:   ['', [Validators.required, Validators.minLength(8)]],
    password2:  ['', [Validators.required, Validators.minLength(8)]],
    password3:  ['', [Validators.required, Validators.minLength(8)]],
  });
  public isProfil:boolean;
  public submitted:boolean = false;
  constructor(private fb: FormBuilder) {
    this.isProfil = true;
  }

  ngOnInit() {
  }
  get f() { return this.profileForm.controls; }

  onSubmit() {
    console.log(this.profileForm.value);

    this.submitted = true;
    // TODO: Use EventEmitter with form value
    if (this.profileForm.invalid || this.profileForm.value.password !== this.profileForm.value.password2) {
      return;
  }
  else{
    alert("kucze działa");
    console.log(this.profileForm.value);
  }
  }
  toggleProfile(){
    this.isProfil = !this.isProfil;
  }

}
