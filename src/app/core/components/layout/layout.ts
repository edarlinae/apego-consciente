import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html', // Corregido
  styleUrl: './layout.scss'    // Corregido
})
export class LayoutComponent {}