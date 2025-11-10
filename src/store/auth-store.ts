/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { create } from "zustand";
import { persist } from "zustand/middleware";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { UserData } from "../components/pakt-auth/types";
import { USER_STORAGE_KEY } from "../utils/auth-utils";

interface AuthState {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    clearStore: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user: UserData | null) => set({ user }),
            clearStore: () => {
                set({ user: null });
                if (typeof window !== "undefined") {
                    localStorage.removeItem(USER_STORAGE_KEY);
                }
            },
        }),
        {
            name: USER_STORAGE_KEY,
        }
    )
);

