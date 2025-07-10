<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Icon from '@iconify/svelte';

  // Exhibition data with JPG files from static
  const exhibits = [
    { 
      image: '/exhibit1.jpg', 
      title: 'Contemporary Art Exhibition', 
      date: 'June 15, 2025', 
      description: 'This exhibition showcases a remarkable collection of works by contemporary artists, utilizing innovative and creative techniques to narrate stories of culture, history, and identity. Each piece has been carefully selected to reflect the diversity and richness of modern art. Visitors can engage closely with paintings, sculptures, and creative installations, each uniquely addressing contemporary social and cultural issues. This exhibition offers an opportunity to reflect on modern aesthetics and their connection to longstanding traditions. The artists represented here draw inspiration from a variety of sources, blending traditional motifs with cutting-edge approaches to create thought-provoking works that challenge conventional perspectives. From abstract expressions to realistic portrayals, the exhibition invites visitors to explore the multifaceted nature of contemporary creativity and its impact on shaping cultural dialogues in today’s world.' 
    },
    { 
      image: '/exhibit2.jpg', 
      title: 'Nature Photography Exhibition', 
      date: 'June 16, 2025', 
      description: 'This exhibition is dedicated to photography capturing the stunning landscapes of nature. From towering mountains to endless deserts, each photograph tells a story of natural wonders and the importance of environmental preservation. Advanced photography techniques and the use of light and color create a breathtaking visual experience for visitors. This exhibition is not only a visual journey through diverse landscapes but also a call to protect our precious natural heritage. The photographers featured have traveled to remote corners of the world, capturing fleeting moments of beauty that highlight the fragility and resilience of our planet. Each image serves as both an artistic expression and a poignant reminder of the urgent need to address environmental challenges, encouraging viewers to consider their role in preserving these natural wonders for future generations.The Handicrafts Exhibition provides an opportunity to explore traditional arts passed down through generations. This exhibition features a collection of handmade works, including carpet weaving, pottery, enameling, and marquetry. Each piece reflects the skill and creativity of artisans, preserving cultural and historical narratives through intricate designs and vibrant colors. Visiting this exhibition is a journey into the heart of traditional craftsmanship, telling stories of the past and present. The artisans showcased have dedicated years to mastering their craft, often using techniques that have remained unchanged for centuries. This exhibition not only celebrates their skill but also highlights the cultural significance of these art forms, offering visitors a chance to appreciate the labor and love embedded in each piece and to connect with the rich heritage they represent.' 
    },
    { 
      image: '/exhibit3.jpg', 
      title: 'Handicrafts Exhibition', 
      date: 'June 17, 2025', 
      description: 'The Handicrafts Exhibition provides an opportunity to explore traditional arts passed down through generations. This exhibition features a collection of handmade works, including carpet weaving, pottery, enameling, and marquetry. Each piece reflects the skill and creativity of artisans, preserving cultural and historical narratives through intricate designs and vibrant colors. Visiting this exhibition is a journey into the heart of traditional craftsmanship, telling stories of the past and present. The artisans showcased have dedicated years to mastering their craft, often using techniques that have remained unchanged for centuries. This exhibition not only celebrates their skill but also highlights the cultural significance of these art forms, offering visitors a chance to appreciate the labor and love embedded in each piece and to connect with the rich heritage they represent.' 
    },
    { 
      image: '/exhibit4.jpg', 
      title: 'Digital Art Exhibition', 
      date: 'June 18, 2025', 
      description: 'This exhibition is dedicated to digital art, showcasing the latest works by artists at the intersection of technology and creativity. From 3D animations to virtual reality pieces, this collection pushes the boundaries of artistic expression in the digital age. Artists utilize cutting-edge tools to create immersive and interactive experiences for visitors. This exhibition offers a glimpse into the future of art, exploring the impact of technology on creative expression with inspiring and innovative works. The pieces on display challenge traditional notions of art, inviting visitors to engage with dynamic and interactive installations that respond to their presence. By blending technology with artistic vision, these works explore new possibilities for storytelling and expression, making this exhibition a must-see for those interested in the evolving landscape of digital creativity.' 
    }
  ];

  let currentSlide = 0;
  let isPopupOpen = false;
  let selectedExhibit = null;

  onMount(() => {
    console.log('Exhibition component mounted');
    const interval = setInterval(() => {
      if (window.innerWidth < 768) currentSlide = (currentSlide + 1) % exhibits.length;
    }, 5000);
    return () => clearInterval(interval);
  });

  function goToSlide(index: number) {
    currentSlide = index;
  }

  function openPopup(exhibit: any) {
    selectedExhibit = exhibit;
    isPopupOpen = true;
    console.log('Popup opened for:', exhibit.title);
  }

  function closePopup() {
    isPopupOpen = false;
    selectedExhibit = null;
    console.log('Popup closed');
  }
