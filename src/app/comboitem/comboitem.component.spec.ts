import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboitemComponent } from './comboitem.component';

describe('ComboitemComponent', () => {
  let component: ComboitemComponent;
  let fixture: ComponentFixture<ComboitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
