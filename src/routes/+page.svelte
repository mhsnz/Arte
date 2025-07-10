<!-- Import components from lib/components directory -->
<script lang="ts">
  import Slider from './Home/Slider.svelte';
  import Exhibition from './Home/Exhibition.svelte';
//   import SqCat from '$lib/components/SqCat.svelte';
  import Clumn from './Home/Clumn.svelte';
  import Productfeature from './Home/Productfeature.svelte';
  import Blogfeature from './Home/Blogfeature.svelte';
  // Type the Exhibition component
  import type { SvelteComponent } from 'svelte';
  const ExhibitionComponent: typeof Exhibition = Exhibition;

  // Debug import
  console.log('Exhibition component imported:', ExhibitionComponent !== undefined);
</script>
<svelte:head>
  <title>Londeville</title>
</svelte:head>
<!-- Main page container with vertical spacing -->
<div class="space-y-12">
  <Slider />
  <!-- <SqCat /> -->
  <div>
    <svelte:component this={ExhibitionComponent} />
  </div>
  <Clumn />
  <Productfeature />
  <Blogfeature />
</div>