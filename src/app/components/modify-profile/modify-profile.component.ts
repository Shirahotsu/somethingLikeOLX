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
  AuthGuardService
} from '@services/auth-guard.service';
import {
  ModifyProfileService
} from '@services/modify-profile.service';
import {
  LogginSessionService
} from '@services/loggin-session.service';
import {
  InfoModalService
} from '@services/info-modal.service';
@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['../my-profile/my-profile.component.scss']
})
export class ModifyProfileComponent implements OnInit {
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    place: ['', Validators.required],
    postAdress: ['', Validators.required],
    number: ['', Validators.required],
  });
  isProfil: boolean;
  submitted: boolean = false;
  numberLen: boolean = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthGuardService,
    private modify: ModifyProfileService,
    private logginSession: LogginSessionService,
    private infoModal: InfoModalService
  ) {
    this.isProfil = true;
    this.auth.checkIfUserIfLoggedIn();
    this.getUserDetails();
  }

  ngOnInit() {}
  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    const numerLen = this.f.number.value.toString().length;

    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    if (numerLen !== 9) {
      this.numberLen = true;
      return;
    } else {
      this.modify.sendProfileDetails(this.profileForm.value).subscribe(
        res => this.checkModRes(res),
        err => {
          this.infoModal.showErrorModal();
          this.infoModal.navigateUser('najnowsze', 200);
        }
      )
    }
  }
  checkModRes(e) {
    if (e[0] === 'GIT') {
      this.logginSession.logInUserLocal(e[2]);
      this.infoModal.setAndShowModal('Profil został pomyślnie zmodyfikowany');
      this.infoModal.navigateUser('najnowsze', 200);
    } else if (e[0] === "BLAD") {
      this.infoModal.setAndShowModal(e[1]);
      this.infoModal.navigateUser('najnowsze', 200);
    } else {
      this.infoModal.showErrorModal();
      this.infoModal.navigateUser('najnowsze', 200);
    }
  }
  toggleProfile() {
    this.isProfil = !this.isProfil;
  }
  getUserDetails() {
    this.modify.getProfileDetails().subscribe(
      res => this.setFormValues(res)

    );
  }
  setFormValues(e) {
    this.profileForm.patchValue({
      firstName: e.firstName
    });
    this.profileForm.patchValue({
      lastName: e.lastName
    });
    this.profileForm.patchValue({
      email: e.email
    });
    this.profileForm.patchValue({
      place: e.place
    });
    this.profileForm.patchValue({
      postAdress: e.zipCode
    });
    this.profileForm.patchValue({
      number: e.phoneNumber
    });
  }
}
