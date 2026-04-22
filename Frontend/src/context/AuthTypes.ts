export interface AuthUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_admin: boolean;
  fee_balance: string | null;
  program: string | null;
  phone: string | null;
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  isLoading: boolean;
}