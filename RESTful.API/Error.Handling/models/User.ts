export interface UserData {
  name: string;
  email: string;
  [key: string]: unknown;
}

export interface UserItem {
  id: number;
  name: string;
  email: string;
  [key: string]: unknown;
}

let users: UserItem[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 4, name: 'Bob Brown', email: 'bob@example.com' },
  { id: 5, name: 'Charlie Green', email: 'charlie@example.com' },
  { id: 6, name: 'Diana White', email: 'diana@example.com' },
  { id: 7, name: 'Ethan Hunt', email: 'ethan@example.com' },
  { id: 8, name: 'Fiona Gallagher', email: 'fiona@example.com' },
  { id: 9, name: 'George Clark', email: 'george@example.com' },
  { id: 10, name: 'Hannah Abbott', email: 'hannah@example.com' },
  { id: 11, name: 'Ian Wright', email: 'ian@example.com' },
  { id: 12, name: 'Julia Roberts', email: 'julia@example.com' }
];

const parseId = (id: number | string | string[]): number => {
  return Number(Array.isArray(id) ? id[0] : id);
};

const User = {
  findAll: async (): Promise<UserItem[]> => users,

  findById: async (id: number | string | string[]): Promise<UserItem | undefined> => {
    const numId = parseId(id);
    return users.find((user) => user.id === numId);
  },

  create: async (userData: UserData): Promise<UserItem> => {
    const newUser: UserItem = { id: users.length + 1, ...userData };
    users.push(newUser);
    return newUser;
  },

  update: async (
    id: number | string | string[],
    userData: Partial<UserData>
  ): Promise<UserItem | null> => {
    const numId = parseId(id);
    const index = users.findIndex((user) => user.id === numId);
    if (index === -1) return null;
    users[index] = { ...users[index], ...userData };
    return users[index];
  },

  delete: async (id: number | string | string[]): Promise<UserItem | null> => {
    const numId = parseId(id);
    const index = users.findIndex((user) => user.id === numId);
    if (index === -1) return null;
    const deletedUser = users.splice(index, 1);
    return deletedUser[0];
  }
};

export default User;
module.exports = User;
