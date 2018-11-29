import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { JwtTokenService } from './jwt-token.service';
import { ItemInfo } from '@models/itemInfo.model';
import { InfoModalComponent } from '@components/info-modal/info-modal.component';
import { InfoModalService } from './info-modal.service';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AddItemInfoService {
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.jwt.getJwtToken()
    })
  };
  url:string = 'http://192.168.0.4:8090/rest/product/addProduct'
  constructor(
    private http: HttpClient,
    private jwt:JwtTokenService,
    private infoModal: InfoModalService
    ) {
  }

  sendItemInfo(e:ItemInfo){
    this.http.post<any>(this.url, {
      name: e.name,
      description: e.description,
      price: e.price,
      category_id: e.category
    }, this.httpOptions).subscribe(
      res=>{
        this.checkResponse(res);
      },
      err=>console.warn(err)
    );
  }
  sendItem(e){
    return this.http.post(this.url, e, this.httpOptions)
    .pipe(map(
      res => {return res},
      error => this.infoModal.setAndShowModal('Kurka wodna! Coś poszło nie tak, spróbuj ponownie póżniej')
      ));
  }

  checkResponse(e){
    if(e[0] === "BLAD"){
      this.infoModal.setAndShowModal(e);
    }
    else{
      console.log(e)
    }
  }

}
