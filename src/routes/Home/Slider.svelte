<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let currentSlide = 0;

  const slides = [
    { image: '/slide1.jpg', alt: 'Slide 1' },
    { image: '/slide2.jpg', alt: 'Slide 2' },
    // { image: '/slide3.jpg', alt: 'Slide 3' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
    }, 5000);
    return () => clearInterval(interval);
  });
</script>

<div class="relative w-full overflow-hidden">
  <!-- تنظیم ارتفاع بر اساس صفحه -->
  <div class="w-full" style="height: 70vh; max-height: 500px;">
    {#each slides as slide, index}
      {#if index === currentSlide}
        <div class="absolute inset-0" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
          <img src={slide.image} alt={slide.alt} class="w-full h-full object-contain" />
        </div>
      {/if}
    {/each}
  </div>
  <!-- Navigation dots for manual slide control -->
  <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
    {#each slides as _, index}
      <button
        on:click={() => (currentSlide = index)}
        class:bg-[#d49f4c]={index === currentSlide}
        class:bg-gray-300={index !== currentSlide}
        class="w-3 h-3 rounded-full"
      ></button>
    {/each}
  </div>
</div>

<style>
  @media (max-width: 768px) {
    /* Mobile version setting */
    div[style] {
      height: 50vh; 
    }
    .object-contain {
      object-fit: contain;
    }
  }

  @media (min-width: 769px) {
    /*Desktop version setting*/
    div[style] {
      height: 70vh;
      max-height: 500px;
    }
  }
</style>