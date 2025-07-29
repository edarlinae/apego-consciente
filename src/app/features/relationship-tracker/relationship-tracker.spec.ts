import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelationshipTrackerComponent } from './relationship-tracker';

describe('RelationshipTrackerComponent', () => {
  let component: RelationshipTrackerComponent;
  let fixture: ComponentFixture<RelationshipTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelationshipTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelationshipTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});