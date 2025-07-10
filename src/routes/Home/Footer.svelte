<script lang="ts">
    import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';
    import type { ComponentType } from 'svelte';

    // Cast Icon to Svelte ComponentType to avoid TypeScript error
    const IconComponent: ComponentType = Icon as ComponentType;

    let isMounted = false;

    onMount(() => {
      isMounted = true;
      console.log('Footer component mounted');
    });

    // Menu items (example, adjust as needed)
    const menuItems = ['Home', 'About', 'Gallery', 'Blog', 'Contact'];
</script>

<footer class="bg-black text-white py-8 px-4">
    <!-- Menu Section -->
    <nav class="mb-8">
      <ul class="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-6 text-sm md:text-base word-break">
        {#each menuItems as item}
          <li class="{item === 'Contact' ? 'col-span-2 text-center md:col-span-1 md:text-left' : 'text-center md:text-left'}">
            <a href="/{item.toLowerCase()}" class="hover:text-[#d49f4c] transition-colors duration-200">{item}</a>
          </li>
        {/each}
      </ul>
    </nav>

    <!-- Bottom Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
      <!-- Social Icons -->
      <div class="flex flex-col items-center">
        <div class="hidden md:block text-lg font-semibold mb-2 word-break">Follow Us</div>
        <div class="flex flex-row justify-center items-center w-full gap-4">
          <a href="#" aria-label="Pinterest"><svelte:component this={IconComponent} icon="mdi:pinterest" class="w-6 h-6 md:hover:text-[#d49f4c] md:hover:scale-110 md:transition-all md:duration-200" /></a>
          <a href="#" aria-label="Twitter"><svelte:component this={IconComponent} icon="mdi:twitter" class="w-6 h-6 md:hover:text-[#d49f4c] md:hover:scale-110 md:transition-all md:duration-200" /></a>
          <a href="#" aria-label="Instagram"><svelte:component this={IconComponent} icon="mdi:instagram" class="w-6 h-6 md:hover:text-[#d49f4c] md:hover:scale-110 md:transition-all md:duration-200" /></a>
          <a href="#" aria-label="Facebook"><svelte:component this={IconComponent} icon="mdi:facebook" class="w-6 h-6 md:hover:text-[#d49f4c] md:hover:scale-110 Ascending md:transition-all md:duration-200" /></a>
        </div>
      </div>

      <!-- Latin Text -->
      <div class="word-break">
        <p class="text-sm leading-relaxed">
          Morbi odio eros, volutpat ut pharetra vitae, lobortis sed nibh. Donec sed odio operae, eu vulputate felis rhoncus. Quo usque tandem abutere, Catilina, patientia nostra? Etiam habebis sem dicantur.
        </p>
      </div>

      <!-- Gallery Info -->
      <div class="word-break">
        <p class="text-sm">
          Art Gallery WP<br />
          36 Battersea Square, London<br />
          Tel: 01624-621440
        </p>
      </div>

      <!-- Terms -->
      <div class="word-break">
        <p class="text-sm">
          Terms & conditions<br />
          Privacy policy & cookies<br />
          Terms of use
        </p>
      </div>
    </div>
</footer>

<style>
    .container {
      max-width: 1280px;
    }
    .word-break {
      word-break: break-word;
    }
    @media (max-width: 767px) {
      .grid-cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .flex {
        flex-direction: row;
        text-align: center;
      }
      .grid:not(.grid-cols-2) {
        grid-template-columns: 1fr;
      }
      .gap-6 {
        gap: 3rem;
      }
    }
</style>