import { Wallet } from "../domain/Wallet.aggregate";
import { WalletReadModel } from "../domain/Wallet.readmodel";
import { IWalletAggregateRepository } from "./Wallet.repository.interface";

const db: Array<{
  id: number;
  name: string;
  limit: number;
  budgets: {
    name: string;
    amount: number;
  }[];
}> = [];

export class WalletRepository implements IWalletAggregateRepository {
  async findById(id: number) {
    const found = db.find((wallet) => wallet.id === id);
    if (!found) {
      return "NOT_FOUND";
    }
    const inst = Wallet.instantiate(found);
    if (inst === "INVALID") {
      throw new Error("CRITICAL ERROR");
    }

    return inst;
  }

  async save(wallet: Wallet) {
    const w = db.findIndex((it) => it.id === wallet.id);
    if (w === -1) {
      db.push(wallet.toDto());
    } else {
      db[w] = wallet.toDto();
    }
    console.log(db);
  }

  async remove(wallet: Wallet) {
    const w = db.findIndex((it) => it.id === wallet.id);
    if (w === -1) {
      db.slice(w, 1);
    } else {
      db[w] = wallet.toDto();
    }
    console.log(db);
  }

  async findReadModelById(id: number) {
    const dto = db.find((it) => it.id === id);
    if (!dto) {
      return "NOT_FOUND";
    }

    return WalletReadModel.instantiate(dto);
  }
}
