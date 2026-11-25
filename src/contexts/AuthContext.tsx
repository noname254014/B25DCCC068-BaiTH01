import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types";

interface AuthContextValue {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const AUTH_STORAGE_KEY = "shopmini-user";

function getInitialUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  const savedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!savedUser) {
    return null;
  }

  try {
    const parsedUser: unknown = JSON.parse(savedUser);
    if (
      typeof parsedUser === "object" &&
      parsedUser !== null &&
      "username" in parsedUser &&
      typeof parsedUser.username === "string"
    ) {
      return { username: parsedUser.username };
    }
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(getInitialUser);

  const login = (username: string, password: string): boolean => {
    const normalizedUsername = username.trim();
    if (normalizedUsername.length === 0 || password !== "123456") {
      return false;
    }

    const nextUser = { username: normalizedUsername };
    setUser(nextUser);
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({ user, login, logout }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider.");
  }
  return context;
}
