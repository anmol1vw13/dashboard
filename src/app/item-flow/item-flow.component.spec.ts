import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFlowComponent } from './item-flow.component';

describe('ItemFlowComponent', () => {
  let component: ItemFlowComponent;
  let fixture: ComponentFixture<ItemFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
