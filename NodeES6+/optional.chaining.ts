interface Address {
  city: string;
  country: string;
}

interface UserProfile {
  name: string;
  address?: Address;
}

const user1: UserProfile = {
  name: 'Alice',
  address: { city: 'New York', country: 'USA' }
};

const user2: UserProfile = {
  name: 'Bob'
};

const user3: UserProfile | null = null;

function getUserCity(user: UserProfile | null | undefined): string | undefined {
  return user?.address?.city;
}

console.log(getUserCity(user1));
console.log(getUserCity(user2));
console.log(getUserCity(user3));

export { getUserCity, user1, user2, user3 };
