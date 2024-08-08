import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HometitleComponent } from './hometitle.component';

describe('HometitleComponent', () => {
  let component: HometitleComponent;
  let fixture: ComponentFixture<HometitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HometitleComponent]
    });
    fixture = TestBed.createComponent(HometitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
