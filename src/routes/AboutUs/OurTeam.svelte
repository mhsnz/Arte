<script lang="ts">
  // Define team member data
  const teamMembers = [
    { name: "John Doe", role: "Lead Artist", image: "/team1.jpg" },
    { name: "Jane Smith", role: "Creative Director", image: "/team2.jpg" },
    { name: "Alex Brown", role: "Curator", image: "/team3.jpg" },
    { name: "Emily Davis", role: "Marketing Specialist", image: "/team4.jpg" },
  ];
</script>

<!-- Team Section -->
<section class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
  <!-- Centered Title -->
  <h2 class="text-4xl font-bold italic text-gray-900 text-center mb-12">Our Team</h2>

  <!-- Desktop: 4-column grid, Mobile: Slider -->
  <div class="team-slider overflow-x-auto lg:overflow-x-hidden snap-x snap-mandatory flex scrollbar-hide">
    {#each teamMembers as member}
      <div class="team-member snap-center flex-shrink-0 w-full lg:w-full flex flex-col items-center mb-8 lg:mb-0 px-4">
        <!-- Team Member Image with Border -->
        <img
          src={member.image}
          alt={member.name}
          class="w-40 h-40 rounded-full border-4 border-black hover:border-yellow-500 object-cover transition-colors duration-300"
        />
        <!-- Name and Role -->
        <h3 class="text-xl font-semibold text-gray-900 mt-4 text-center">{member.name}</h3>
        <p class="text-gray-600 text-center">{member.role}</p>
      </div>
    {/each}
  </div>
</section>

<style>
    .font-bold {
        font-family: 'cursive';
        font-size: 3.5rem;
    }
  /* Hide scrollbar for slider on mobile */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Ensure smooth snapping for slider */
  .team-slider {
    display: flex;
    flex-direction: row;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    gap: 1rem; /* Add gap between slides */
  }

  /* Desktop layout */
  @media (min-width: 1024px) {
    .team-slider {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }
    .team-member {
      min-width: auto;
      padding: 0;
    }
  }
</style>