import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DewormComponent } from './deworm.component';

describe('DewormComponent', () => {
  let component: DewormComponent;
  let fixture: ComponentFixture<DewormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DewormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DewormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
