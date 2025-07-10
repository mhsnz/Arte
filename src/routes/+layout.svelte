<script lang="ts">
  import '../app.css';
  import Navbar from './Home/Navbar.svelte';
  import Footer from './Home/Footer.svelte';
  // let { children } = $props();
</script>

<div class="min-h-screen bg-white">
  <Navbar />
  <slot />
  <Footer />
</div>