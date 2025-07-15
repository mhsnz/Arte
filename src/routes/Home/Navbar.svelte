<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import Icon from '@iconify/svelte';
  import { user } from '$lib/authStore';

  let isMenuOpen = false;
  let isSearchOpen = false;

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Product Categories', href: '/products' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/ContactUs' },
    { name: 'About Us', href: '/AboutUs' },
  ];

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  function toggleSearch() {
    isSearchOpen = !isSearchOpen;
  }

  function getUserLink() {
    return $user ? '/Dashboard' : '/Registration';
  }
</script>

<nav class="bg-white text-black sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center h-16">
      <!-- Mobile menu button section (left) -->
      <div class="md:hidden ml-0">
        <button on:click={toggleMenu} class="p-2 rounded-md hover:bg-gray-800 focus:outline-none">
          <Icon icon={isMenuOpen ? 'mdi:close' : 'mdi:menu'} class="w-6 h-6" />
        </button>
      </div>

      <!-- Logo section (moved to right) -->
      <div class="flex-shrink-0 ml-auto">
        <a href="/">
          <!-- Logo image -->
          <img src="icon.jpg" alt="Logo" class="h-11" />
        </a>
      </div>

      <!-- Centered menu for desktop, hidden on mobile -->
      <div class="flex-1 text-center hidden md:flex justify-center space-x-4">
        {#each navItems as item}
          <a href={item.href} class="hover:text-[#d49f4c] transition-colors px-3 py-2 rounded-md text-sm font-medium">
            {item.name}
          </a>
        {/each}
      </div>

      <!-- Icons and mobile button on the right for desktop -->
      <div class="flex items-center space-x-4 md:space-x-reverse">
        <!-- Icons for desktop (User and Search) -->
        <div class="hidden md:flex items-center space-x-4">
          <a href={getUserLink()} class="hover:text-[#d49f4c] transition-colors p-2">
            <Icon icon="mdi:account" class="w-5 h-5" />
          </a>
          <button on:click={toggleSearch} class="hover:text-[#d49f4c] transition-colors p-2">
            <Icon icon="mdi:magnify" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, shown when isMenuOpen is true -->
    {#if isMenuOpen}
      <div transition:slide={{ duration: 200 }} class="fixed inset-y-0 left-0 w-64 bg-black text-white z-50" style="direction: ltr;">
        <!-- Search input and Close button in top-right corner -->
        <div class="flex justify-between items-center px-4 pt-4">
          <input
            type="text"
            placeholder="Search..."
            class="w-full p-2 rounded-md bg-[transparent] text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button on:click={closeMenu} class="ml-2 p-2 rounded-md hover:bg-gray-800 focus:outline-none">
            <Icon icon="mdi:close" class="w-6 h-6" />
          </button>
        </div>
        <div class="px-4 mt-4">
          <a href={getUserLink()} on:click={closeMenu} class="block w-full text-center py-2 text-base font-medium bg-gray-800 hover:bg-gray-700 rounded-md">
            {$user ? 'Dashboard' : 'Login / Sign Up'}
          </a>
          <div class="border-t border-gray-600 mt-2"></div>
        </div>
        <!-- Mobile menu items container -->
        <div class="px-2 pt-4 pb-3 space-y-1 text-left">
          {#each navItems as item}
            <a href={item.href} on:click={closeMenu} class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-[#d49f4c]">
              {item.name}
            </a>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Search input, shown when isSearchOpen is true -->
    {#if isSearchOpen}
      <div transition:fade={{ duration: 200 }} class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
        <div class="bg-white p-4 rounded-lg w-11/12 max-w-md">
          <div class="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              class="w-full p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#d49f4c]"
            />
            <button on:click={toggleSearch} class="p-2 bg-gray-200 rounded-r-md hover:bg-gray-300">
              <Icon icon="mdi:close" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</nav>

<style lang="postcss">
  :global(html) {
    direction: ltr; 
  }
  @media (min-width: 768px) {
    :global(html) {
      direction: ltr; 
    }
    nav {
      direction: ltr;
    }
  }
</style>