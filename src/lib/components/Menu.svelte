<script lang="ts">
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
</script>

<div class="w-64 bg-gray-800 min-h-screen flex flex-col p-4">
  <div class="flex justify-end mb-4">
    <a
      href="/Admin/Logout"
      class="flex items-center justify-center w-10 h-10 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
      title="Logout"
    >
      <Icon icon="mdi:logout" width="24" height="24" class="text-white" />
    </a>
  </div>
  <ul class="space-y-2 flex-1 flex flex-col justify-center">
    <li>
      <a
        href="/Admin/product"
        class="block p-2 rounded text-white hover:bg-blue-600 hover:text-white transition-colors {$page.url.pathname === '/Admin/product' ? 'bg-blue-600 text-white' : ''}"
      >
        Product
      </a>
    </li>
    <li>
      <a
        href="/Admin/blog"
        class="block p-2 rounded text-white hover:bg-blue-600 hover:text-white transition-colors {$page.url.pathname === '/Admin/blog' ? 'bg-blue-600 text-white' : ''}"
      >
        Blog
      </a>
    </li>
    <li>
      <a
        href="/Admin/order"
        class="block p-2 rounded text-white hover:bg-blue-600 hover:text-white transition-colors {$page.url.pathname === '/Admin/order' ? 'bg-blue-600 text-white' : ''}"
      >
        Order
      </a>
    </li>
    <li>
      <a
        href="/Admin/user"
        class="block p-2 rounded text-white hover:bg-blue-600 hover:text-white transition-colors {$page.url.pathname === '/Admin/user' ? 'bg-blue-600 text-white' : ''}"
      >
        User
      </a>
    </li>
    <li>
      <a
        href="/Admin/media"
        class="block p-2 rounded text-white hover:bg-blue-600 hover:text-white transition-colors {$page.url.pathname === '/Admin/media' ? 'bg-blue-600 text-white' : ''}"
      >
        Media
      </a>
    </li>
  </ul>
</div>