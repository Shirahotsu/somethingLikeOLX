import { Component, OnInit } from '@angular/core';
import { GetDataService } from '@services/get-data.service';

@Component({
  selector: 'app-users-items',
  templateUrl: './users-items.component.html',
  styleUrls: ['./users-items.component.scss']
})
export class UsersItemsComponent implements OnInit {
  items:any;
  constructor(
    private json:GetDataService
  ) {

  }

  ngOnInit() {

  }
  getUsersProducts(){
    this.json.getLocalData().subscribe(
      res=> this.items = res
    );
  }

}
