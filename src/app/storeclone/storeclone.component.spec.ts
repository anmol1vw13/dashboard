import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorecloneComponent } from './storeclone.component';

describe('StorecloneComponent', () => {
  let component: StorecloneComponent;
  let fixture: ComponentFixture<StorecloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorecloneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorecloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
