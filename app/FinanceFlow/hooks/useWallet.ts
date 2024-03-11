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
} from "../domain/Wallet.aggregate";

export const useWallet = () => {
  const [wallet, setWallet] = useState<{
    id: number;
    name: string;
    limit: number;
  } | null>(null);

  return {
    wallet,
    create: async (name: string, limit: number) => {
      const walletid: number = await create(name, limit);
      const wallet = await refreshWallet(walletid);
      setWallet(wallet);
    },
    add: async (name: string, limit: number) => {
      if (!wallet) {
        return "INVALID";
      }

      const walletId = wallet.id;
      await addBudget(walletId, name, limit);

      const updatedWallet = await refreshWallet(walletId);
      setWallet(updatedWallet);
    },
    remove: async (name: string) => {
      if (!wallet) {
        return "INVALID";
      }

      await removeBudget(wallet.id, name);
      const updatedWallet = await refreshWallet(wallet.id);
      setWallet(updatedWallet);
    },
    drop: async (walletId: number) => {
      await dropWallet(walletId);
      setWallet(null);
    },
    update: async (walletId: number, name: string, limit: number) => {
      await updateBudget(walletId, name, limit);
      const wallet = await refreshWallet(walletId);
      setWallet(wallet);
    },
    cash: async (walletId: number) => {
      await showCash(walletId);
      setWallet(await refreshWallet(walletId));
    },
    spend: async (walletId: number, name: string, amount: number) => {
      await spendMoney(walletId, name, amount);
      setWallet(await refreshWallet(walletId));
    },
  };
};
