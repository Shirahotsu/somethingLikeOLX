import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProgressBarService } from '@services/progress-bar.service'


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  subbmited:boolean = false;
  choosenImg:boolean = false;
  isCatChoosen:boolean = false;
  url:any;
  isPrice:boolean = false;
  cantSendItem:boolean = true;
  fileError:boolean = false;
  addItemForm = this.fb.group({
    name:  ['',Validators.required],
    category:   ['Kategorie',Validators.required],
    description:   ['',Validators.required],
    price:   ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private progressBar: ProgressBarService
    ) {
      this.progressBar.thingsDone.subscribe(
        res=> {
          if(res>=5)  this.cantSendItem = false;
          else this.cantSendItem = true;
        }
      )
    }

  ngOnInit() {
  }
  get f() { return this.addItemForm.controls; }

  onSubmit(){

    this.subbmited= true;
    if (this.addItemForm.invalid || this.addItemForm.value.category === '') {
      return;
    }
  else{
    this.isCatChoosen = true;
  }
  }

  checkIfName(e){
    let val = e.target.value;
    if(val !== ''){
      this.progressBar.setThing(0,1);
    }
    else this.progressBar.setThing(0,0);
  }
  checkIfPrice(e){
    this.isPrice = true;
    let val = e.target.value;
    if(val !== ''){
      this.progressBar.setThing(1,1);
    }
    else this.progressBar.setThing(1,0);

  }

  checkIfDescription(e){
    let val = e.target.value;
    if(val !== ''){
      this.progressBar.setThing(2,1);
    }
    else this.progressBar.setThing(2,0);
  }


  checkChoosenCat(){
    if (this.addItemForm.value.category !== '') {
    this.progressBar.setThing(3,1);
    this.isCatChoosen = true;
    }
    else this.progressBar.setThing(3,0);
  }

  onSelectFile(event:any) {
    if(event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/png')
    {
      this.fileError = false;
      if (event.target.files && event.target.files[0]) {
        this.progressBar.setThing(4,1)
        this.choosenImg = true;
          var reader = new FileReader();

          reader.onload = (event:any) => {
              this.url = event.target.result;
          }

          reader.readAsDataURL(event.target.files[0]);
      }
      else this.progressBar.setThing(4,0);
    }
    else{
      this.fileError = true;
      return
    }
}

}
