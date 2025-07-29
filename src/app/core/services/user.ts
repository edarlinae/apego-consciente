    import { Injectable, inject, signal, effect } from '@angular/core';
    import { TestResult } from './attachment-style';
    import { AuthService } from './auth';
    import { Firestore, doc, setDoc, onSnapshot, collection, addDoc, query, orderBy, updateDoc, deleteDoc } from '@angular/fire/firestore';
    import { Unsubscribe } from '@firebase/util';

    export interface JournalEntry {
      id?: string;
      date: string;
      emotions: string[];
      title: string;
      description: string;
    }
    
    // --- NUEVA INTERFAZ PARA LAS NOTAS ---
    export type NoteCategory = 'personal' | 'conversations' | 'coupleFun' | 'coupleWork';

    export interface Note {
      id?: string;
      text: string;
      category: NoteCategory;
      isCompleted: boolean;
      createdAt: string;
    }

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
      public notes = signal<Note[]>([]); // <-- NUEVO SIGNAL PARA NOTAS

      private profileUnsubscribe: Unsubscribe | null = null;
      private journalUnsubscribe: Unsubscribe | null = null;
      private notesUnsubscribe: Unsubscribe | null = null; // <-- NUEVO HANDLE

      constructor() {
        effect(() => {
          const uid = this.authService.uid();
          if (uid) {
            this.listenToProfile(uid);
            this.listenToJournal(uid);
            this.listenToNotes(uid); // <-- NUEVA LLAMADA
          } else {
            this.unsubscribeAll();
            this.profile.set(null);
            this.journalEntries.set([]);
            this.notes.set([]); // <-- RESETEAR NOTAS
          }
        });
      }

      // --- NUEVO MÉTODO PARA ESCUCHAR LAS NOTAS ---
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

      // --- NUEVOS MÉTODOS PARA GESTIONAR NOTAS ---
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
      
      // --- MÉTODOS EXISTENTES (sin cambios) ---
      // ... (listenToProfile, listenToJournal, createInitialProfile, etc.)
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
        if (this.notesUnsubscribe) this.notesUnsubscribe(); // <-- NUEVO
      }
    }
    