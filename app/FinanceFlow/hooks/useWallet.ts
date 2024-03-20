import { useState } from "react";
import {
  create,
  addBudget,
  removeBudget,
  dropWallet,
  refreshWallet,
  updateBudget,
  showCash,
  spendMoney,
} from "../domain/Wallet.api";

export const useWallet = () => {
  const [wallet, setWallet] = useState<{
    id: number;
    name: string;
    limit: number;
  } | null>(null);

  const refresh = async () => {
    if (!wallet) {
      return;
    }

    setWallet(await refreshWallet(wallet.id));
  };

  return {
    wallet,
    create: async (name: string, limit: number) => {
      const walletid = await create(name, limit);

      const wallet = await refreshWallet(walletid);
      setWallet(wallet);
    },
    add: async (name: string, limit: number) => {
      if (!wallet) {
        return "INVALID";
      }

      await addBudget(wallet.id, name, limit);

      refresh();
    },
    remove: async (name: string) => {
      if (!wallet) {
        return "INVALID";
      }

      await removeBudget(wallet.id, name);

      refresh();
    },

    drop: async (walletId: number) => {
      await dropWallet(walletId);

      setWallet(null);
    },

    update: async (walletId: number, name: string, limit: number) => {
      await updateBudget(walletId, name, limit);

      refresh();
    },

    cash: async (walletId: number) => {
      await showCash(walletId);

      refresh();
    },

    spend: async (walletId: number, name: string, amount: number) => {
      await spendMoney(walletId, name, amount);

      refresh();
    },
  };
};
