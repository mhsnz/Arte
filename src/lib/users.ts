export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Simple User' | 'Vendor';
  username?: string;
  password?: string;
  createdAt: string;
}

export interface DeletedUser extends User {
  deletedAt: string;
}

export let users: User[] = [
  {
    id: '1',
    name: 'Mohsen',
    email: 'mohsen@example.com',
    phone: '09123456789',
    role: 'Admin',
    username: 'mhsnz',
    password: 'zxqpjaizy',
    createdAt: '2025-07-01T10:00:00Z'
  }
];

export let deletedUsers: DeletedUser[] = [];

export function addUser(user: User) {
  users.push(user);
}

export function updateUser(updatedUser: User) {
  users = users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
}

export function deleteUser(userId: string) {
  const user = users.find((u) => u.id === userId);
  if (user) {
    deletedUsers.push({ ...user, deletedAt: new Date().toISOString() });
    users = users.filter((u) => u.id !== userId);
  }
}

export function restoreUser(userId: string) {
  const user = deletedUsers.find((u) => u.id === userId);
  if (user) {
    users.push({ ...user, id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, username: user.username, password: user.password, createdAt: user.createdAt });
    deletedUsers = deletedUsers.filter((u) => u.id !== userId);
  }
}