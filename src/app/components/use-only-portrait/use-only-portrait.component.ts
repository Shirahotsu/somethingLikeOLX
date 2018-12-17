import { Component, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-use-only-portrait',
  templateUrl: './use-only-portrait.component.html',
  styleUrls: ['./use-only-portrait.component.scss']
})
export class UseOnlyPortraitComponent implements AfterViewInit {
  disableUsingWebSite:boolean = false;
  constructor(private renderer: Renderer2) {
    this.useOnlyPortraitInfo();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.renderer.listen(window, 'orientationchange', () => {
      this.useOnlyPortraitInfo();
    });
}

useOnlyPortraitInfo() {
  let orientation = window.orientation;
  if(orientation === -90 || orientation === 90) this.disableUsing();
  else this.enableUsing();
}
disableUsing(){
  this.disableUsingWebSite = true;
}
enableUsing(){
  this.disableUsingWebSite = false;
}
}
