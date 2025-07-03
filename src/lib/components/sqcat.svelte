<!-- Import dependencies for lifecycle and icons -->
<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte'; // Import Icon component from Iconify

  // State for touch events and current category index
  let touchStartX = 0;
  let currentIndex = 0;

  // Array of 12 category items with names and icons
  const categories = Array(12).fill(null).map((_, i) => ({
    name: `Category ${i + 1}`,
    icon: 'mdi:tag', // Use Material Design Icons tag icon
  }));

  // Calculate the number of sets for swipe navigation
  $: numSets = Math.ceil(categories.length / 2);

  // Handle touch start for swipe detection
  function handleTouchStart(event: TouchEvent) {
    touchStartX = event.touches[0].clientX;
  }

  // Handle touch end to detect swipe direction
  function handleTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < numSets - 1) {
        currentIndex += 1; // Swipe left, move to next set
      } else if (diff < 0 && currentIndex > 0) {
        currentIndex -= 1; // Swipe right, move to previous set
      }
    }
  }

  // Start rotation animation on mouse hover
  function rotateBox(event: MouseEvent, index: number) {
    const box = event.currentTarget as HTMLElement;
    if (!box.classList.contains('rotating')) {
      box.classList.add('rotating');
      box.style.animation = 'rotate 1s linear infinite';
    }
  }

  // Stop rotation animation when mouse leaves
  function stopRotate(event: MouseEvent, index: number) {
    const box = event.currentTarget as HTMLElement;
    box.classList.remove('rotating');
    box.style.animation = '';
  }
</script>

<!-- Container for category grid with responsive padding and dynamic width -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- Grid container for categories, with swipe support on mobile -->
  <div
    class="grid grid-cols-2 md:grid-cols-6 gap-4 transition-transform duration-300"
    style="transform: translateX(-{currentIndex * 100 / numSets}%)"
    on:touchstart={handleTouchStart}
    on:touchend={handleTouchEnd}
  >
    <!-- Loop through categories to create square boxes -->
    {#each categories as category, index}
      <div
        class="aspect-square flex flex-col items-center justify-center bg-[#d49f4c] text-white p-4 rounded-lg hover:bg-black transition-colors duration-300"
        on:mouseenter={(e) => rotateBox(e, index)}
        on:mouseleave={(e) => stopRotate(e, index)}
      >
        <!-- Category icon -->
        <Icon icon={category.icon} class="w-8 h-8 mb-2" />
        <!-- Category name -->
        <span class="text-sm font-medium">{category.name}</span>
      </div>
    {/each}
  </div>
</div>

<!-- Styles for rotation animation -->
<style lang="postcss">
  /* Define rotation animation for hover effect */
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Mobile-specific styles for swipeable grid */
  @media (max-width: 767px) {
    .grid > div {
      width: 50%;
    }
  }
</style>