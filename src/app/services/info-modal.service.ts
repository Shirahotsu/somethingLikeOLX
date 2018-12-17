import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InfoModalService {

  infoMessage:BehaviorSubject<string> = new BehaviorSubject<string>('');
  modalStatus:BehaviorSubject<string> = new BehaviorSubject<string>('inactive');
  constructor(private router: Router) { }

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

  showErrorModal(){
    this.setInfoMessage('Kurka wodna! Coś poszło nie tak, spróbuj ponownie póżniej');
    this.showModal();
  }
  hideModal(){
    this.modalStatus.next('inactive');
    this.infoMessage
  }
  navigateUser(where:string, deley:number){
    setTimeout(
      ()=>{
        this.router.navigate([`/${where}`]);
      },deley
    )
  }
}
