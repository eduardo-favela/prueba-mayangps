import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RastreoTrComponent } from './rastreo-tr.component';

describe('RastreoTrComponent', () => {
  let component: RastreoTrComponent;
  let fixture: ComponentFixture<RastreoTrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RastreoTrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RastreoTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
