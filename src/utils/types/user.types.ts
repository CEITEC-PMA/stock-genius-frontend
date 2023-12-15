export type User = {
  message?: string;
  user: UserClass;
};

export type UserClass = {
  role: string;
  acesso: boolean;
  isEmailVerified: boolean;
  username: string;
  email: string;
  name: string;
  id: string;
};
