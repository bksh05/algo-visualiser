import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortestDistanceComponent } from './shortest-distance.component';

describe('ShortestDistanceComponent', () => {
  let component: ShortestDistanceComponent;
  let fixture: ComponentFixture<ShortestDistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortestDistanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortestDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
