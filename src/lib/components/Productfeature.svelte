<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import type { ComponentType } from 'svelte';

  // Cast Icon to Svelte ComponentType to avoid TypeScript error
  const IconComponent: ComponentType = Icon as ComponentType;

  const products = [
    { id: 1, image: '/product1.jpg', name: 'Product 1', price: 29.99, description: 'High-quality material with modern design.', link: '/products/1' },
    { id: 2, image: '/product2.jpg', name: 'Product 2', price: 39.99, description: 'Durable and stylish for everyday use.', link: '/products/2' },
    { id: 3, image: '/product3.jpg', name: 'Product 3', price: 49.99, description: 'Eco-friendly with unique patterns.', link: '/products/3' },
    { id: 4, image: '/product4.jpg', name: 'Product 4', price: 59.99, description: 'Luxury edition with premium finish.', link: '/products/4' },
    { id: 5, image: '/product5.jpg', name: 'Product 5', price: 69.99, description: 'Innovative technology integrated.', link: '/products/5' },
    { id: 6, image: '/product6.jpg', name: 'Product 6', price: 79.99, description: 'Handcrafted with attention to detail.', link: '/products/6' },
    { id: 7, image: '/product7.jpg', name: 'Product 7', price: 89.99, description: 'Limited edition collector’s item.', link: '/products/7' }
  ];

  // Duplicate products to create a seamless loop
  const loopedProducts = [...products, ...products];

  let currentIndex = 0;
  let slidesPerView = 4; // Default for large screens

  // Reactive statement to update slidesPerView based on window width
  $: slidesPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 4;

  // Update slidesPerView on window resize
  onMount(() => {
    console.log('Product feature component mounted');
    const updateSlidesPerView = () => {
      slidesPerView = window.innerWidth < 768 ? 1 : 4;
    };
    window.addEventListener('resize', updateSlidesPerView);

    // Auto-slide every 5 seconds
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    // Log image paths for debugging
    products.forEach(product => {
      console.log(`Image path for ${product.name}: ${product.image}`);
    });

    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
      clearInterval(interval);
    };
  });

  function nextSlide() {
    currentIndex++;
    // Seamless loop: reset to product 1 after showing last slide (products 4-7 in desktop)
    if (currentIndex >= products.length - slidesPerView + 1) {
      currentIndex = 0;
      const flexContainer = document.querySelector('.flex') as HTMLElement;
      flexContainer.style.transition = 'none';
      flexContainer.style.transform = `translateX(0%)`;
      setTimeout(() => {
        flexContainer.style.transition = 'transform 0.5s ease-in-out';
      }, 0);
    }
  }

  function prevSlide() {
    currentIndex--;
    // Seamless loop: reset to last slide (products 4-7 in desktop) before product 1
    if (currentIndex < 0) {
      currentIndex = products.length - slidesPerView;
      const flexContainer = document.querySelector('.flex') as HTMLElement;
      flexContainer.style.transition = 'none';
      flexContainer.style.transform = `translateX(-${(currentIndex * 100) / slidesPerView}%)`;
      setTimeout(() => {
        flexContainer.style.transition = 'transform 0.5s ease-in-out';
      }, 0);
    }
  }

  // Handle image load error
  function handleImageError(event: Event) {
    console.error(`Failed to load image: ${(event.target as HTMLImageElement).src}`);
    (event.target as HTMLImageElement).src = '/static/placeholder.jpg'; // Fallback to placeholder
  }
</script>

<div class="container mx-auto py-12 px-4 bg-gray-100">
  <div class="relative">
    <div class="overflow-hidden">
      <div class="flex transition-transform duration-500 ease-in-out" style="transform: translateX(-{(currentIndex * 100) / slidesPerView}%)">
        {#each loopedProducts as product, i}
          <a href={product.link} class="flex-none p-6 w-full md:w-[calc(25%-0.5rem)] min-w-[220px] max-w-full bg-white rounded-lg hover:bg-gray-50 border-2 border-[#d49f4c] hover:border-black transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl md:ml-2 group">
            <div class="relative overflow-hidden rounded-md">
              <img
                src={product.image}
                alt={product.name}
                class="w-[1200px] h-[1491px] max-w-full max-h-[400px] object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110"
                on:error={handleImageError}
              />
            </div>
            <h3 class="text-xl font-semibold mt-4 text-gray-800 text-center">{product.name}</h3>
            <div class="flex justify-between items-center mt-6 mr-4 mb-4">
              <button class="text-gray-500 hover:text-[#d49f4c] relative group/button transition-colors duration-300 ease-in-out">
                <svelte:component this={IconComponent} icon="mdi:cart" class="w-7 h-7" />
                <span class="absolute hidden group-hover/button:block bg-[#d49f4c] text-white text-sm px-3 py-1 rounded -mt-10 left-8 w-32 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 ease-in-out">Add to Basket</span>
              </button>
              <span class="text-[#2d3748] font-bold text-lg">${product.price.toFixed(2)}</span>
            </div>
          </a>
        {/each}
      </div>
    </div>

    <button on:click={prevSlide} class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#d49f4c] text-white p-3 rounded-full hover:bg-[#b37a38] transition-colors duration-200">
      <svelte:component this={IconComponent} icon="mdi:chevron-left" class="w-6 h-6" />
    </button>
    <button on:click={nextSlide} class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#d49f4c] text-white p-3 rounded-full hover:bg-[#b37a38] transition-colors duration-200">
      <svelte:component this={IconComponent} icon="mdi:chevron-right" class="w-6 h-6" />
    </button>
  </div>
</div>

<style>
  a {
    cursor: pointer; /* تغییر نشانگر ماوس به pointer */
    text-decoration: none; /* حذف خط زیر لینک */
  }

  @media (max-width: 767px) {
    .flex > a {
      margin-left: 0;
      margin-right: 0;
    }
  }
</style>