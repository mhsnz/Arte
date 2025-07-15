<script lang="ts">
  import { onMount } from 'svelte';
  import { auth, db } from '$lib/firebase';
  import { doc, getDoc, setDoc } from 'firebase/firestore';
  import { signOut } from 'firebase/auth';
  import { goto } from '$app/navigation';
  import type { User } from 'firebase/auth';
  import Icon from '@iconify/svelte'; // Assuming you have a Svelte component for Iconify

  // State for the selected box and user data
  let selectedBox: string = 'welcome'; // Default for desktop
  let user: User | null = null;
  let userData: any = {};
  let orders: any[] = [];
  let favorites: any[] = [];
  let showLogoutPopup: boolean = false;
  let isMobile: boolean = false;

  // Detect mobile screen size
  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768; // Tailwind's 'md' breakpoint
      if (isMobile) {
        selectedBox = 'sidebar'; // Default to sidebar on mobile
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        user = currentUser;
        const userDoc = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          userData = docSnap.data();
        }
        const ordersDoc = doc(db, 'orders', currentUser.uid);
        const ordersSnap = await getDoc(ordersDoc);
        if (ordersSnap.exists()) {
          orders = ordersSnap.data().items || [];
        }
        const favoritesDoc = doc(db, 'favorites', currentUser.uid);
        const favoritesSnap = await getDoc(favoritesDoc);
        if (favoritesSnap.exists()) {
          favorites = favoritesSnap.data().items || [];
        }
      } else {
        goto('/Registration');
      }
    });

    return () => window.removeEventListener('resize', checkMobile);
  });

  // Handle form submission
  async function handleSubmit() {
    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, {
        name: userData.name || '',
        family: userData.family || '',
        email: userData.email || user?.email || '',
        phone: userData.phone || '',
        address: userData.address || ''
      });
      alert('Information updated successfully!');
    }
  }

  // Handle logout
  async function handleLogout() {
    await signOut(auth);
    goto('/Registration');
  }

  // Handle back button to return to sidebar on mobile
  function handleBack() {
    selectedBox = 'sidebar';
  }
</script>

