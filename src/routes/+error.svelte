<script lang="ts">
  // Define a function to handle hover state
  function handleMouseOver(event: Event) {
    const button = event.currentTarget as HTMLAnchorElement;
    button.style.backgroundColor = '#f59e0b';
    button.style.color = '#000000';
  }

  function handleMouseOut(event: Event) {
    const button = event.currentTarget as HTMLAnchorElement;
    button.style.backgroundColor = '#000000';
    button.style.color = '#ffffff';
  }
</script>

<!-- 404 Error Page -->
<section class="min-h-screen flex flex-col items-center justify-center px-4" style="background-color: #ffffff;">
  <!-- 404 Number -->
  <h1 class="text-4xl font-bold mb-4" style="font-size: 9.5rem; color: #f59e0b;">404</h1>
  
  <!-- Error Message -->
  <p class="text-lg mb-6" style="color: #4b5563;">Looks like you lost your way home</p>
  
  <!-- Back to Home Button -->
  <a
    href="/"
    class="inline-block text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-300"
    style="background-color: #000000; --tw-bg-opacity: 1; padding: 8px; width: 200px; text-align: center; "
    on:mouseover={handleMouseOver}
    on:mouseout={handleMouseOut}
  >
    Take me home
  </a>
</section>