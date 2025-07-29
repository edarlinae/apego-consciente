import { ComponentFixture, TestBed } from '@angular/core/testing';

// Asegúrate de que el nombre del componente importado sea el correcto
import { ExercisesComponent } from './exercises';

describe('ExercisesComponent', () => {
  let component: ExercisesComponent;
  let fixture: ComponentFixture<ExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
