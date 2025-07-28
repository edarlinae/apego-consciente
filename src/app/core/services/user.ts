import { Injectable, signal, computed } from '@angular/core';
import { TestResult } from './attachment-style';

/**
 * Interface para definir la estructura de una entrada del diario.
 */
export interface JournalEntry {
  id: string;
  date: string;
  emotion: string;
  title: string;
  description: string;
}

/**
 * Interface para definir la estructura completa del estado del usuario.
 */
export interface UserState {
  name: string;
  testResult: TestResult | null;
  journal: JournalEntry[];
}

/**
 * El estado inicial de la aplicación cuando se carga por primera vez.
 */
const initialState: UserState = {
  name: 'Invitado',
  testResult: null,
  journal: [], // El diario del usuario comienza vacío.
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Signal "escribible" que contiene el estado completo y privado del usuario.
  private state = signal<UserState>(initialState);

  // --- Signals Públicos Computados (de solo lectura) ---
  // Estos exponen partes específicas del estado de una manera segura.
  // Los componentes se suscribirán a estos para reaccionar a los cambios.

  public currentUser = computed(() => this.state().name);
  public testResult = computed(() => this.state().testResult);
  public hasCompletedTest = computed(() => this.state().testResult !== null);
  
  /**
   * Signal computado que expone la lista de entradas del diario.
   * Está ordenado por defecto al añadir nuevas entradas al principio.
   */
  public journalEntries = computed(() => this.state().journal);

  constructor() { }

  /**
   * Actualiza el resultado del test de apego en el estado global.
   * @param result El objeto con el resultado del test.
   */
  public setTestResult(result: TestResult) {
    this.state.update(currentState => ({
      ...currentState,
      testResult: result
    }));
  }

  /**
   * Añade una nueva entrada al diario del usuario.
   * @param entryData Los datos de la nueva entrada del formulario.
   */
  public addJournalEntry(entryData: { title: string; emotion: string; description: string }) {
    const newEntry: JournalEntry = {
      id: crypto.randomUUID(), // Genera un ID único para la entrada.
      date: new Date().toISOString(), // Establece la fecha actual en formato ISO.
      ...entryData
    };

    // Actualiza el estado, añadiendo la nueva entrada al principio del array.
    this.state.update(currentState => ({
      ...currentState,
      journal: [newEntry, ...currentState.journal]
    }));
  }
}
