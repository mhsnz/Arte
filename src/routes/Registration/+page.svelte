<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { initializeApp } from 'firebase/app';
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
  import { getFirestore, doc, setDoc } from 'firebase/firestore';
  import { user } from '$lib/authStore';

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDZWpSizhQP3PJoKR9QamepHdXPk8d5ddc",
    authDomain: "londeville-bc0c4.firebaseapp.com",
    projectId: "londeville-bc0c4",
    storageBucket: "londeville-bc0c4.firebasestorage.app",
    messagingSenderId: "10775104536",
    appId: "1:10775104536:web:bfc34aa829f30ceecd476d"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const googleProvider = new GoogleAuthProvider();

  let activeTab: 'login' | 'signup' = 'login';
  let email: string = '';
  let password: string = '';
  let name: string = '';
  let phone: string = '';
  let userType: 'vendor' | 'customer' = 'customer';
  let errorMessage: string = '';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validatePhone(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  async function handleLogin() {
    if (!email || !password) {
      errorMessage = 'Please fill in all fields';
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.set(userCredential.user);
      goto('/');
    } catch (error) {
      errorMessage = error.message;
    }
  }

  async function handleSignup() {
    if (!name || !email || !phone || !password || !userType) {
      errorMessage = 'Please fill in all fields';
      return;
    }
    if (!emailRegex.test(email)) {
      errorMessage = 'Please enter a valid email address';
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userData = userCredential.user;
      
      await setDoc(doc(db, 'users', userData.uid), {
        name,
        email,
        phone,
        userType,
        createdAt: new Date().toISOString()
      });
      
      user.set(userData);
      goto('/Dashboard');
    } catch (error) {
      errorMessage = error.message;
    }
  }

  async function handleGoogleAuth() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userData = result.user;
      
      if (activeTab === 'signup') {
        if (!name || !phone || !userType) {
          errorMessage = 'Please fill in all fields for Google signup';
          return;
        }
        await setDoc(doc(db, 'users', userData.uid), {
          name: userData.displayName || name,
          email: userData.email,
          phone,
          userType,
          createdAt: new Date().toISOString()
        });
      }
      
      user.set(userData);
      goto('/Dashboard');
    } catch (error) {
      errorMessage = error.message;
    }
  }

  onMount(() => {
    auth.onAuthStateChanged((userData) => {
      if (userData) {
        user.set(userData);
        goto('/Dashboard');
      } else {
        user.set(null);
      }
    });
  });
</script>

<div class="min-h-screen bg-white flex items-center justify-center px-4">
  <div class="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-md mt-16 sm:mt-0">
    <div class="absolute top-[-2.5rem] left-0 flex flex-row gap-2">
      <button
        class="px-4 py-2 rounded-t-lg font-semibold transition-colors duration-200 cursor-pointer
        {activeTab === 'login' ? 'bg-[#cba157] text-white' : 'bg-gray-200 text-black hover:bg-white'}"
        on:click={() => activeTab = 'login'}
      >
        Login
      </button>
      <button
        class="px-4 py-2 rounded-t-lg font-semibold transition-colors duration-200 cursor-pointer
        {activeTab === 'signup' ? 'bg-[#cba157] text-white' : 'bg-gray-200 text-black hover:bg-white'}"
        on:click={() => activeTab = 'signup'}
      >
        Signup
      </button>
    </div>

    {#if activeTab === 'login'}
      <div class="space-y-3">
        <h2 class="text-2xl font-bold text-center text-black">Login</h2>
        {#if errorMessage}
          <p class="text-red-500 text-center text-sm">{errorMessage}</p>
        {/if}
        <div>
          <input
            type="email"
            bind:value={email}
            placeholder="Email"
            required
            class="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cba157]"
          />
        </div>
        <div>
          <input
            type="password"
            bind:value={password}
            placeholder="Password"
            required
            class="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cba157]"
          />
        </div>
        <div class="text-right">
          <a href="/forgot-password" class="text-sm text-[#cba157] hover:underline">Forgot Password?</a>
        </div>
        <button
          on:click={handleLogin}
          class="w-full p-3 bg-[#cba157] text-white rounded-md hover:bg-black transition-colors cursor-pointer"
        >
          Login
        </button>
        <button
          on:click={handleGoogleAuth}
          class="w-full p-3 bg-gray-100 text-black rounded-md hover:bg-white transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.33 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4.01 20.07 7.68 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.68 1 4.01 3.93 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Login with Google
        </button>
      </div>
    {:else}
      <div class="space-y-3">
        <h2 class="text-2xl font-bold text-center text-black">Signup</h2>
        {#if errorMessage}
          <p class="text-red-500 text-center text-sm">{errorMessage}</p>
        {/if}
        <div>
          <input
            type="text"
            bind:value={name}
            placeholder="Name"
            required
            class="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cba157]"
          />
        </div>
        <div>
          <input
            type="email"
            bind:value={email}
            placeholder="Email"
            required
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
            class="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cba157]"
          />
        </div>
        <div>
          <input
            type="tel"
            bind:value={phone}
            placeholder="Phone Number"
            required
            on:input={validatePhone}
            class="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cba157]"
          />
        </div>
        <div>
          <input
            type="password"
            bind:value={password}
            placeholder="Password"
            required
            class="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cba157]"
          />
        </div>
        <div class="space-y-2">
          <p class="font-semibold text-black">Who Are You?</p>
          <div class="flex gap-4">
            <label class="flex items-center gap-2">
              <input
                type="radio"
                bind:group={userType}
                value="vendor"
                required
                class="text-[#cba157] focus:ring-[#cba157]"
              />
              Vendor
            </label>
            <label class="flex items-center gap-2">
              <input
                type="radio"
                bind:group={userType}
                value="customer"
                required
                class="text-[#cba157] focus:ring-[#cba157]"
              />
              Customer
            </label>
          </div>
        </div>
        <button
          on:click={handleSignup}
          class="w-full p-3 bg-[#cba157] text-white rounded-md hover:bg-black transition-colors cursor-pointer"
        >
          Signup
        </button>
        <button
          on:click={handleGoogleAuth}
          class="w-full p-3 bg-gray-100 text-black rounded-md hover:bg-white transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.33 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4.01 20.07 7.68 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.68 1 4.01 3.93 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Signup with Google
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .min-h-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .max-w-md {
    width: 100%;
    margin-left: 1rem;
    margin-right: 1rem;
    max-width: 28rem;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  .text-sm {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
  }

  .space-y-3 {
    overflow: visible;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .space-y-2 {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>