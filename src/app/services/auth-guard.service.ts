import { Injectable } from '@angular/core';
import { JwtTokenService } from './jwt-token.service';
import { InfoModalService } from './info-modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private jwt: JwtTokenService,
    private infoModal: InfoModalService
  ) { }
  checkIfUserIfLoggedIn(){
    if(!this.jwt.isLoggedIn()){
      this.infoModal.setAndShowModal('Aby skożystać z tej funkcji musisz być zalogowany');
      this.infoModal.navigateUser('/rejestracja', 1);
    }
  }
}
