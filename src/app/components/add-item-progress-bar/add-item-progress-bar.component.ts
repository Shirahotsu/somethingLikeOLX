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
    trigger("checkCircle", [
      state(
        "inactive",
        style({
          border: '5px solid white',
          backgroundColor: 'transparent',
          transition: '0.5s ease-in-out'
        })
      ),
      state(
        "active",
        style({
          backgroundColor: '#28afb0'
        })
      ),
      transition("inactive => active", animate("200ms ease-in")),
      transition("active => inactive", animate("200ms ease-out"))
    ]),
  ]
})
export class AddItemProgressBarComponent implements OnInit {
  itemsChecked:number
  state1:string;
  state2:string;
  state3:string;
  state4:string;
  state5:string;
  constructor(private progressBar: ProgressBarService) {

    this.progressBar.thingsDone.subscribe(
      res=> {
      this.itemsChecked = res
      this.checkState(this.itemsChecked);
      }
    )
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.resetAllAnimation();
  }
  checkState(e){
    if(e>=5){
      this.state5 = 'active';
    }
    else if(e>=4){
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
    if(e<5){
      this.state5 = 'inactive';
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
  resetAllAnimation(){
    this.state5 = 'inactive';
    this.state4 = 'inactive';
    this.state3 = 'inactive';
    this.state2 = 'inactive';
    this.state1 = 'inactive';
    this.progressBar.resetAllThings();
    this.itemsChecked = 0;
    this.progressBar.setThing(0,0);
  }
}
