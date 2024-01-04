import Wallet from "../domain/wallet";

export interface IWalletAggregateRepository {
  findById(id: number): Promise<Wallet | "NOT_FOUND">;
  save(wallet: Wallet): Promise<void>;
  remove(wallet: Wallet): Promise<void>;
}
