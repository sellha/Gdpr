import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProtabilityComponent } from './data-protability.component';

describe('DataProtabilityComponent', () => {
  let component: DataProtabilityComponent;
  let fixture: ComponentFixture<DataProtabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataProtabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataProtabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
