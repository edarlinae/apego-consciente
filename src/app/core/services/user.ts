    import { Injectable, inject, signal, effect } from '@angular/core';
    import { TestResult } from './attachment-style';
    import { AuthService } from './auth';
    import { Firestore, doc, setDoc, onSnapshot, collection, addDoc, query, orderBy, updateDoc } from '@angular/fire/firestore';
    import { Unsubscribe } from '@firebase/util';

    export interface JournalEntry {
      id?: string;
      date: string;
      emotion: string;
      title: string;
      description: string;
    }

    export interface UserProfile {
      name: string;
      email: string;
      testResult: TestResult | null;
      selectedConducts: string[]; // <-- NUEVO CAMPO
    }

    @Injectable({
      providedIn: 'root'
    })
    export class UserService {
      private firestore: Firestore = inject(Firestore);
      private authService: AuthService = inject(AuthService);

      public profile = signal<UserProfile | null>(null);
      public journalEntries = signal<JournalEntry[]>([]);

      private profileUnsubscribe: Unsubscribe | null = null;
      private journalUnsubscribe: Unsubscribe | null = null;

      constructor() {
        effect(() => {
          const uid = this.authService.uid();
          if (uid) {
            this.listenToProfile(uid);
            this.listenToJournal(uid);
          } else {
            this.unsubscribeAll();
            this.profile.set(null);
            this.journalEntries.set([]);
          }
        });
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
          selectedConducts: [], // <-- NUEVO CAMPO INICIALIZADO
        };
        const profileDocRef = doc(this.firestore, `users/${uid}`);
        setDoc(profileDocRef, newProfile);
      }

      async setTestResult(result: TestResult) {
        const uid = this.authService.uid();
        if (!uid) return;
        const profileDocRef = doc(this.firestore, `users/${uid}`);
        // Al hacer el test, reseteamos las conductas seleccionadas
        await setDoc(profileDocRef, { testResult: result, selectedConducts: [] }, { merge: true });
      }

      async addJournalEntry(entryData: { title: string; emotion: string; description: string }) {
        const uid = this.authService.uid();
        if (!uid) return;
        const journalCollectionRef = collection(this.firestore, `users/${uid}/journal`);
        await addDoc(journalCollectionRef, {
          date: new Date().toISOString(),
          ...entryData
        });
      }

      // --- NUEVO MÉTODO PARA ACTUALIZAR CONDUCTAS ---
      async updateSelectedConducts(conducts: string[]) {
        const uid = this.authService.uid();
        if (!uid) return;
        const profileDocRef = doc(this.firestore, `users/${uid}`);
        await updateDoc(profileDocRef, { selectedConducts: conducts });
      }

      private unsubscribeAll() {
        if (this.profileUnsubscribe) this.profileUnsubscribe();
        if (this.journalUnsubscribe) this.journalUnsubscribe();
      }
    }
    