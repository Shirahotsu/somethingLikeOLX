import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAutocomplateComponent } from './mobile-autocomplate.component';

describe('MobileAutocomplateComponent', () => {
  let component: MobileAutocomplateComponent;
  let fixture: ComponentFixture<MobileAutocomplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAutocomplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAutocomplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
