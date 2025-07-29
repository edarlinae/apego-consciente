import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importamos el nombre correcto del componente
import { ResourcesComponent } from './resources';

describe('ResourcesComponent', () => {
  // Usamos el tipo correcto
  let component: ResourcesComponent;
  let fixture: ComponentFixture<ResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importamos el componente
      imports: [ResourcesComponent]
    })
    .compileComponents();

    // Creamos el componente con el nombre correcto
    fixture = TestBed.createComponent(ResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
