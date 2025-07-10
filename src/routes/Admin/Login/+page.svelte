<script lang="ts">
  import { enhance } from '$app/forms';
  export let data: { error?: string };
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-900">
  <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
    <h1 class="text-2xl font-bold text-blue-400 mb-6 text-center">Admin Login</h1>
    <form method="POST" use:enhance>
      <div class="mb-4">
        <label for="username" class="block text-blue-400 mb-2">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          class="w-full p-2 rounded bg-gray-700 text-blue-200 border border-gray-600 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-blue-400 mb-2">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          class="w-full p-2 rounded bg-gray-700 text-blue-200 border border-gray-600 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      {#if data.error}
        <p class="text-red-500 mb-4">{data.error}</p>
      {/if}
      <button
        type="submit"
        class="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors cursor-pointer"
      >
        Login
      </button>
    </form>
  </div>
</div>