import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Suggfriends } from './suggfriends';

describe('Suggfriends', () => {
  let component: Suggfriends;
  let fixture: ComponentFixture<Suggfriends>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Suggfriends],
    }).compileComponents();

    fixture = TestBed.createComponent(Suggfriends);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
