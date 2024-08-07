import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderpageComponent } from './headerpage.component';

describe('HeaderpageComponent', () => {
  let component: HeaderpageComponent;
  let fixture: ComponentFixture<HeaderpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderpageComponent]
    });
    fixture = TestBed.createComponent(HeaderpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
