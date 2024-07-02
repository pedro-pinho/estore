import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsComponent } from './ratings.component';
import {
  faStar,
  faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

describe('RatingsComponent', () => {
  let component: RatingsComponent;
  let fixture: ComponentFixture<RatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign value 5 to _score if passed value > 5', () => {
    component.score = 6;
    expect(component['_score']).toBe(5);
  });

  it('should assign 5 empty starts if score is 0', () => {
    component.score = 0;
    expect(component.stars.length).toBe(5);
    expect(component.stars.every((star) => star === faStarEmpty)).toBeTrue();
  });

  it('should assign 5 full starts if score is 5', () => {
    component.score = 5;
    expect(component.stars.length).toBe(5);
    expect(component.stars.every((star) => star === faStar)).toBeTrue();
  });

  it('should assign 4 full starts and 1 half start if score is 4.5', () => {
    component.score = 4.5;
    expect(component.stars.length).toBe(5);
    expect(component.stars.slice(0, 4).every((star) => star === faStar)).toBeTrue();
    expect(component.stars[4]).toBe(faStarHalfStroke);
  });

  it('should assign 3 solid stars, 1 half star and 1 empty star if score is 3.5', () => {
    component.score = 3.5;
    expect(component.stars.length).toBe(5);
    expect(component.stars.slice(0, 3).every((star) => star === faStar)).toBeTrue();
    expect(component.stars[3]).toBe(faStarHalfStroke);
    expect(component.stars[4]).toBe(faStarEmpty);
  });
});
