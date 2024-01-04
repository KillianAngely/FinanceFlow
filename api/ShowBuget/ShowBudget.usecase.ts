import { IWalletAggregateRepository } from "../repository/Wallet.repository.interface";

export class ShowBudget {
  constructor(private readonly repository: IWalletAggregateRepository) {}

  async execute(id: number) {
    const wallet = await this.repository.findById(id);
    if (wallet === "NOT_FOUND") {
      return "NOT_FOUND";
    }

    return wallet.budgetConsumtion();
  }
}
