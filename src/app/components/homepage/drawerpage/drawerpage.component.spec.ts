import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerpageComponent } from './drawerpage.component';

describe('DrawerpageComponent', () => {
  let component: DrawerpageComponent;
  let fixture: ComponentFixture<DrawerpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrawerpageComponent]
    });
    fixture = TestBed.createComponent(DrawerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
