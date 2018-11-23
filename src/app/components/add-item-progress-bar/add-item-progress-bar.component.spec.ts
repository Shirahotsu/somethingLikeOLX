import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemProgressBarComponent } from './add-item-progress-bar.component';

describe('AddItemProgressBarComponent', () => {
  let component: AddItemProgressBarComponent;
  let fixture: ComponentFixture<AddItemProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
