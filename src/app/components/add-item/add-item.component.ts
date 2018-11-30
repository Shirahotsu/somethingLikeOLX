import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProgressBarService } from '@services/progress-bar.service'
import { AddItemInfoService } from '@services/add-item-info.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router"
import { InfoModalService } from '@services/info-modal.service';

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
  file22: File;
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NDM0NDc3NzIsInN1YiI6InRlc3QudEB3cC5wbCIsImVtYWlsIjoidGVzdC50QHdwLnBsIiwicGFzc3dvcmQiOiIyMjIyMjIifQ.qiX_ndacR5j5IZwlzw_1usBun0r1wFdERk-Ms4YoVluOrKSk1M9JYUJU1ePIE4UaZ6nJb3_JUENGI7tZk_wDuQ'
    })
  };

  constructor(
    private fb: FormBuilder,
    private progressBar: ProgressBarService,
    private http: HttpClient,
    private addItem:AddItemInfoService,
    private router: Router,
    private infoModal: InfoModalService
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
  ngOnDestroy(): void {
    this.progressBar.resetAllThings();

  }
  get f() { return this.addItemForm.controls; }

  onSubmit(){

    this.subbmited= true;
    // if(this.checkIfCatChoosen()){
    //   return;
    // }
    // else {
    //   this.addItemTo();
    // }
    this.addItemTo();

  }

  addItemTo(){
    let formDataInfo ={
      image: this.file22,
      product: {
        name:  this.addItemForm.value.name,
        description:  this.addItemForm.value.description,
        price:  this.addItemForm.value.price,
        categoryId:  this.addItemForm.value.category
      }
    }
    console.log(JSON.stringify(formDataInfo.product));
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
          this.infoModal.setAndShowModal('Kurka wodna! Coś poszło nie tak, spróbuj ponownie póżniej')
        }
      },
      error => this.infoModal.setAndShowModal('Kurka wodna! Coś poszło nie tak, spróbuj ponownie póżniej')
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
              console.log(this.prepareSave())
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
onFileChange(event) {
  if(event.target.files.length > 0) {
    let file = this.url;
    console.log(file)

  }
}
prepareSave(): any {
  let input = new FormData();
  // input.append('name', this.addItemForm.value.name);
  // input.append('description', this.addItemForm.value.description);
  // input.append('price', this.addItemForm.value.price);
  // input.append('category_id', this.addItemForm.value.category);
  input.append('image', this.url);
  return input;
}
fileChange(event) {
  let fileList: FileList = event.target.files;
  if(fileList.length > 0) {
      this.file22 = fileList[0];
      // this.formData.append('image', file);
  }
}

}
