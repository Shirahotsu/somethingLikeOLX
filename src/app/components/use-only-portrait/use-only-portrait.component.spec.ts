import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseOnlyPortraitComponent } from './use-only-portrait.component';

describe('UseOnlyPortraitComponent', () => {
  let component: UseOnlyPortraitComponent;
  let fixture: ComponentFixture<UseOnlyPortraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseOnlyPortraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseOnlyPortraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
