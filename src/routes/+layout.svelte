<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  // let { children } = $props();
</script>

<div class="min-h-screen bg-white">
  <Navbar />
  <slot />
  <Footer />
</div>