import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestTutorsComponent } from './best-tutors.component';

describe('BestTutorsComponent', () => {
  let component: BestTutorsComponent;
  let fixture: ComponentFixture<BestTutorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestTutorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestTutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
