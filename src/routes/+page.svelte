<!-- Import components from lib/components directory -->
<script lang="ts">
  import Slider from '$lib/components/Slider.svelte';
//   import SqCat from '$lib/components/SqCat.svelte';
  import Exhibition from '$lib/components/exhibition.svelte';
  import Clumn from '$lib/components/Clumn.svelte';
  import Productfeature from '$lib/components/Productfeature.svelte';
  import Blogfeature from '$lib/components/Blogfeature.svelte';

  // Type the Exhibition component
  import type { SvelteComponent } from 'svelte';
  const ExhibitionComponent: typeof Exhibition = Exhibition;

  // Debug import
  console.log('Exhibition component imported:', ExhibitionComponent !== undefined);
</script>

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