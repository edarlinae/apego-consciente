import { Injectable, inject, signal, effect } from '@angular/core';
import { TestResult } from './attachment-style';
import { AuthService } from './auth';
import { Firestore, doc, setDoc, onSnapshot, collection, addDoc, query, orderBy, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Unsubscribe } from '@firebase/util';

// ... (interfaces JournalEntry y Note sin cambios) ...
export interface JournalEntry {
  id?: string;
  date: string;
  emotions: string[];
  title: string;
  description: string;
}

export type NoteCategory = 'personal' | 'conversations' | 'coupleFun' | 'coupleWork';

export interface Note {
  id?: string;
  text: string;
  category: NoteCategory;
  isCompleted: boolean;
  createdAt: string;
}


// --- NUEVO TIPO ---
// Definimos un tipo explícito para las claves de las calificaciones.
export type RatingCategory = 'intimacy' | 'conflicts' | 'communication' | 'support' | 'fun';

// --- INTERFAZ MODIFICADA ---
export interface WeeklyEntry {
  id?: string;
  date: string; 
  // Usamos Record para indicar que el objeto ratings usará las claves de RatingCategory.
  ratings: Record<RatingCategory, number>;
  positiveAspects: string;
  negativeAspects: string;
}

// ... (El resto del archivo user.ts permanece igual) ...
export interface UserProfile {
  name: string;
  email: string;
  testResult: TestResult | null;
  selectedConducts: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore: Firestore = inject(Firestore);
  private authService: AuthService = inject(AuthService);

  public profile = signal<UserProfile | null>(null);
  public journalEntries = signal<JournalEntry[]>([]);
  public notes = signal<Note[]>([]);
  public weeklyEntries = signal<WeeklyEntry[]>([]);

  private profileUnsubscribe: Unsubscribe | null = null;
  private journalUnsubscribe: Unsubscribe | null = null;
  private notesUnsubscribe: Unsubscribe | null = null;
  private weeklyEntriesUnsubscribe: Unsubscribe | null = null;

  constructor() {
    effect(() => {
      const uid = this.authService.uid();
      if (uid) {
        this.listenToProfile(uid);
        this.listenToJournal(uid);
        this.listenToNotes(uid);
        this.listenToWeeklyEntries(uid);
      } else {
        this.unsubscribeAll();
        this.profile.set(null);
        this.journalEntries.set([]);
        this.notes.set([]);
        this.weeklyEntries.set([]);
      }
    });
  }
  
  private listenToWeeklyEntries(uid: string) {
    const entriesCollectionRef = collection(this.firestore, `users/${uid}/weeklyEntries`);
    const q = query(entriesCollectionRef, orderBy('date', 'desc'));
    this.weeklyEntriesUnsubscribe = onSnapshot(q, (querySnapshot) => {
      const entries: WeeklyEntry[] = [];
      querySnapshot.forEach((doc) => {
        entries.push({ id: doc.id, ...doc.data() } as WeeklyEntry);
      });
      this.weeklyEntries.set(entries);
    });
  }

  async addWeeklyEntry(entryData: Omit<WeeklyEntry, 'id' | 'date'>) {
    const uid = this.authService.uid();
    if (!uid) return;
    const entriesCollectionRef = collection(this.firestore, `users/${uid}/weeklyEntries`);
    await addDoc(entriesCollectionRef, {
      ...entryData,
      date: new Date().toISOString()
    });
  }

  async updateWeeklyEntry(entryId: string, entryData: Partial<Omit<WeeklyEntry, 'id'>>) {
    const uid = this.authService.uid();
    if (!uid) return;
    const entryDocRef = doc(this.firestore, `users/${uid}/weeklyEntries/${entryId}`);
    await updateDoc(entryDocRef, entryData);
  }

  async deleteWeeklyEntry(entryId: string) {
    const uid = this.authService.uid();
    if (!uid) return;
    const entryDocRef = doc(this.firestore, `users/${uid}/weeklyEntries/${entryId}`);
    await deleteDoc(entryDocRef);
  }

