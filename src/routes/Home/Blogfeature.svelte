<script lang="ts">
  import { onMount } from 'svelte';

  const blogs = [
    { id: 1, title: 'Exploring Modern Art Trends', date: 'June 25, 2025' },
    { id: 2, title: 'The Rise of Digital Painting', date: 'June 28, 2025' },
    { id: 3, title: 'History of Renaissance Masters', date: 'July 01, 2025' },
    { id: 4, title: 'Future of Creative Design', date: 'July 02, 2025' }
  ];

  let isMounted = false;

  onMount(() => {
    isMounted = true;
    console.log('Blog feature component mounted');
  });
</script>

<div class="container mx-auto py-12 px-4 bg-white">
  <h2 class="font-cursive italic text-black text-center mb-8">Blog Feature</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each blogs as blog}
      <div class="flex items-center h-24 border-t-2 border-r-2 border-b-2 border-gray-300 rounded-r-lg overflow-hidden group relative hover:cursor-pointer">
        <img src={`/blog${blog.id}.jpg`} alt={blog.title} class="w-3/12 h-full object-cover md:w-3/12" />
        <div class="w-9/12 p-2 md:w-9/12">
          <h3 class="text-md font-semibold text-gray-700 line-clamp-2">{blog.title}</h3>
          <p class="text-xs text-gray-500">{blog.date}</p>
        </div>
        <!-- Animated border for 75% of the box width, excluding left border on hover -->
        <span class="absolute top-0 right-0 w-9/12 h-full border-2 border-transparent group-hover:border-t-yellow-500 group-hover:border-r-yellow-500 group-hover:border-b-yellow-500 group-hover:border-l-0 group-hover:animate-borderDraw transition-colors duration-300 pointer-events-none md:w-9/12"></span>
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    max-width: 1280px;
  }
  .font-bold {
    font-family: 'Dancing Script', cursive;
  }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .font-cursive {
    font-family: 'cursive';
    font-size: 3.5rem;
    text-align: center;
  }
  /* Animation for border */
  @keyframes borderDraw {
    0% {
      border-color: transparent;
      border-width: 2px;
      clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    }
    25% {
      border-top-color: #d4af37; /* Golden color for top */
      border-right-color: #d4af37; /* Golden color for right */
      border-bottom-color: #d4af37; /* Golden color for bottom */
      border-left-color: transparent; /* No left border */
      clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    }
    50% {
      border-top-color: #d4af37;
      border-right-color: #d4af37;
      border-bottom-color: #d4af37;
      border-left-color: transparent;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
    75% {
      border-top-color: #d4af37;
      border-right-color: #d4af37;
      border-bottom-color: #d4af37;
      border-left-color: transparent;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
    100% {
      border-top-color: #d4af37;
      border-right-color: #d4af37;
      border-bottom-color: #d4af37;
      border-left-color: transparent;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }

  .group:hover .animate-borderDraw {
    animation: borderDraw 0.6s ease-in-out forwards;
  }

  @media (max-width: 767px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .h-24 {
      height: auto;
    }
    .flex {
      flex-direction: column;
      height: auto;
    }
    img {
      @apply w-full;
      height: 150px;
    }
    .p-2 {
      @apply w-full;
    }
    .absolute.w-9\/12 {
      @apply w-full; /* Adjust the width of the animated span in mobile view */
    }
  }
</style>