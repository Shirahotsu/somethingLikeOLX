import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoModalService {

  infoMessage:BehaviorSubject<string> = new BehaviorSubject<string>('');
  modalStatus:BehaviorSubject<string> = new BehaviorSubject<string>('inactive');
  constructor() { }

  setInfoMessage(e){
    this.infoMessage.next(e);
  }
  showModal(){
    this.modalStatus.next('active');
  }
  setAndShowModal(e){
    this.setInfoMessage(e);
    this.showModal();
  }
  hideModal(){
    this.modalStatus.next('inactive');
    this.infoMessage
  }
}