</script>

<!-- Main exhibition section -->
<div class="py-8">
  <h2 class="text-3xl font-cursive text-center mb-6 italic">Exhibition</h2>
  <!-- Desktop: 4-column grid -->
  <div class="hidden md:grid md:grid-cols-4 gap-4 max-w-7xl mx-auto px-4">
    {#each exhibits as exhibit}
      <div class="cursor-pointer" on:click={() => openPopup(exhibit)}>
        <img src={exhibit.image} alt={exhibit.title} class="w-64 h-64 object-cover" />
        <h3 class="text-lg font-semibold mt-2">{exhibit.title}</h3>
        <p class="text-sm text-gray-500">{exhibit.date}</p>
      </div>
    {/each}
  </div>

  <!-- Mobile: Slider -->
  <div class="md:hidden relative w-full overflow-hidden" style="height: 70vh; max-height: 500px;">
    {#each exhibits as exhibit, index}
      {#if index === currentSlide}
        <div class="absolute inset-0" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }} on:click={() => openPopup(exhibit)}>
          <div class="w-full h-full flex flex-col items-center justify-center">
            <img src={exhibit.image} alt={exhibit.title} class="w-64 h-64 object-cover" />
            <h3 class="text-lg font-semibold mt-2 text-center">{exhibit.title}</h3>
            <p class="text-sm text-gray-500 text-center">{exhibit.date}</p>
          </div>
        </div>
      {/if}
    {/each}
    <div class="absolute bottom-2 left-0 right-0 flex justify-center space-x-4 px-4">
      <button on:click={() => goToSlide((currentSlide - 1 + exhibits.length) % exhibits.length)} class="text-white bg-[#d49f4c] p-2 rounded-full">
        <Icon icon="mdi:chevron-left" class="w-6 h-6" />
      </button>
      <button on:click={() => goToSlide((currentSlide + 1) % exhibits.length)} class="text-white bg-[#d49f4c] p-2 rounded-full">
        <Icon icon="mdi:chevron-right" class="w-6 h-6" />
      </button>
    </div>
  </div>
</div>

<!-- Popup overlay -->
{#if isPopupOpen}
  <div class="fixed inset-0 bg-[#d49f4c] bg-opacity-90 z-50 overflow-y-auto" on:click={closePopup}>
    <!-- Desktop: Original layout -->
    <div class="hidden md:flex flex-row items-start relative max-w-5xl w-full min-h-[600px] mx-auto my-8" on:click|stopPropagation>
      <img src={selectedExhibit.image} alt={selectedExhibit.title} class="w-96 h-96 object-cover z-10" />
      <div class="absolute top-8 right-8 z-20">
        <h3 class="text-3xl font-cursive italic text-white mb-2">{selectedExhibit.title}</h3>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full z-20 mt-[16rem] ml-[-2rem]">
        <div class="p-4 bg-gray-100 text-left">
          <p class="text-gray-700">{selectedExhibit.description}</p>
        </div>
      </div>
      <button on:click={closePopup} class="absolute top-4 right-4 text-white hover:text-gray-200 z-30">
        <Icon icon="mdi:close" class="w-8 h-8" />
      </button>
    </div>
    <!-- Mobile: Scrollable popup -->
    <div class="md:hidden max-w-3xl w-full min-h-[600px] mx-auto my-8 bg-white rounded-lg shadow-lg" on:click|stopPropagation>
      <div class="relative p-6">
        <button on:click={closePopup} class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <Icon icon="mdi:close" class="w-6 h-6" />
        </button>
        <div class="flex justify-center mb-4">
          <img src={selectedExhibit.image} alt={selectedExhibit.title} class="w-64 h-64 object-cover" />
        </div>
        <div class="p-4 bg-gray-100 text-left">
          <h3 class="text-xl font-bold mb-2">{selectedExhibit.title}</h3>
          <p class="text-gray-700">{selectedExhibit.description}</p>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  @media (min-width: 768px) {
    .md:grid-cols-4 div {
      cursor: pointer;
    }
  }

  /* Style for cursive font */
  .font-cursive {
    font-family: 'cursive';
    font-size: 3.5rem;
    text-align: center;
  }

  /* Responsiveness for mobile */
  @media (max-width: 768px) {
    .w-64 {
      width: 16rem;
      height: 16rem;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  }
</style>