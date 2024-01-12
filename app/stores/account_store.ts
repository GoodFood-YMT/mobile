import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { Account } from "../types/auth/account";

export const useAccountStore = create(
  persist(
    combine(
      {
        account: undefined as undefined | null | Account,
      },
      (set) => ({
        setAccount: (account: Account | null) => set({ account }),
      })
    ),
    {
      name: "account",
      storage: {
        getItem: async (name: string) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name: string, value: unknown) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name: string) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
