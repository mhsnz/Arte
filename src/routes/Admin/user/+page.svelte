<script lang="ts">
  import Icon from '@iconify/svelte';
  import Menu from '$lib/components/Menu.svelte';
  import { onMount } from 'svelte';
  import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
  import { db } from '$lib/firebase';

  interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    userType: 'vendor' | 'customer' | 'Admin';
    username?: string;
    password?: string;
    createdAt: string;
  }

  interface DeletedUser extends User {
    deletedAt: string;
  }

  let users: User[] = [];
  let deletedUsers: DeletedUser[] = [];
  let showAddUserPopup = false;
  let showDeletedUsersPopup = false;
  let showEditPopup = false;
  let showDeletePopup = false;
  let editedUser: User | null = null;
  let deleteUserId: string | null = null;
  let newUser: Partial<User> = { name: '', email: '', phone: '', userType: 'customer', username: '', password: '' };
  let newUserType: User['userType'] = 'customer';

  onMount(async () => {
    await loadUsers();
    await loadDeletedUsers();
  });

  async function loadUsers() {
    const querySnapshot = await getDocs(collection(db, 'users'));
    users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User)).filter(u => !u.deletedAt);
    console.log('Loaded users:', users); // دیباگ
  }

  async function loadDeletedUsers() {
    const querySnapshot = await getDocs(collection(db, 'users'));
    deletedUsers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DeletedUser)).filter(u => u.deletedAt);
    console.log('Loaded deleted users:', deletedUsers); // دیباگ
  }

  function handleUserTypeChange(event: Event) {
    newUserType = (event.target as HTMLSelectElement).value as User['userType'];
  }

  async function submitAddUser() {
    if (!newUser.name || !newUser.email || !newUser.phone) {
      console.error('Name, email, and phone are required');
      return;
    }
    const userId = doc(collection(db, 'users')).id;
    await setDoc(doc(db, 'users', userId), {
      id: userId,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      userType: newUserType,
      username: newUserType === 'Admin' ? newUser.username : null,
      password: newUserType === 'Admin' ? newUser.password : null,
      createdAt: new Date().toISOString(),
    });
    await loadUsers();
    showAddUserPopup = false;
    newUser = { name: '', email: '', phone: '', userType: 'customer', username: '', password: '' };
    newUserType = 'customer';
  }

  async function openEditPopup(user: User) {
    editedUser = { ...user };
    newUserType = user.userType;
    showEditPopup = true;
  }

  async function submitEdit() {
    if (editedUser && !editedUser.name && !editedUser.email && !editedUser.phone) {
      console.error('Name, email, and phone are required');
      return;
    }
    await updateDoc(doc(db, 'users', editedUser.id), {
      name: editedUser.name,
      email: editedUser.email,
      phone: editedUser.phone,
      userType: newUserType,
      username: newUserType === 'Admin' ? editedUser.username : null,
      password: newUserType === 'Admin' ? editedUser.password : null,
    });
    await loadUsers();
    showEditPopup = false;
    editedUser = null;
  }

  async function openDeletePopup(userId: string) {
    deleteUserId = userId;
    showDeletePopup = true;
  }

  async function confirmDelete() {
    if (deleteUserId) {
      await updateDoc(doc(db, 'users', deleteUserId), { deletedAt: serverTimestamp() });
      await loadUsers();
      await loadDeletedUsers();
    }
    showDeletePopup = false;
    deleteUserId = null;
  }

  async function restoreUser(userId: string) {
    const user = deletedUsers.find(u => u.id === userId);
    if (user) {
      await updateDoc(doc(db, 'users', userId), { deletedAt: null });
      await loadUsers();
      await loadDeletedUsers();
    }
  }
</script>

