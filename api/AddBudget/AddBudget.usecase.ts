import { IWalletAggregateRepository } from "../repository/Wallet.repository.interface";

export class AddBudget {
  constructor(private readonly repository: IWalletAggregateRepository) {}

  async execute(id: number, name: string, amount: number) {
    const wallet = await this.repository.findById(id);
    if (wallet === "NOT_FOUND") {
      return "NOT_FOUND";
    }

    const res = wallet.addBudget(name, amount);
    if (res === "BUDGET_LIMIT_EXCEEDED") {
      return "BUDGET_LIMIT_EXCEEDED";
    }

    await this.repository.save(wallet);

    return "OK";
  }
}
