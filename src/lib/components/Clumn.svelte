<script lang="ts">
  import { onMount } from 'svelte';

  let isMounted = false;

  onMount(() => {
    isMounted = true;
    console.log('Column component mounted');
  });
</script>

<!-- Main section -->
<div class="container mx-auto py-10 px-4 bg-white">
  <!-- Title -->
  <h1 class="title">The Art Gallery of<br>San Francisco</h1>
  
  <!-- Content sections -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <!-- Text section 1 -->
    <div class="p-6">
      <p class="text-gray-700 text-sm leading-relaxed">
        The history of art stretches back to prehistoric times, with the earliest known examples found in the caves of Lascaux, France, dating over 17,000 years ago. These rudimentary drawings of animals and hunters laid the foundation for visual storytelling, a practice that evolved through ancient civilizations. The Egyptians perfected hieroglyphs and monumental sculptures, while the Greeks introduced idealized human forms, setting a standard for Western art. Each era brought new techniques, from the use of pigments to the mastery of marble, reflecting the societal values of its time.
      </p>
    </div>

    <!-- Text section 2 -->
    <div class="p-6">
      <p class="text-gray-700 text-sm leading-relaxed">
        The Renaissance, beginning in the 14th century, revolutionized art with a focus on humanism and realism. Artists like Leonardo da Vinci explored anatomy to create lifelike figures, while Michelangelo’s Sistine Chapel ceiling became a testament to artistic ambition. The invention of linear perspective by Brunelleschi allowed artists to depict three-dimensional space on flat canvases, a breakthrough that influenced generations. This period’s blend of science, art, and patronage from wealthy families like the Medici shaped the course of Western aesthetics for centuries to come.
      </p>
    </div>

    <!-- Text section 3 -->
    <div class="p-6">
      <p class="text-gray-700 text-sm leading-relaxed">
        The 20th century witnessed an explosion of modern art movements, from Cubism’s fragmented perspectives by Picasso to Surrealism’s dreamscapes by Dalí. Abstract Expressionism, led by Jackson Pollock, emphasized emotion over form, with artists dripping paint to create chaotic beauty. The advent of photography and film influenced painters to explore new mediums, while the digital age introduced virtual galleries. Today, art continues to evolve, blending traditional techniques with cutting-edge technology, making it a dynamic field accessible to all.
      </p>
    </div>

    <!-- Image section -->
    <div class="p-6 flex items-center justify-center">
      <img src="/clumn.jpg" alt="Artistic Showcase" class="w-full h-72 object-cover rounded-lg" />
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 1280px;
  }
  .title {
    font-size: 3.5rem;
    font-family: 'cursive';
    font-style: italic;
    text-align: center;
    margin-bottom: 2rem;
  }
  p {
    font-family: 'Times New Roman', serif;
    line-height: 1.7;
    text-align: left;
  }
  img {
    transition: transform 0.3s ease;
  }
  img:hover {
    transform: scale(1.05);
  }
</style>
