import { IWalletAggregateRepository } from "../repository/Wallet.repository.interface";

export class removeBudget {
  constructor(private readonly repository: IWalletAggregateRepository) {}

  async execute(id: number, name: string) {
    const wallet = await this.repository.findById(id);
    if (wallet === "NOT_FOUND") {
      return "NOT_FOUND";
    }

    const res = wallet.removeBudget(name);

    await this.repository.save(wallet);

    return "OK";
  }
}