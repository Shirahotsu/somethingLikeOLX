import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthGuardService
} from '@services/auth-guard.service';
import {
  NumberRequestService
} from '@services/number-request.service';
import {
  share
} from 'rxjs/operators';
import {
  Observable
} from 'rxjs';
import {
  InfoModalService
} from '@services/info-modal.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['../my-profile/my-profile.component.scss']
})
export class NotificationsComponent implements OnInit {
  numberRequests: Observable < {} > ;

  constructor(
    private auth: AuthGuardService,
    private numReq: NumberRequestService,
    private infoModal: InfoModalService
  ) {
    this.auth.checkIfUserIfLoggedIn();
    this.getNumerRequests();
  }

  ngOnInit() {}
  getNumerRequests() {
    this.numberRequests = this.numReq.getNumbersRequests().pipe(share());
    this.numReq.getNumbersRequests().subscribe(
      res => ''

    );
  }
  acceptRequest(userId: number) {

    this.numReq.acceptNumberRequest(userId).subscribe(
      res => this.checkRes(res)
    )
  }
  checkRes(res) {
    if (res[0] === 'GIT') {
      this.infoModal.setAndShowModal('Udzielono pozwolenia na pokazanie numeru');
      this.getNumerRequests();
    } else if (res[0] === 'BLAD') {
      this.infoModal.setAndShowModal(res[1]);
    } else {
      this.infoModal.showErrorModal();
    }
  }
}
