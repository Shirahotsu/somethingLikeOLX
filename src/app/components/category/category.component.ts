import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from '@services/get-data.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  private sub: any;
  public nameCat: string;
  public dummyData:any;
  public dummyData2:any;
  public moreProducts: number;
  constructor(
    private route: ActivatedRoute,
    private jsonData: GetDataService,
    private router: Router
    ) {

      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
      };
      this.moreProducts = 0;
      this.dummyData2 = "../../assets/Baner - elektronika.jpg";

      this.sub = this.route.params.subscribe(params => {
        this.nameCat = params['name']; // (+) converts string 'id' to a number
        console.log(this.nameCat);
        // In a real app: dispatch action to load the details here.
      });
      this.getData();
  }

  ngOnInit() {



  }
  // TODO zrobić by pobierało przez http x produktów
  getData(){
    this.moreProducts += 3;
    this.jsonData.getLocalData().subscribe(data => {
      this.dummyData = data.filter(item => {
        return item.cat === this.nameCat;
      });
    })
  }


}
