import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '@services/get-data.service';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {
  forU:any;
  private sub: any;
  id:number;
  itemObj:any;
  product:any;
  constructor(
    private route: ActivatedRoute,
    private json:GetDataService
  ) {
    this.forU= [
      {
        price: 150,
        image: '../../assets/zd1.jpg',
        name: 'Telewizor samsung',
        id:0,
        cat: "agd rtv",
      },
      {
        price: 312,
        image: '../../assets/zd1.jpg',
        name: 'Telewizor samsung',
        id:1,
        cat: "agd rtv",
      },
      {
        price: 15350,
        image: '../../assets/zd2.jpg',
        name: 'Zmywarka twojej matki',
        id:2,
        cat: "agd rtv",
      },
      {
        price: 2,
        image: '../../assets/zd6.jpg',
        name: 'pralka',
        id:3,
        cat: "agd rtv",
      },
      {
        price: 213,
        image: '../../assets/zd4.jpg',
        name: 'kuchenka',
        id:4,
        cat: "agd rtv",
      }
    ];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['name']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      this.getFromArray();
  });


  }
  getFromArray(){
    this.json.getLocalData().subscribe(
      res => {
        this.product = res[this.id],
        console.log(res)
      }
    );
  }

}
