import Wallet from "../domain/wallet";
import { IWalletAggregateRepository } from "../repository/Wallet.repository.interface";

export class CreateWallet {
  constructor(private readonly repository: IWalletAggregateRepository) {}

  async execute(name: string, limit: number) {
    const id = Math.floor(Math.random() * 100000);
    const wallet = new Wallet(id, name, limit, []);

    await this.repository.save(wallet);

    return id;
  }
}
