import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrochipComponent } from './microchip.component';

describe('MicrochipComponent', () => {
  let component: MicrochipComponent;
  let fixture: ComponentFixture<MicrochipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicrochipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrochipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
