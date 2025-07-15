import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const user = writable<User | null>(null);

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const authStore = writable<AuthState>({ user: null, isAuthenticated: false });

onAuthStateChanged(auth, (user) => {
  authStore.set({
    user,
    isAuthenticated: !!user
  });
});