  private listenToNotes(uid: string) {
    const notesCollectionRef = collection(this.firestore, `users/${uid}/notes`);
    const q = query(notesCollectionRef, orderBy('createdAt', 'desc'));
    this.notesUnsubscribe = onSnapshot(q, (querySnapshot) => {
      const notes: Note[] = [];
      querySnapshot.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data() } as Note);
      });
      this.notes.set(notes);
    });
  }

  async addNote(text: string, category: NoteCategory) {
    const uid = this.authService.uid();
    if (!uid) return;
    const notesCollectionRef = collection(this.firestore, `users/${uid}/notes`);
    await addDoc(notesCollectionRef, {
      text,
      category,
      isCompleted: false,
      createdAt: new Date().toISOString()
    });
  }

  async updateNote(noteId: string, newText: string) {
    const uid = this.authService.uid();
    if (!uid) return;
    const noteDocRef = doc(this.firestore, `users/${uid}/notes/${noteId}`);
    await updateDoc(noteDocRef, { text: newText });
  }

  async toggleNoteCompletion(noteId: string, isCompleted: boolean) {
    const uid = this.authService.uid();
    if (!uid) return;
    const noteDocRef = doc(this.firestore, `users/${uid}/notes/${noteId}`);
    await updateDoc(noteDocRef, { isCompleted: isCompleted });
  }

  async deleteNote(noteId: string) {
    const uid = this.authService.uid();
    if (!uid) return;
    const noteDocRef = doc(this.firestore, `users/${uid}/notes/${noteId}`);
    await deleteDoc(noteDocRef);
  }
  
  private listenToProfile(uid: string) {
    const profileDocRef = doc(this.firestore, `users/${uid}`);
    this.profileUnsubscribe = onSnapshot(profileDocRef, (docSnap) => {
      if (docSnap.exists()) {
        this.profile.set(docSnap.data() as UserProfile);
      } else {
        const email = this.authService.currentUser()?.email || 'No disponible';
        this.createInitialProfile(uid, email);
      }
    });
  }

  private listenToJournal(uid: string) {
    const journalCollectionRef = collection(this.firestore, `users/${uid}/journal`);
    const q = query(journalCollectionRef, orderBy('date', 'desc'));
    this.journalUnsubscribe = onSnapshot(q, (querySnapshot) => {
      const entries: JournalEntry[] = [];
      querySnapshot.forEach((doc) => {
        entries.push({ id: doc.id, ...doc.data() } as JournalEntry);
      });
      this.journalEntries.set(entries);
    });
  }

  private createInitialProfile(uid: string, email: string) {
    const newProfile: UserProfile = {
      name: 'Nuevo Usuario',
      email: email,
      testResult: null,
      selectedConducts: [],
    };
    const profileDocRef = doc(this.firestore, `users/${uid}`);
    setDoc(profileDocRef, newProfile);
  }

  async setTestResult(result: TestResult) {
    const uid = this.authService.uid();
    if (!uid) return;
    const profileDocRef = doc(this.firestore, `users/${uid}`);
    await setDoc(profileDocRef, { testResult: result, selectedConducts: [] }, { merge: true });
  }

  async addJournalEntry(entryData: { title: string; emotions: string[]; description: string }) {
    const uid = this.authService.uid();
    if (!uid) return;
    const journalCollectionRef = collection(this.firestore, `users/${uid}/journal`);
    await addDoc(journalCollectionRef, {
      date: new Date().toISOString(),
      ...entryData
    });
  }

  async deleteJournalEntry(entryId: string) {
    const uid = this.authService.uid();
    if (!uid || !entryId) return;
    const entryDocRef = doc(this.firestore, `users/${uid}/journal/${entryId}`);
    await deleteDoc(entryDocRef);
  }

  async updateSelectedConducts(conducts: string[]) {
    const uid = this.authService.uid();
    if (!uid) return;
    const profileDocRef = doc(this.firestore, `users/${uid}`);
    await updateDoc(profileDocRef, { selectedConducts: conducts });
  }

  private unsubscribeAll() {
    if (this.profileUnsubscribe) this.profileUnsubscribe();
    if (this.journalUnsubscribe) this.journalUnsubscribe();
    if (this.notesUnsubscribe) this.notesUnsubscribe();
    if (this.weeklyEntriesUnsubscribe) this.weeklyEntriesUnsubscribe();
  }
}