<!-- Desktop Layout (unchanged from original except for input and button styles) -->
{#if !isMobile}
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="flex w-3/4 max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Left Side: Boxes -->
      <div class="w-1/3 bg-gray-50 p-4 border-r">
        <div
          class="p-4 mb-2 cursor-pointer rounded hover:bg-black hover:text-white transition-all duration-500"
          class:bg-[#cba157]={selectedBox === 'information'}
          on:click={() => (selectedBox = 'information')}
        >
          Information
        </div>
        <div
          class="p-4 mb-2 cursor-pointer rounded hover:bg-black hover:text-white transition-all duration-500"
          class:bg-[#cba157]={selectedBox === 'orders'}
          on:click={() => (selectedBox = 'orders')}
        >
          Orders
        </div>
        <div
          class="p-4 mb-2 cursor-pointer rounded hover:bg-black hover:text-white transition-all duration-500"
          class:bg-[#cba157]={selectedBox === 'favorites'}
          on:click={() => (selectedBox = 'favorites')}
        >
          Favorite Products
        </div>
        <div
          class="p-4 cursor-pointer rounded hover:bg-red-600 hover:text-white transition-all duration-500"
          class:bg-[#cba157]={selectedBox === 'logout'}
          on:click={() => (showLogoutPopup = true)}
        >
          Log Out
        </div>
      </div>

      <!-- Right Side: Dynamic Content -->
      <div class="w-2/3 p-8 flex items-center justify-center">
        {#if selectedBox === 'welcome'}
          <h1 class="text-2xl font-bold">Welcome to Dashboard!</h1>
        {:else if selectedBox === 'information'}
          <div class="w-full">
            <h2 class="text-xl font-semibold mb-4">User Information</h2>
            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
              <div class="flex space-x-4">
                <div class="w-1/2">
                  <label for="name" class="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    bind:value={userData.name}
                    placeholder="Enter your name"
                    class="w-full p-2 border-b border-gray-300 focus:border-[#cba157] focus:border-2 focus:outline-none"
                  />
                </div>
                <div class="w-1/2">
                  <label for="family" class="block text-sm font-medium">Family</label>
                  <input
                    type="text"
                    id="family"
                    bind:value={userData.family}
                    placeholder="Enter your family name"
                    class="w-full p-2 border-b border-gray-300 focus:border-[#cba157] focus:border-2 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label for="email" class="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  bind:value={userData.email}
                  placeholder="Enter your email"
                  class="w-full p-2 border-b border-gray-300 focus:border-[#cba157] focus:border-2 focus:outline-none"
                />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  bind:value={userData.phone}
                  placeholder="Enter your phone number"
                  class="w-full p-2 border-b border-gray-300 focus:border-[#cba157] focus:border-2 focus:outline-none"
                />
              </div>
              <div>
                <label for="address" class="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  id="address"
                  bind:value={userData.address}
                  placeholder="Enter your address"
                  class="w-full p-2 border-b border-gray-300 focus:border-[#cba157] focus:border-2 focus:outline-none"
                />
              </div>
              <button type="submit" class="bg-[#cba157] text-white p-2 rounded hover:bg-black transition-all duration-500">
                Submit
              </button>
            </form>
          </div>
        {:else if selectedBox === 'orders'}
          {#if orders.length === 0}
            <p class="text-lg">No orders registered yet.</p>
          {:else}
            <div class="w-full">
              <h2 class="text-xl font-semibold mb-4">Your Orders</h2>
              {#each orders as order}
                <div class="p-4 mb-2 border rounded">
                  <p>Order ID: {order.id}</p>
                  <p>Status: {order.status}</p>
                </div>
              {/each}
            </div>
          {/if}
        {:else if selectedBox === 'favorites'}
          {#if favorites.length === 0}
            <p class="text-lg">No favorite products yet.</p>
          {:else}
            <div class="w-full">
              <h2 class="text-xl font-semibold mb-4">Favorite Products</h2>
              {#each favorites as product}
                <div class="p-4 mb-2 border rounded">
                  <p>Product: {product.name}</p>
                  <p>Price: ${product.price}</p>
                </div>
              {/each}
            </div>
          {/if}
        {/if}
      </div>
    </div>
  </div>
{:else}
  <!-- Mobile Layout -->
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Sidebar (shown by default on mobile) -->
      {#if selectedBox === 'sidebar' || selectedBox === 'welcome'}
        <div class="w-full bg-gray-50 p-4 flex flex-col">
          <div
            class="p-4 mb-2 cursor-pointer rounded hover:bg-black hover:text-white transition-all duration-500"
            class:bg-[#cba157]={selectedBox === 'information'}
            on:click={() => (selectedBox = 'information')}
          >
            Information
          </div>
          <div
            class="p-4 mb-2 cursor-pointer rounded hover:bg-black hover:text-white transition-all duration-500"
            class:bg-[#cba157]={selectedBox === 'orders'}
            on:click={() => (selectedBox = 'orders')}
          >
            Orders
          </div>
          <div
            class="p-4 mb-2 cursor-pointer rounded hover:bg-black hover:text-white transition-all duration-500"
            class:bg-[#cba157]={selectedBox === 'favorites'}
            on:click={() => (selectedBox = 'favorites')}
          >
            Favorite Products
          </div>
          <div
            class="p-4 cursor-pointer rounded hover:bg-red-600 hover:text-white transition-all duration-500"
            class:bg-[#cba157]={selectedBox === 'logout'}
            on:click={() => (showLogoutPopup = true)}
          >
            Log Out
          </div>
        </div>
      {/if}

      <!-- Dynamic Content (shown when a menu item is selected) -->
      {#if selectedBox !== 'sidebar'}
        <div class="w-full p-8 flex flex-col relative">
          <!-- Back Button -->
          {#if selectedBox !== 'welcome'}
            <button
              class="absolute top-4 left-4 text-2xl"
              on:click={handleBack}
            >
              <Icon icon="mdi:arrow-left" width="24" height="24" />
            </button>
          {/if}

          {#if selectedBox === 'welcome'}
            <h1 class="text-2xl font-bold text-center">Welcome to Dashboard!</h1>
          {:else if selectedBox === 'information'}
            <div class="w-full">
              <h2 class="text-xl font-semibold mb-4 text-center">User Information</h2>
              <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                <div class="flex flex-col space-y-4">
                  <div>
                    <label for="name" class="block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      id="name"
                      bind:value={userData.name}
                      placeholder="Enter your name"
                      class="w-full p-2 border-b border-gray-300 focus:border-[#cba157] focus:border-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label for="family" class="block text-sm font-medium">Family</label>
                    <input
                      type="text"
                      id="family"
                      bind:value={userData.family}
                      placeholder="Enter your family name"
                      class="w-full p-2 border-b border-gray-300 focus:border-[#cba157] focus:border-2 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    bind:value={userData.email}
                    placeholder="Enter your email"
                    class="w-full p-2 border-b border-gray-300 focus:border-[#cba157] focus:border-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    bind:value={userData.phone}
                    placeholder="Enter your phone number"
                    class="w-full p-2 border-b border-gray-300 focus:border-[#cba157] focus:border-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label for="address" class="block text-sm font-medium">Address</label>
                  <input
                    type="text"
                    id="address"
                    bind:value={userData.address}
                    placeholder="Enter your address"
                    class="w-full p-2 border-b border-gray-300 focus:border-[#cba157] focus:border-2 focus:outline-none"
                  />
                </div>
                <button type="submit" class="bg-[#cba157] text-white p-2 rounded hover:bg-black transition-all duration-500 w-full">
                  Submit
                </button>
              </form>
            </div>
          {:else if selectedBox === 'orders'}
            {#if orders.length === 0}
              <p class="text-lg text-center">No orders registered yet.</p>
            {:else}
              <div class="w-full">
                <h2 class="text-xl font-semibold mb-4 text-center">Your Orders</h2>
                {#each orders as order}
                  <div class="p-4 mb-2 border rounded">
                    <p>Order ID: {order.id}</p>
                    <p>Status: {order.status}</p>
                  </div>
                {/each}
              </div>
            {/if}
          {:else if selectedBox === 'favorites'}
            {#if favorites.length === 0}
              <p class="text-lg text-center">No favorite products yet.</p>
            {:else}
              <div class="w-full">
                <h2 class="text-xl font-semibold mb-4 text-center">Favorite Products</h2>
                {#each favorites as product}
                  <div class="p-4 mb-2 border rounded">
                    <p>Product: {product.name}</p>
                    <p>Price: ${product.price}</p>
                  </div>
                {/each}
              </div>
            {/if}
          {/if}
        </div>
      {/if}
    </div>
  </div>
{/if}

<!-- Logout Popup -->
{#if showLogoutPopup}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <p class="text-lg mb-4">Are you sure you want to log out?</p>
      <div class="flex space-x-4 justify-center">
        <button
          class="w-24 h-10 flex items-center justify-center border rounded hover:bg-gray-200 transition-all duration-500 text-sm font-medium"
          on:click={() => (showLogoutPopup = false)}
        >
          No
        </button>
        <button
          class="w-24 h-10 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-500 text-sm font-medium"
          on:click={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(body) {
    margin: 0;
    font-family: Arial, sans-serif;
  }
</style>