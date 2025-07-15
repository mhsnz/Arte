<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { User } from '../../users'; // اگر users.ts رو نگه داشتی، مسیر رو تنظیم کن

  export let user: User;
  let showEditPopup = false;
  let showDeletePopup = false;
  let editedUser: User = { ...user };
  let newRole: User['role'] = user.role;

  function handleRoleChange(event: Event) {
    newRole = (event.target as HTMLSelectElement).value as User['role'];
  }

  function submitEdit() {
    const updatedUser = { ...editedUser, role: newRole };
    dispatch('updateUser', updatedUser);
    showEditPopup = false;
  }

  function confirmDelete() {
    dispatch('deleteUser', user.id);
    showDeletePopup = false;
  }

  const dispatch = createEventDispatcher();
</script>

<div class="bg-gray-700 p-4 rounded-lg flex items-center justify-between mb-2">
  <div class="flex-1 text-white">{user.name}</div>
  <div class="flex-1 text-white">{user.role}</div>
  <div class="flex-1 text-white">{new Date(user.createdAt).toLocaleDateString()}</div>
  <div class="flex gap-2">
    <button
      on:click={() => (showEditPopup = true)}
      class="text-blue-400 hover:text-blue-300"
      title="Edit User"
    >
      <Icon icon="mdi:pencil" width="24" height="24" />
    </button>
    <button
      on:click={() => (showDeletePopup = true)}
      class="text-red-400 hover:text-red-300"
      title="Delete User"
    >
      <Icon icon="mdi:delete" width="24" height="24" />
    </button>
  </div>
</div>

{#if showEditPopup}
  <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
      <button
        on:click={() => (showEditPopup = false)}
        class="absolute top-2 right-2 text-white hover:text-gray-300"
      >
        <Icon icon="mdi:close" width="24" height="24" />
      </button>
      <h2 class="text-2xl font-bold text-blue-400 mb-4">Edit User</h2>
      <div class="mb-4">
        <label class="block text-blue-400 mb-2">Name</label>
        <input
          type="text"
          bind:value={editedUser.name}
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div class="mb-4">
        <label class="block text-blue-400 mb-2">Email</label>
        <input
          type="email"
          bind:value={editedUser.email}
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div class="mb-4">
        <label class="block text-blue-400 mb-2">Phone</label>
        <input
          type="text"
          bind:value={editedUser.phone}
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div class="mb-4">
        <label class="block text-blue-400 mb-2">Role</label>
        <select
          bind:value={newRole}
          on:change={handleRoleChange}
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        >
          <option value="Admin">Admin</option>
          <option value="Simple User">Simple User</option>
          <option value="Vendor">Vendor</option>
        </select>
      </div>
      {#if newRole === 'Admin'}
        <div class="mb-4">
          <label class="block text-blue-400 mb-2">Username</label>
          <input
            type="text"
            bind:value={editedUser.username}
            class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label class="block text-blue-400 mb-2">Password</label>
          <input
            type="password"
            bind:value={editedUser.password}
            class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>
      {/if}
      <button
        on:click={submitEdit}
        class="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
      >
        Submit
      </button>
    </div>
  </div>
{/if}

{#if showDeletePopup}
  <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
      <button
        on:click={() => (showDeletePopup = false)}
        class="absolute top-2 right-2 text-white hover:text-gray-300"
      >
        <Icon icon="mdi:close" width="24" height="24" />
      </button>
      <h2 class="text-xl font-bold text-blue-400 mb-4">Are you sure?</h2>
      <p class="text-white mb-6">Do you want to delete {user.name}?</p>
      <div class="flex gap-4">
        <button
          on:click={confirmDelete}
          class="flex-1 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
        <button
          on:click={() => (showDeletePopup = false)}
          class="flex-1 py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
        >
          No
        </button>
      </div>
    </div>
  </div>
{/if}