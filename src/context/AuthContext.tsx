import React, { createContext, useContext, useEffect, useState } from "react";

export interface GuestUser {
  name: string;
  email: string;
  role: string;
  isGuest: true;
}

interface AuthContextType {
  currentUser: {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string | null;
  } | null;
  isGuest: boolean;
  guestUser: GuestUser;
  loading: boolean;
  authError: null;
  updateGuestProfile: (name: string, role?: string) => void;
  resetGuestProfile: () => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  enterGuestMode: (guestName?: string) => void;
  exitGuestMode: () => void;
  clearAuthError: () => void;
}

const GUEST_STORAGE_KEY = "is_data_solutions_guest_user_v2";

const DEFAULT_GUEST: GuestUser = {
  name: "Consultor Invitado",
  email: "consultor@is-datasolutions.local",
  role: "Especialista en Business Intelligence",
  isGuest: true
};

const AuthContext = createContext<AuthContextType>({
  currentUser: {
    uid: "guest-user-001",
    displayName: DEFAULT_GUEST.name,
    email: DEFAULT_GUEST.email
  },
  isGuest: true,
  guestUser: DEFAULT_GUEST,
  loading: false,
  authError: null,
  updateGuestProfile: () => {},
  resetGuestProfile: () => {},
  login: async () => {},
  logout: async () => {},
  enterGuestMode: () => {},
  exitGuestMode: () => {},
  clearAuthError: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [guestUser, setGuestUser] = useState<GuestUser>(() => {
    try {
      const saved = localStorage.getItem(GUEST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.name === "string") {
          return {
            name: parsed.name.trim() || DEFAULT_GUEST.name,
            email: parsed.email || DEFAULT_GUEST.email,
            role: parsed.role || DEFAULT_GUEST.role,
            isGuest: true
          };
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_GUEST;
  });

  // Save guestUser on changes
  useEffect(() => {
    try {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(guestUser));
    } catch (err) {
      console.warn("Could not save guest user to localStorage", err);
    }
  }, [guestUser]);

  const updateGuestProfile = (name: string, role?: string) => {
    setGuestUser((prev) => ({
      ...prev,
      name: name.trim() || "Consultor Invitado",
      role: role?.trim() || prev.role
    }));
  };

  const resetGuestProfile = () => {
    setGuestUser(DEFAULT_GUEST);
    try {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(DEFAULT_GUEST));
    } catch {}
  };

  const currentUser = {
    uid: "guest-user-001",
    displayName: guestUser.name,
    email: guestUser.email,
    photoURL: null
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isGuest: true,
        guestUser,
        loading: false,
        authError: null,
        updateGuestProfile,
        resetGuestProfile,
        login: async () => {},
        logout: async () => {},
        enterGuestMode: (guestName?: string) => {
          if (guestName) updateGuestProfile(guestName);
        },
        exitGuestMode: () => {},
        clearAuthError: () => {}
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
