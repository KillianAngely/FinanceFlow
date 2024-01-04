import Wallet from "../domain/wallet";
import { IWalletAggregateRepository } from "./Wallet.repository.interface";

const db: Array<Wallet> = [];

export class WalletRepository implements IWalletAggregateRepository {
  async findById(id: number) {
    const found = db.find((wallet) => wallet.id === id);
    if (!found) {
      return "NOT_FOUND";
    }
    return found;
  }

  async save(wallet: Wallet) {
    const w = db.findIndex((it) => it.id === wallet.id);
    if (w === -1) {
      db.push(wallet);
    } else {
      db[w] = wallet;
    }
    console.log(db);
  }

  async remove(wallet: Wallet) {
    const w = db.findIndex((it) => it.id === wallet.id);
    if (w === -1) {
      db.slice(w, 1);
    } else {
      db[w] = wallet;
    }
    console.log(db);
  }
}
