import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  constructor() { }

  thingsDone:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  thingsArray:number[] = [0,0,0,0,0];

  setThing(e, f){
    this.thingsArray[e] = f;
    this.sumAllThings();
  }
  resetAllThings(){
    for(let i = 0; i<5; i++){
      this.thingsArray[i] = 0;
    }
    this.sumAllThings;
  }

  sumAllThings(){
    let allThings:number = this.thingsArray.reduce((a, b) => a + b, 0);
    this.thingsDone.next(allThings);
  }
}
