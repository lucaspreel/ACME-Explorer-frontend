import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipCreateComponent } from './sponsorship-create.component';

describe('SponsorshipCreateComponent', () => {
  let component: SponsorshipCreateComponent;
  let fixture: ComponentFixture<SponsorshipCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorshipCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorshipCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
