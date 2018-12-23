import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  SearchService
} from '@services/search.service';
import {
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-mobile-autocomplate',
  templateUrl: './mobile-autocomplate.component.html',
  styleUrls: ['../autocomplate/autocomplate.component.scss']
})
export class MobileAutocomplateComponent implements OnInit {
  hints: boolean = false;
  canStartAnimation: boolean = true;
  searchForm = new FormGroup({
    search: new FormControl('')
  });
  arrayOfStrings: any;
  constructor(
    private search: SearchService,
    private router: Router
  ) {}

  ngOnInit() {}

  hideSearchBar() {
    this.hints = false;
  }

  showSearchBar() {
    this.hints = true;
  }

  getDataOnSecondChange(event) {
    let val = event.target.value;
    if (val.length > 2) {
      this.hints = true;
      this.search.getSearchResult(val).subscribe(
        res => this.checkDataRes(res),
        err => this.arrayOfStrings = ['Podaj prawidłową nazwę produktu']
      );
    } else {
      this.arrayOfStrings = null;
      this.hints = false;
    }
  }
  setHintValue(hint: string) {
    this.canStartAnimation = false;
    this.router.navigate(['/wyszukaj/' + hint]);
  }

  checkDataRes(res) {
    if (res.length === 0) {
      this.arrayOfStrings = ['Brak wyników'];
    } else this.arrayOfStrings = res
  }
}
