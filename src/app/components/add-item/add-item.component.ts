import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProgressBarService } from '@services/progress-bar.service'
import { AddItemInfoService } from '@services/add-item-info.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router"
import { InfoModalService } from '@services/info-modal.service';
import { AuthGuardService } from '@services/auth-guard.service';

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
  formData:FormData = new FormData();
  imageFile: File;
  priceIsGraterThanZero: boolean = true;

  constructor(
    private fb: FormBuilder,
    private progressBar: ProgressBarService,
    private http: HttpClient,
    private addItem:AddItemInfoService,
    private router: Router,
    private infoModal: InfoModalService,
    private auth: AuthGuardService
    ) {
      this.auth.checkIfUserIfLoggedIn();
      this.progressBar.thingsDone.subscribe(
        res=> {
          if(res>=5)  this.cantSendItem = false;
          else this.cantSendItem = true;
        }
      )
    }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.progressBar.resetAllThings();

  }
  get f() { return this.addItemForm.controls; }

  onSubmit(){
    this.subbmited= true;
    this.addItemTo();
  }

  addItemTo(){
    let formDataInfo ={
      image: this.imageFile,
      product: {
        name:  this.addItemForm.value.name,
        description:  this.addItemForm.value.description,
        price:  this.addItemForm.value.price,
        categoryId:  this.addItemForm.value.category
      }
    }
    this.formData.append('image', formDataInfo.image);
    this.formData.append('product', JSON.stringify(formDataInfo.product));
    this.addItem.sendItem(this.formData).subscribe(
      res => {
        if(res[0] === "GIT"){
          this.router.navigate(['/moje-produkty']);
        }
        else if(res[0] === "BLAD"){
          this.infoModal.setAndShowModal(res[1]);
        }
        else{
          this.infoModal.showErrorModal()
        }
      },
      error => this.infoModal.showErrorModal()
    );
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
    if(val !== '' && val > 0){
      this.progressBar.setThing(1,1);
      this.priceIsGraterThanZero = true;
    }
    else {
      this.progressBar.setThing(1,0);
      this.priceIsGraterThanZero = false;
    }
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
  checkIfCatChoosen():boolean{
    if (this.addItemForm.invalid || this.addItemForm.value.category === '') {
      return false;
    }
  else{
    this.isCatChoosen = true;
    return true;
  }
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
fileChange(event) {
  let fileList: FileList = event.target.files;
  if(fileList.length > 0) {
      this.imageFile = fileList[0];
  }
}

}
