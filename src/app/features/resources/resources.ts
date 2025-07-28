import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user';
import { Conduct, ResourcesService, Tip } from '../../core/services/resources';
import { RouterLink } from '@angular/router';

// Creamos una nueva interfaz para agrupar la conducta y su tip
export interface ConductWithTip {
  conduct: Conduct;
  tip: Tip | undefined; // El tip puede no existir
}

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './resources.html',
  styleUrl: './resources.scss'
})
export class ResourcesComponent {
  public userService = inject(UserService);
  private resourcesService = inject(ResourcesService);

  // Signal computado para obtener el estilo de apego del usuario
  userAttachmentStyle = computed(() => this.userService.profile()?.testResult?.style || null);

  // Signal computado para obtener los IDs de las conductas que el usuario ya ha seleccionado
  selectedConductIds = computed(() => new Set(this.userService.profile()?.selectedConducts || []));

  // --- LÓGICA MEJORADA ---
  // Creamos un único signal que prepara una lista de conductas, cada una con su tip asociado.
  conductsWithTips = computed<ConductWithTip[]>(() => {
    const style = this.userAttachmentStyle();
    if (!style) return [];

    const conducts = this.resourcesService.getConductsForStyle(style);
    const tips = this.resourcesService.getTipsForStyle(style);

    // Creamos un mapa de tips para una búsqueda eficiente
    const tipsMap = new Map(tips.map(tip => [tip.conductId, tip]));

    // Asociamos cada conducta con su tip correspondiente
    return conducts.map(conduct => ({
      conduct: conduct,
      tip: tipsMap.get(conduct.id)
    }));
  });

  /**
   * Se ejecuta cuando el usuario marca o desmarca una conducta.
   * La lógica aquí no cambia, sigue actualizando la base de datos.
   */
  onConductChange(conductId: string, isSelected: boolean) {
    const currentSelected = new Set(this.selectedConductIds());
    if (isSelected) {
      currentSelected.add(conductId);
    } else {
      currentSelected.delete(conductId);
    }
    this.userService.updateSelectedConducts(Array.from(currentSelected));
  }
}
