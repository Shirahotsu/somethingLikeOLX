import { Component, OnInit } from '@angular/core';
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
import { InfoModalService } from '@services/info-modal.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
  animations: [
    trigger("infoModal", [
      state(
        "inactive",
        style({
          visibility: 'hidden',
          transform: 'translateY(-100%)',
          opacity:'0'
        })
      ),
      state(
        "active",
        style({
          visibility: 'visible',
          transform: 'translateY(0px)',
          opacity:'1'

        })
      ),
      transition("inactive => active", animate("600ms", keyframes([
        style({
          visibility: 'hidden',
          transform: 'translateY(-100%)',
          opacity:'0',
          offset: 0
        }),
        style({
          visibility: 'visible',
          transform: 'translateY(-10%)',
          offset: 0.3
        }),
        style({
          transform: 'translateY(0%)',
          opacity:'1',
          offset: 1
         })
      ]))),
      transition("active => inactive", animate("600ms",keyframes([
        style({
          visibility: 'visible',
          transform: 'translateY(0%)',
          opacity:'1',
          offset: 0
        }),
        style({
          transform: 'translateY(-10%)',
          opacity:'0',
          offset: 0.7
         }),
        style({
          visibility: 'hidden',
          transform: 'translateY(-100%)',
          offset: 1
         })
      ])))
    ]),
  ]
})
export class InfoModalComponent implements OnInit {
  modalState:string;
  modalMessage:string = ' ';
  constructor(private modal:InfoModalService) {

  }

  ngOnInit() {
    this.modal.modalStatus.subscribe(
      res=> {
        this.modalState = res;
        console.log(this.modalState)
      }
    )
    this.modal.infoMessage.subscribe(
      res=> this.modalMessage = res
    )
  }
  closeModal(){
      this.modal.hideModal();
  }
}
