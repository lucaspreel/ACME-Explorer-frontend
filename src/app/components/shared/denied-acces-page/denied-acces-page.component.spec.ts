import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniedAccesPageComponent } from './denied-acces-page.component';

describe('DeniedAccesPageComponent', () => {
  let component: DeniedAccesPageComponent;
  let fixture: ComponentFixture<DeniedAccesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeniedAccesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeniedAccesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
