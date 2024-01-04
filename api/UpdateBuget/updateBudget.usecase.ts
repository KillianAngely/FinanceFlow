import { IWalletAggregateRepository } from "../repository/Wallet.repository.interface";

export class updateBudget {
  constructor(private readonly repository: IWalletAggregateRepository) {}

  async execute(id: number, name: string, amount: number) {
    const wallet = await this.repository.findById(id);
    if (wallet === "NOT_FOUND") {
      return "NOT_FOUND";
    }

    const res = wallet.updateBudget(name, amount);
    await this.repository.save(wallet);
  }
}
