import { Component } from '@angular/core';
import { LayoutComponent } from './core/components/layout/layout'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent], // Importamos LayoutComponent
  template: '<app-layout />', // Usamos el componente de layout
})
export class AppComponent {
  title = 'apego-consciente';
}