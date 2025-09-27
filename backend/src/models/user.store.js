import { v4 as uuidv4 } from 'uuid';

// Seed demo users for agent and admin login
const seedUsers = [
  {
    id: uuidv4(),
    email: 'agent@example.gov',
    phone: '+10000000001',
    password: 'agent123', // demo only
    role: 'agent',
    name: 'Agent Alice'
  },
  {
    id: uuidv4(),
    email: 'admin@example.gov',
    phone: '+10000000002',
    password: 'admin123', // demo only
    role: 'admin',
    name: 'Admin Bob'
  }
];

export const usersStore = new Map(seedUsers.map(u => [u.email, u]));

export function findUserByEmail(email) {
  return usersStore.get(email);
}

export function addUser(user) {
  usersStore.set(user.email, user);
  return user;
}
