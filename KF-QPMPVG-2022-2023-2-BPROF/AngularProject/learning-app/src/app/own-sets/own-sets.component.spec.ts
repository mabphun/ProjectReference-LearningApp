import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnSetsComponent } from './own-sets.component';

describe('OwnSetsComponent', () => {
  let component: OwnSetsComponent;
  let fixture: ComponentFixture<OwnSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnSetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
