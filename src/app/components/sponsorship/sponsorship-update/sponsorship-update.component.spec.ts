import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipUpdateComponent } from './sponsorship-update.component';

describe('SponsorshipUpdateComponent', () => {
  let component: SponsorshipUpdateComponent;
  let fixture: ComponentFixture<SponsorshipUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorshipUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorshipUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
