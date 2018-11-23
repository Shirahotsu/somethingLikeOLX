import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from '@services/progress-bar.service'
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

@Component({
  selector: 'app-add-item-progress-bar',
  templateUrl: './add-item-progress-bar.component.html',
  styleUrls: ['./add-item-progress-bar.component.scss'],
  animations: [
    trigger("moveLine", [
      state(
        "inactive",
        style({
          top: '-100%'
        })
      ),
      state(
        "active",
        style({
          top: '0px'
        })
      ),
      transition("inactive => active", animate("300ms ease-in")),
      transition("active => inactive", animate("300ms ease-out"))
    ]),
  ]
})
export class AddItemProgressBarComponent implements OnInit {
  itemsChecked:number
  state1:string= 'inactive';
  state2:string= 'inactive';
  state3:string= 'inactive';
  state4:string= 'inactive';
  constructor(private progressBar: ProgressBarService) {
    this.progressBar.thingsDone.subscribe(
      res=> {
      this.itemsChecked = res
      this.checkState(res);

      }
    )
  }

  ngOnInit() {
  }
  checkState(e){
    if(e>=4){
      this.state4 = 'active';
    }
    else if(e>=3){
      this.state3 = 'active';
    }
    else if(e>=2){
      this.state2 = 'active';
    }
    else if(e>=1){
      this.state1 = 'active';
    }
    if(e<4){
      this.state4 = 'inactive';
    }
    if(e<3){
      this.state3 = 'inactive';
    }
    if(e<2){
      this.state2 = 'inactive';
    }
    if(e<1){
      this.state1 = 'inactive';
    }
  }
}
