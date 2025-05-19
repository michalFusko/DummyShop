//login
export interface LoginData {
  username: string;
  password: string;
  expiresInMins?: number;
}
// register user
export interface NewUser {
  userName: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
}
//logged in user
export interface User {
  id: number;
  username: string;
  password?: string;
  email: string;
  image: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
}

export interface UseUserStoreInterface {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}