<div class="flex h-screen bg-[#121827]">
  <div class="w-64">
    <Menu />
  </div>
  <div class="flex-1 p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-blue-400">Users Page</h1>
      <div>
        <button
          on:click={() => (showAddUserPopup = true)}
          class="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors mr-2"
        >
          Add User
        </button>
        <button
          on:click={() => (showDeletedUsersPopup = true)}
          class="py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
        >
          Deleted Users
        </button>
      </div>
    </div>
    {#each users as user (user.id)}
      <div class="bg-gray-700 p-4 rounded-lg flex items-center justify-between mb-2">
        <div class="flex-1 text-white">{user.name}</div>
        <div class="flex-1 text-white">{user.userType}</div>
        <div class="flex-1 text-white">{new Date(user.createdAt).toLocaleDateString()}</div>
        <div class="flex gap-2">
          <button
            on:click={() => openEditPopup(user)}
            class="text-blue-400 hover:text-blue-300"
            title="Edit User"
          >
            <Icon icon="mdi:pencil" width="24" height="24" />
          </button>
          <button
            on:click={() => openDeletePopup(user.id)}
            class="text-red-400 hover:text-red-300"
            title="Delete User"
          >
            <Icon icon="mdi:delete" width="24" height="24" />
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>

{#if showAddUserPopup}
  <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
      <button
        on:click={() => (showAddUserPopup = false)}
        class="absolute top-2 right-2 text-white hover:text-gray-300"
      >
        <Icon icon="mdi:close" width="24" height="24" />
      </button>
      <h2 class="text-2xl font-bold text-blue-400 mb-4">Add User</h2>
      <div class="mb-4">
        <label class="block text-blue-400 mb-2">Name</label>
        <input
          type="text"
          bind:value={newUser.name}
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-blue-400 mb-2">Email</label>
        <input
          type="email"
          bind:value={newUser.email}
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-blue-400 mb-2">Phone</label>
        <input
          type="text"
          bind:value={newUser.phone}
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-blue-400 mb-2">User Type</label>
        <select
          bind:value={newUserType}
          on:change={handleUserTypeChange}
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        >
          <option value="vendor">Vendor</option>
          <option value="customer">Customer</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      {#if newUserType === 'Admin'}
        <div class="mb-4">
          <label class="block text-blue-400 mb-2">Username</label>
          <input
            type="text"
            bind:value={newUser.username}
            class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-blue-400 mb-2">Password</label>
          <input
            type="password"
            bind:value={newUser.password}
            class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      {/if}
      <button
        on:click={submitAddUser}
        class="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Submit
      </button>
    </div>
  </div>
{/if}

{#if showEditPopup && editedUser}
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
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-blue-400 mb-2">Email</label>
        <input
          type="email"
          bind:value={editedUser.email}
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-blue-400 mb-2">Phone</label>
        <input
          type="text"
          bind:value={editedUser.phone}
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-blue-400 mb-2">User Type</label>
        <select
          bind:value={newUserType}
          on:change={handleUserTypeChange}
          class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        >
          <option value="vendor">Vendor</option>
          <option value="customer">Customer</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      {#if newUserType === 'Admin'}
        <div class="mb-4">
          <label class="block text-blue-400 mb-2">Username</label>
          <input
            type="text"
            bind:value={editedUser.username}
            class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-blue-400 mb-2">Password</label>
          <input
            type="password"
            bind:value={editedUser.password}
            class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      {/if}
      <button
        on:click={submitEdit}
        class="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Submit
      </button>
    </div>
  </div>
{/if}

{#if showDeletePopup && deleteUserId}
  <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
      <button
        on:click={() => (showDeletePopup = false)}
        class="absolute top-2 right-2 text-white hover:text-gray-300"
      >
        <Icon icon="mdi:close" width="24" height="24" />
      </button>
      <h2 class="text-xl font-bold text-blue-400 mb-4">Are you sure?</h2>
      <p class="text-white mb-6">
        Do you want to delete {users.find((u) => u.id === deleteUserId)?.name}?
      </p>
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

{#if showDeletedUsersPopup}
  <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-gray-800 p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto relative">
      <button
        on:click={() => (showDeletedUsersPopup = false)}
        class="absolute top-2 right-2 text-white hover:text-gray-300"
      >
        <Icon icon="mdi:close" width="24" height="24" />
      </button>
      <h2 class="text-2xl font-bold text-blue-400 mb-4">Deleted Users</h2>
      {#each deletedUsers as deletedUser (deletedUser.id)}
        <div class="bg-gray-700 p-4 rounded-lg flex items-center justify-between mb-2">
          <div class="flex-1 text-white">{deletedUser.name}</div>
          <div class="flex-1 text-white">{deletedUser.userType}</div>
          <div class="flex-1 text-white">{new Date(deletedUser.deletedAt).toLocaleDateString()}</div>
          <button
            on:click={() => restoreUser(deletedUser.id)}
            class="text-green-400 hover:text-green-300"
            title="Restore User"
          >
            <Icon icon="mdi:restore" width="24" height="24" />
          </button>
        </div>
      {/each}
      {#if deletedUsers.length === 0}
        <p class="text-white">No deleted users.</p>
      {/if}
    </div>
  </div>
{/if}