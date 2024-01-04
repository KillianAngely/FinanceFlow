import { Wallet } from "../domain/Wallet.aggregate";
import { WalletReadModel } from "../domain/Wallet.readmodel";

export interface IWalletAggregateRepository {
  findById(id: number): Promise<Wallet | "NOT_FOUND">;
  save(wallet: Wallet): Promise<void>;
  remove(wallet: Wallet): Promise<void>;
  findReadModelById(id: number): Promise<WalletReadModel | "NOT_FOUND">;
}
